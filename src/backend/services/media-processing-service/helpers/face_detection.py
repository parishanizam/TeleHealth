"""
Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
Date: January 19, 2025
Purpose: Detects faces in an input video using MediaPipe's face detection model.
Outputs JSON with face counts per frame along with timestamps.
"""

import sys
import cv2
import mediapipe as mp
import json

# Initialize MediaPipe Face Detection
mp_face_detection = mp.solutions.face_detection

def detect_faces(video_path, frame_skip=4):
    results = []
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        raise ValueError(f"Unable to open video file: {video_path}")

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_index = 0

    with mp_face_detection.FaceDetection(min_detection_confidence=0.5) as face_detection:
        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                break

            # Skip frames
            if frame_index % frame_skip != 0:
                frame_index += 1
                continue

            # Convert the image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Perform face detection
            detection_result = face_detection.process(image)
            face_count = len(detection_result.detections) if detection_result.detections else 0

            # Append result with timestamp in milliseconds
            results.append({
                "timestamp": frame_index * 1000 // fps,
                "faces": face_count
            })
            frame_index += 1

    cap.release()
    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python face_detection.py <video_path>")
        sys.exit(1)

    video_path = sys.argv[1]
    frame_skip = int(sys.argv[2]) if len(sys.argv) > 2 else 4  # Default to skipping every 4th frame
    try:
        detections = detect_faces(video_path, frame_skip=frame_skip)
        print(json.dumps(detections, indent=2))  # Output results as JSON
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
