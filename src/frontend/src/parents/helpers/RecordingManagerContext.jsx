import React, { createContext, useState, useRef, useCallback } from "react";

export const RecordingManagerContext = createContext(null);

export function RecordingManagerProvider({ children }) {
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingStartTime, setRecordingStartTime] = useState(null); // 🔹 Track recording start time
  const onRecordingCompleteRef = useRef(null); // 🔹 Define this reference

  const startRecording = useCallback(async ({ audioDeviceId, videoDeviceId }) => {
    try {
      const constraints = {
        audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
        video: videoDeviceId ? { deviceId: { exact: videoDeviceId } } : true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      let mimeType = "video/mp4; codecs=h264";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "video/webm; codecs=vp8";
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      recordedChunksRef.current = [];
      setRecordedBlob(null);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: recorder.mimeType });
        setRecordedBlob(blob);
        console.log("Recording complete. Blob available:", blob);

        // Call the callback if it's set
        if (onRecordingCompleteRef.current) {
          onRecordingCompleteRef.current(blob);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecordingStartTime(new Date().getTime()); // 🔹 Store the recording start time
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      alert("Could not start recording.");
    }
  }, []);

  const stopRecording = useCallback((onComplete) => {
    if (!mediaRecorderRef.current) {
      console.warn("No active recorder to stop.");
      return;
    }

    if (onComplete) {
      onRecordingCompleteRef.current = onComplete; // Set the callback
    }

    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream
      ?.getTracks()
      .forEach((track) => track.stop());
    setIsRecording(false);
    setRecordingStartTime(null); // Reset the recording start time
  }, []);

  const getElapsedRecordingTime = useCallback(() => {
    if (!recordingStartTime) return 0;
    return new Date().getTime() - recordingStartTime; // Calculate elapsed time
  }, [recordingStartTime]);

  return (
    <RecordingManagerContext.Provider value={{ isRecording, recordedBlob, startRecording, stopRecording, getElapsedRecordingTime }}>
      {children}
    </RecordingManagerContext.Provider>
  );
}
