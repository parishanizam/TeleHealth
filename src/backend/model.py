import sys
import json
import base64
import numpy as np
import cv2
from io import BytesIO
from PIL import Image
import mediapipe as mp

# Initialize MediaPipe Hands for gesture detection
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7)

def detect_faces_and_gestures(frame):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Get bounding boxes for each face
    face_boxes = [{"x": int(x), "y": int(y), "width": int(w), "height": int(h)} for (x, y, w, h) in faces]

    # Gesture detection
    gestures, gesture_boxes = detect_gestures(frame)

    return len(faces), gestures, face_boxes, gesture_boxes

def detect_gestures(frame):
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb_frame)
    gestures = []
    gesture_boxes = []

    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            wrist = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST]

            # Check if the index finger is above the wrist (indicating a pointing gesture)
            if index_tip.y < wrist.y:
                gestures.append("pointing")

                # Calculate bounding box coordinates for wrist and index finger
                h, w, _ = frame.shape
                gesture_boxes.append({
                    "wrist": {"x": int(wrist.x * w), "y": int(wrist.y * h), "width": 10, "height": 10},
                    "index_tip": {"x": int(index_tip.x * w), "y": int(index_tip.y * h), "width": 10, "height": 10}
                })

    return gestures, gesture_boxes

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    image_data = input_data['image']
    image = Image.open(BytesIO(base64.b64decode(image_data)))
    frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    num_faces, gestures, face_boxes, gesture_boxes = detect_faces_and_gestures(frame)

    output = {
        "gestureDetected": "pointing" in gestures,
        "multipleFacesDetected": num_faces > 1,
        "faceBoxes": face_boxes,
        "gestureBoxes": gesture_boxes  # Includes coordinates for wrist and index finger
    }

    print(json.dumps(output))
    sys.stdout.flush()
