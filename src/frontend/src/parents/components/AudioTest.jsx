/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 23, 2025
 * Purpose: Contains AudioTest component to be used on Media Testing page
 */

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAudioOutputId } from "../../redux/deviceSlice";
import sampleSound from "../../assets/desk-bell-dry_D.wav";

export const AudioTest = () => {
  const dispatch = useDispatch();
  const [audioOutputs, setAudioOutputs] = useState([]);
  const [selectedOutputId, setSelectedOutputId] = useState("");
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // On mount, load bell noise
  useEffect(() => {
    audioRef.current = new Audio(sampleSound);
    audioRef.current.volume = volume;
  }, []);

  // Enumerate audio output devices on mount
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const outputs = devices.filter((d) => d.kind === "audiooutput");
        setAudioOutputs(outputs);
        if (outputs.length > 0) {
          setSelectedOutputId(outputs[0].deviceId);
        }
      })
      .catch((err) => {
        console.error("Error enumerating devices:", err);
      });
  }, []);
  const setSinkId = (deviceId) => {
    if (audioRef.current && audioRef.current.setSinkId) {
      audioRef.current
        .setSinkId(deviceId)
        .then(() => {
          console.log(`Sink ID set to: ${deviceId}`);
        })
        .catch((err) => {
          console.error("setSinkId error:", err);
        });
    }
  };

  useEffect(() => {
    if (selectedOutputId && audioRef.current?.setSinkId) {
      setSinkId(selectedOutputId);
    }
  }, [selectedOutputId]);

  // Update the volume of the Audio object
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Play the bell from the start
  const handleTestClick = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.error("Audio play error:", err);
      alert(
        "Unable to play audio. Please allow audio or check your browser settings.",
      );
    });
  };

  // A clickable bar that sets volume based on click position
  const handleVolumeBarClick = (event) => {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newVolume = clickX / rect.width;
    setVolume(newVolume);
  };

  //Storing Audio deviceID
  const handleOutputChange = (e) => {
    const deviceId = e.target.value;
    setSelectedOutputId(deviceId);
    dispatch(setAudioOutputId(deviceId));
  };

  return (
    <div className="flex flex-col items-start mt-12 max-md:mt-10 text-black">
      <label className="text-sm font-medium mb-2">Choose Speaker:</label>
      <select
        className="border border-gray-300 rounded px-2 py-1 mb-4"
        value={selectedOutputId}
        onChange={handleOutputChange}
      >
        {audioOutputs.map((out) => (
          <option key={out.deviceId} value={out.deviceId}>
            {out.label || `Speaker ${out.deviceId}`}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-4">
        <button
          onClick={handleTestClick}
          className="px-4 py-2.5 bg-slate-900 text-white rounded-lg"
        >
          Test
        </button>
      </div>

      <div
        onClick={handleVolumeBarClick}
        className="relative w-[300px] h-[20px] bg-gray-300 mt-4 cursor-pointer"
      >
        <div
          className="absolute top-0 left-0 h-full bg-black"
          style={{ width: `${volume * 100}%` }}
        />
      </div>
      <p className="text-sm mt-1">Volume: {Math.round(volume * 100)}%</p>
    </div>
  );
};
