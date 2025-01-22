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
   * Request access to the camera to ensure device labels are available.
   */
  const requestCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Immediately stop the stream as we only needed permissions
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (err) {
      console.error("Camera permission denied or error:", err);
      alert("Camera access is required to use this feature. Please allow camera permissions.");
      return false;
    }
  };

  /**
   * On mount, request permissions and enumerate devices.
   */
  useEffect(() => {
    const init = async () => {
      const hasPermission = await requestCameraPermissions();
      if (hasPermission) {
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            const videoDevices = devices.filter((d) => d.kind === "videoinput");
            setCameras(videoDevices);
            if (videoDevices.length > 0) {
              setSelectedCameraId(videoDevices[0].deviceId);
            } else {
              alert("No video devices found. Please connect a camera and try again.");
            }
          })
          .catch((err) => {
            console.error("Error enumerating video devices:", err);
            alert("Could not enumerate video devices.");
          });
      }
    };

    init();
  }, []);

  /**
   * Whenever isTesting or the selected camera changes,
   * turn the video on (if isTesting = true)
   * or turn the video off (if isTesting = false).
   */
  useEffect(() => {
    let currentStream = videoStream;

    const startVideo = async () => {
      try {
        const constraints = selectedCameraId
          ? { video: { deviceId: { exact: selectedCameraId } }, audio: false }
          : { video: true, audio: false };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setVideoStream(stream);
      } catch (err) {
        console.error("Error accessing video device:", err);
        alert("Could not access the selected camera.");
        setIsTesting(false); // Revert if it fails
      }
    };

    const stopVideo = () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
        setVideoStream(null);
      }
    };

    if (isTesting) {
      startVideo();
    } else {
      stopVideo();
    }

    // Cleanup function to stop video when component unmounts or dependencies change
    return () => {
      stopVideo();
    };
  }, [isTesting, selectedCameraId]);

  /**
   * Attach the videoStream to the <video> element.
   */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = videoStream || null;

      if (videoStream) {
        // Attempt to play the video to handle autoplay policies
        videoRef.current
          .play()
          .then(() => {
            console.log("Video playback started.");
          })
          .catch((err) => {
            console.error("Video playback error:", err);
          });
      }
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
          // Adding onLoadedMetadata to handle autoplay
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.play().catch((err) => {
                console.error("Autoplay prevented:", err);
              });
            }
          }}
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
