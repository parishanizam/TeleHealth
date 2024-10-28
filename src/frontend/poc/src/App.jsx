import React, { useRef, useEffect, useState } from 'react';

const App = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef(null);

  const toggleWebcam = () => {
    setIsStreaming((prevStreaming) => !prevStreaming);
  };

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
        console.error('Error accessing webcam:', err);
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
          <video
            ref={videoRef}
            autoPlay
            className="w-[1000px] h-[700px] rounded-lg" // You can add rounded corners if needed
          />
        ) : (
          <div className="w-[1000px] h-[700px] bg-red-500"></div>
        )}
      </div>
      <button
        className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
        onClick={toggleWebcam}
      >
        {isStreaming ? 'Off' : 'On'}
      </button>
    </div>
  );
};

export default App;
