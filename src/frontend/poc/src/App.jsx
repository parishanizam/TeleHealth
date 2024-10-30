import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const App = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const videoRef = useRef(null);

  // Toggles the webcam on or off
  const toggleWebcam = useCallback(() => {
    setIsStreaming((prevStreaming) => !prevStreaming);
  }, []);

  // Capture an image from the webcam stream
  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL("image/jpeg").split(",")[1]; // Get the base64 string without prefix
    analyzeWebcamFeed(base64Image);
  }, [analyzeWebcamFeed]);

  // Send captured image to the backend for analysis
  const analyzeWebcamFeed = useCallback(async (base64Image) => {
    try {
      const response = await axios.post("http://localhost:5000/api/detect", {
        image: base64Image,
      });
      setDetectionResult(response.data);
    } catch (error) {
      console.error("Error during detection:", error);
    }
  }, []);

  // Webcam streaming logic
  useEffect(() => {
    let stream = null;

    const startWebcam = async () => {
      try {
        const constraints = { video: true };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setIsStreaming(false);
      }
    };

    const stopWebcam = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    if (isStreaming) {
      startWebcam();
      const captureInterval = setInterval(captureImage, 1000);
      return () => {
        clearInterval(captureInterval);
        stopWebcam();
      };
    } else {
      stopWebcam();
    }
  }, [isStreaming, captureImage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-center mb-4">
        {isStreaming ? (
          <video ref={videoRef} autoPlay className="w-[1000px] h-[700px] rounded-lg" />
        ) : (
          <div className="w-[1000px] h-[700px] bg-red-500"></div>
        )}
      </div>
      <button
        className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
        onClick={toggleWebcam}
      >
        {isStreaming ? "Off" : "On"}
      </button>

      {detectionResult && (
        <div className="mt-4">
          <p>Gesture Detected: {detectionResult.gestureDetected ? "Yes" : "No"}</p>
          <p>Multiple Faces Detected: {detectionResult.multipleFacesDetected ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default App;
