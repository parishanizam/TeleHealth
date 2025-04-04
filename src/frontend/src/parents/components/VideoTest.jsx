/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 23, 2025
 * Purpose: Contains VideoTest component to be used on Media Testing page
 */

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCameraId } from "../../redux/deviceSlice";

export const VideoTest = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [videoStream, setVideoStream] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const requestCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (err) {
      console.error("Camera permission denied or error:", err);
      alert(
        "Camera access is required to use this feature. Please allow camera permissions.",
      );
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
              alert(
                "No video devices found. Please connect a camera and try again.",
              );
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
        setIsTesting(false);
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

    return () => {
      stopVideo();
    };
  }, [isTesting, selectedCameraId]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = videoStream || null;

      if (videoStream) {
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

  const handleCameraChange = (e) => {
    const deviceId = e.target.value;
    setSelectedCameraId(deviceId);
    dispatch(setCameraId(deviceId));
  };

  return (
    <div className="flex flex-col w-full mt-10">
      <label className="text-black text-sm font-medium mb-2">
        Choose Camera:
      </label>
      <select
        className="border border-gray-300 rounded px-2 py-1"
        value={selectedCameraId}
        onChange={handleCameraChange}
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
