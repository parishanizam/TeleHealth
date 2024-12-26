import sys
import json
import cv2
import mediapipe as mp

def analyze_video(video_path):
    """Load the video with OpenCV, detect multiple faces using MediaPipe,
    and return timestamps where more than one face is present."""
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError(f"Could not open video: {video_path}")

    face_detection = mp.solutions.face_detection.FaceDetection(
        model_selection=0,
        min_detection_confidence=0.5
    )

    multiple_faces_times = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        current_time_sec = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_detection.process(rgb_frame)
        if results.detections:
            face_count = len(results.detections)
            if face_count > 1:
                multiple_faces_times.append(current_time_sec)
    cap.release()

    return {
        "multipleFacesTimes": multiple_faces_times
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No video path provided"}))
        sys.exit(1)

    video_path = sys.argv[1]
    try:
        result = analyze_video(video_path)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
