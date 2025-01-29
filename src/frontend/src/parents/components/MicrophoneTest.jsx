import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMicId } from "../../redux/deviceSlice";

export const MicrophoneTest = () => {
  const dispatch = useDispatch();
  const [mics, setMics] = useState([]);
  const [selectedMicId, setSelectedMicId] = useState("");
  const [isTesting, setIsTesting] = useState(false);

  const [micVolume, setMicVolume] = useState(0.5); // 0.0 - 1.0
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const gainNodeRef = useRef(null);
  const destinationRef = useRef(null);
  const micStreamRef = useRef(null);

  // We need an <audio> element to loop back
  const audioElementRef = useRef(null);

  // Enumerate audioinput devices on mount
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const inputs = devices.filter((d) => d.kind === "audioinput");
        setMics(inputs);
        if (inputs.length > 0) {
          setSelectedMicId(inputs[0].deviceId);
        }
      })
      .catch((err) => console.error("Error enumerating mic devices:", err));
  }, []);

  // If micVolume changes, update the gain node
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = micVolume;
    }
  }, [micVolume]);

  const startMicTest = async () => {
    if (isTesting) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      const audioContext = audioContextRef.current;

      // request mic with the selected deviceId
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedMicId },
        video: false,
      });
      micStreamRef.current = stream;

      // create SourceNode
      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;

      // create GainNode to control volume
      const gainNode = audioContext.createGain();
      gainNode.gain.value = micVolume;
      gainNodeRef.current = gainNode;

      // create a DestinationNode for playback
      const destination = audioContext.createMediaStreamDestination();
      destinationRef.current = destination;

      // connect: mic -> gain -> destination
      source.connect(gainNode).connect(destination);

      // feed the destination stream into the <audio> element for loopback
      if (audioElementRef.current) {
        audioElementRef.current.srcObject = destination.stream;
        audioElementRef.current.play().catch((err) => {
          console.error("Audio playback error:", err);
        });
      }

      setIsTesting(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Could not access microphone.");
    }
  };

  const stopMicTest = () => {
    // stop tracks
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    // disconnect nodes
    if (sourceRef.current) sourceRef.current.disconnect();
    if (gainNodeRef.current) gainNodeRef.current.disconnect();
    if (destinationRef.current) destinationRef.current.disconnect();

    setIsTesting(false);
  };

  const handleVolumeBarClick = (event) => {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newVolume = clickX / rect.width; 
    setMicVolume(newVolume);
  };

  const handleMicChange = (e) => {
    const deviceId = e.target.value;
    setSelectedMicId(deviceId);
    dispatch(setMicId(deviceId));
  };

  return (
    <div className="flex flex-col items-start mt-12 max-md:mt-10 text-black">
      <label className="text-sm font-medium mb-2">Choose Microphone:</label>
      <select
        className="border border-gray-300 rounded px-2 py-1 mb-4"
        value={selectedMicId}
        onChange={handleMicChange}
      >
        {mics.map((mic) => (
          <option key={mic.deviceId} value={mic.deviceId}>
            {mic.label || `Microphone ${mic.deviceId}`}
          </option>
        ))}
      </select>

      {/* Test / Stop */}
      <div className="flex gap-2">
        {!isTesting ? (
          <button
            onClick={startMicTest}
            className="px-4 py-2.5 bg-slate-900 text-white rounded-lg"
          >
            Test
          </button>
        ) : (
          <button
            onClick={stopMicTest}
            className="px-4 py-2.5 bg-red-600 text-white rounded-lg"
          >
            Stop
          </button>
        )}
      </div>

      <div
        onClick={handleVolumeBarClick}
        className="relative w-[300px] h-[20px] bg-gray-300 mt-4 cursor-pointer"
      >
        <div
          className="absolute top-0 left-0 h-full bg-black"
          style={{ width: `${micVolume * 100}%` }}
        />
      </div>
      <p className="text-sm mt-1">Mic Volume: {Math.round(micVolume * 100)}%</p>

      {/* The hidden <audio> element for hearing yourself */}
      <audio ref={audioElementRef} autoPlay />
    </div>
  );
};
