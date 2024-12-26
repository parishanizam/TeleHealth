import sys
import json
import subprocess
import tempfile
import os

from pyannote.audio import Pipeline

# Initialize pre-trained pipeline (this may be large)
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization")

def analyze_audio(video_path):
    """Extract audio from the video file, then run speaker diarization,
    and return info about overlapping speech or multiple speakers."""
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_wav:
        temp_wav_name = temp_wav.name

    cmd = [
        "ffmpeg", "-i", video_path,
        "-q:a", "0", "-map", "a",
        "-y",  # Overwrite output
        temp_wav_name
    ]
    subprocess.run(cmd, check=True)

    diarization = pipeline(temp_wav_name)
    os.remove(temp_wav_name)

    # Example: number of distinct speakers
    num_speakers = len(diarization.labels())
    # In a real app, you'd parse diarization for overlapping intervals, etc.

    return {
        "numSpeakers": num_speakers,
        "diarization": str(diarization)  # string for debugging
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No video path provided"}))
        sys.exit(1)

    video_path = sys.argv[1]
    try:
        result = analyze_audio(video_path)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
