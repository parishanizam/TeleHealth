import sys
import json
import base64
import numpy as np
import cv2
from io import BytesIO
from PIL import Image
import mediapipe as mp
import os

#Ignore noise is comand prompt for lite errors
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

# Initialize MediaPipe Hands for gesture detection
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7)
mp_drawing = mp.solutions.drawing_utils

def detect_faces_and_gestures(frame):
    # Face detection using OpenCV
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    num_faces = len(faces)

    # Gesture detection using MediaPipe
    gestures = detect_gestures(frame)

    return num_faces, gestures

def detect_gestures(frame):
    # Convert the image to RGB (MediaPipe expects RGB format)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb_frame)

    gestures = []
    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            # Get the landmarks for the index finger tip and wrist
            index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            wrist = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST]

            # Check if the index finger is above the wrist (indicating a pointing gesture)
            if index_tip.y < wrist.y:
                gestures.append("pointing")

            # Draw landmarks on the hand (optional for debugging)
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    return gestures

if __name__ == "__main__":
    # Read JSON data from stdin
    input_data = json.loads(sys.stdin.read())
    image_data = input_data['image']
    
    # Decode the base64 image data
    image = Image.open(BytesIO(base64.b64decode(image_data)))
    frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    # Perform face and gesture detection
    num_faces, gestures = detect_faces_and_gestures(frame)

    # Prepare output
    output = {
        "gestureDetected": "pointing" in gestures,
        "multipleFacesDetected": num_faces > 1
    }

    # Print JSON result to stdout for Node.js to read
    print(json.dumps(output))
    sys.stdout.flush()  # Ensure output is sent immediately
