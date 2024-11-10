import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const App = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const requestInProgress = useRef(false);

  const toggleWebcam = useCallback(() => {
    setIsStreaming((prevStreaming) => !prevStreaming);
  }, []);

  const captureAndProcessImage = useCallback(async () => {
    if (!videoRef.current || !isStreaming || requestInProgress.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL("image/jpeg").split(",")[1];

    try {
      requestInProgress.current = true;
      const response = await axios.post("http://localhost:5001/api/detect", {
        image: base64Image,
      });
      setDetectionResult(response.data);
    } catch (error) {
      console.error("Error during detection:", error);
    } finally {
      requestInProgress.current = false;
      if (isStreaming) captureAndProcessImage(); // Call recursively if still streaming
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
        captureAndProcessImage();
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
    } else {
      stopWebcam();
    }

    return () => {
      stopWebcam();
    };
  }, [isStreaming, captureAndProcessImage]);

  useEffect(() => {
    if (detectionResult && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Clear the canvas before drawing
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw red rectangles around each face
      detectionResult.faceBoxes.forEach(box => {
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.strokeRect(box.x, box.y, box.width, box.height);
      });

      // Draw blue rectangles around wrist and index finger tip if a pointing gesture is detected
      if (detectionResult.gestureDetected) {
        detectionResult.gestureBoxes.forEach(gesture => {
          const { wrist, index_tip } = gesture;
          context.strokeStyle = "blue";
          context.lineWidth = 2;
          context.strokeRect(wrist.x, wrist.y, wrist.width, wrist.height);
          context.strokeRect(index_tip.x, index_tip.y, index_tip.width, index_tip.height);
        });
      }
    }
  }, [detectionResult]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative flex justify-center mb-4">
        {isStreaming ? (
          <>
            <video ref={videoRef} autoPlay className="w-[1000px] h-[700px] rounded-lg" />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-[1000px] h-[700px] pointer-events-none" />
          </>
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
