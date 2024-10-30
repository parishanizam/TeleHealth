import sys
import json
import base64
import numpy as np
import cv2 as cv2
from io import BytesIO
from PIL import Image

def detect_faces_and_gestures(frame):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    num_faces = len(faces)
    gestures = detect_gestures(faces, frame)
    return num_faces, gestures

def detect_gestures(faces, frame):
    # Placeholder for gesture detection logic
    return []

if __name__ == "__main__":
    # Read JSON data from stdin
    input_data = json.loads(sys.stdin.read())
    image_data = input_data['image']
    
    # Decode the base64 image data
    image = Image.open(BytesIO(base64.b64decode(image_data)))
    frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    # Perform detection
    num_faces, gestures = detect_faces_and_gestures(frame)

    # Prepare output
    output = {
        "gestureDetected": "pointing" in gestures,
        "multipleFacesDetected": num_faces > 1
    }

    # Print JSON result to stdout for Node.js to read
    print(json.dumps(output))
    sys.stdout.flush()  # Ensure output is sent immediately