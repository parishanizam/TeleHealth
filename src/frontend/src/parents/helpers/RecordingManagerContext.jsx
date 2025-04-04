/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Handles all assessment recording management, including tracking, starting and stopping recordings
 */

import React, { createContext, useState, useRef, useCallback } from "react";

export const RecordingManagerContext = createContext(null);

export function RecordingManagerProvider({ children }) {
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const onRecordingCompleteRef = useRef(null);
  const questionMediaRecorderRef = useRef(null);
  const questionRecordedChunksRef = useRef([]);
  const [isQuestionRecording, setIsQuestionRecording] = useState(false);
  const [questionRecordedBlob, setQuestionRecordedBlob] = useState(null);

  // Start full session recording
  const startRecording = useCallback(
    async ({ audioDeviceId, videoDeviceId }) => {
      try {
        const videoConsent =
          sessionStorage.getItem("videoConsent") !== "declined";
        const constraints = {
          audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
          video: videoConsent
            ? videoDeviceId
              ? { deviceId: { exact: videoDeviceId } }
              : true
            : false,
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
          const blob = new Blob(recordedChunksRef.current, {
            type: recorder.mimeType,
          });
          setRecordedBlob(blob);
          console.log("Recording complete. Blob available:", blob);

          if (onRecordingCompleteRef.current) {
            onRecordingCompleteRef.current(blob);
          }
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
        setRecordingStartTime(new Date().getTime());
        setIsRecording(true);
      } catch (err) {
        console.error("Error starting recording:", err);
        alert("Could not start recording.");
      }
    },
    [],
  );

  // Stop full session recording
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
    setRecordingStartTime(null);
  }, []);

  const getElapsedRecordingTime = useCallback(() => {
    if (!recordingStartTime) return 0;
    return new Date().getTime() - recordingStartTime;
  }, [recordingStartTime]);

  // Start audio-only question recording
  const startQuestionRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Specify a preferred codec for MP4 (AAC)
      let mimeType = "audio/mp4; codecs=mp4a.40.2";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        console.warn("AAC codec not supported. Falling back to Opus.");
        mimeType = "audio/webm; codecs=opus"; // Fallback codec
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      questionRecordedChunksRef.current = [];
      setQuestionRecordedBlob(null);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          questionRecordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(questionRecordedChunksRef.current, {
          type: recorder.mimeType,
        });
        setQuestionRecordedBlob(blob);
        console.log("Question audio recording complete:", blob);
      };

      recorder.start();
      questionMediaRecorderRef.current = recorder;
      setIsQuestionRecording(true);
    } catch (err) {
      console.error("Error starting question recording:", err);
    }
  }, []);

  const stopQuestionRecording = useCallback((onComplete) => {
    if (!questionMediaRecorderRef.current) {
      console.warn("No active question recorder to stop.");
      return;
    }

    questionMediaRecorderRef.current.onstop = () => {
      const blob = new Blob(questionRecordedChunksRef.current, {
        type: questionMediaRecorderRef.current.mimeType,
      });
      setQuestionRecordedBlob(blob);
      console.log("Question audio recording complete:", blob);

      if (onComplete) {
        onComplete(blob);
      }
    };

    questionMediaRecorderRef.current.stop();
    questionMediaRecorderRef.current.stream
      ?.getTracks()
      .forEach((track) => track.stop());
    setIsQuestionRecording(false);
  }, []);

  return (
    <RecordingManagerContext.Provider
      value={{
        isRecording,
        recordedBlob,
        startRecording,
        stopRecording,
        getElapsedRecordingTime,
        isQuestionRecording,
        questionRecordedBlob,
        startQuestionRecording,
        stopQuestionRecording,
      }}
    >
      {children}
    </RecordingManagerContext.Provider>
  );
}
