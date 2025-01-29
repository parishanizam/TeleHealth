import React, { createContext, useState, useRef, useCallback } from "react";

export const RecordingManagerContext = createContext(null);

export function RecordingManagerProvider({ children }) {
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

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
        // Call the callback if we have one
        if (onRecordingCompleteRef.current) {
          onRecordingCompleteRef.current(blob);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      alert("Could not start recording.");
    }
  }, []);

  const onRecordingCompleteRef = useRef(null);

  const stopRecording = useCallback((onComplete) => {
    if (!mediaRecorderRef.current) {
      console.warn("No active recorder to stop.");
      return;
    }
    
    if (onComplete) {
      onRecordingCompleteRef.current = onComplete;
    }

    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream
      ?.getTracks()
      .forEach((track) => track.stop());
    setIsRecording(false);
  }, []);

  return (
    <RecordingManagerContext.Provider value={{ isRecording, recordedBlob, startRecording, stopRecording }}>
      {children}
    </RecordingManagerContext.Provider>
  );
}
