import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const videoRef = useRef(null);

  const toggleWebcam = () => {
    setIsStreaming((prevStreaming) => !prevStreaming);
    if (!isStreaming) {
      captureImage();
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL("image/jpeg").split(",")[1]; // Get the base64 string without prefix

    analyzeWebcamFeed(base64Image);
  };

  const analyzeWebcamFeed = async (base64Image) => {
    try {
      const response = await axios.post("http://localhost:5000/api/detect", {
        image: base64Image,
      });
      setDetectionResult(response.data);
      console.log(response.data)
    } catch (err) {
      console.error("Error during detection:", err);
    }
  };

  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(captureImage, 1000);
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  useEffect(() => {
    let stream = null;

    const startWebcam = async () => {
      try {
        const constraints = { video: true };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setIsStreaming(false);
      }
    };

    if (isStreaming) {
      startWebcam();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isStreaming]);

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
