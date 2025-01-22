import React, { useEffect, useRef, useState } from "react";

export const VideoTest = () => {
  const videoRef = useRef(null);

  // List of available cameras
  const [cameras, setCameras] = useState([]);

  // Which camera deviceId is selected in the dropdown
  const [selectedCameraId, setSelectedCameraId] = useState("");

  // The actual MediaStream (when video is ON)
  const [videoStream, setVideoStream] = useState(null);

  // Toggle for whether the user is currently “testing” (i.e., video on/off)
  const [isTesting, setIsTesting] = useState(false);

  /**
   * On mount, enumerate devices to find cameras.
   */
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
      })
      .catch((err) => {
        console.error("Error enumerating video devices:", err);
      });
  }, []);

  /**
   * Whenever isTesting or the selected camera changes,
   * turn the video on (if isTesting = true)
   * or turn the video off (if isTesting = false).
   */
  useEffect(() => {
    if (!selectedCameraId) return;

    // If user just toggled "on":
    if (isTesting) {
      // Get media from the chosen camera
      navigator.mediaDevices
        .getUserMedia({ video: { deviceId: selectedCameraId }, audio: false })
        .then((stream) => {
          setVideoStream(stream);
        })
        .catch((err) => {
          console.error("Error accessing video device:", err);
          alert("Could not access selected camera.");
          setIsTesting(false); // revert if it fails
        });
    } else {
      // If user toggled "off," stop any existing stream
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
      setVideoStream(null);
    }

    // Cleanup function (runs if isTesting or selectedCameraId changes again)
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isTesting, selectedCameraId]);

  /**
   * Attach the videoStream to the <video> element.
   */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = videoStream || null;
    }
  }, [videoStream]);

  /**
   * Toggle the test state.
   */
  const handleTestClick = () => {
    setIsTesting((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full mt-10">
      {/* Dropdown to choose camera */}
      <label className="text-black text-sm font-medium mb-2">Choose Camera:</label>
      <select
        className="border border-gray-300 rounded px-2 py-1"
        value={selectedCameraId}
        onChange={(e) => setSelectedCameraId(e.target.value)}
      >
        {cameras.map((camera) => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label || `Camera ${camera.deviceId}`}
          </option>
        ))}
      </select>

      {/* Live video preview */}
      <div className="mt-4 bg-zinc-300 h-[269px] w-full relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* “Test” button toggles the video on/off */}
      <div className="mt-4">
        <button
          onClick={handleTestClick}
          className="px-4 py-2.5 bg-slate-900 text-white rounded-lg"
        >
          {isTesting ? "Stop" : "Test"}
        </button>
      </div>
    </div>
  );
};
