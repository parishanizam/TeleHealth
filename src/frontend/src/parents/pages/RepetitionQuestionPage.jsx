import { useState, useContext, useEffect, useRef } from "react";
import { RecordingManagerContext } from "../helpers/RecordingManagerContext";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { VolumeButton } from "../components/VolumeButton";
import { NextOrSubmitButton } from "../components/NextOrSubmitButton";

export default function RepetitionQuestion({
  question,
  onAnswerSelected,
  isLastQuestion,
  questionNumber,
  totalQuestions,
  isPractice
}) {

  if (!question) {
    return <div>Loading...</div>;
  }

  const {
    startQuestionRecording,
    stopQuestionRecording,
    isQuestionRecording,
  } = useContext(RecordingManagerContext);

  // Store the audio blob in a ref (avoids async state issues)
  const audioBlobRef = useRef(null);

  const [recordedAudioFile, setRecordedAudioFile] = useState(null);
  const [recordingClickCount, setRecordingClickCount] = useState(0);
  const [isAudioClicked, setIsAudioClicked] = useState(false);
  const MAX_RECORDING_CLICKS = 1;
  const [isTransitioningToRecording, setIsTransitioningToRecording] = useState(false);


  useEffect(() => {
    setRecordedAudioFile(null);  // Reset state for each new question
    setRecordingClickCount(0);   // Reset recording click count for each new question
    setIsAudioClicked(false);
  }, [question.id]);

  useEffect(() => {
    // Reset the audio blob ref when a new question is displayed
    audioBlobRef.current = null;
  }, [question.id]);

  const handleStartRecording = async () => {
    if (recordingClickCount < MAX_RECORDING_CLICKS) {
      setIsTransitioningToRecording(true);
      setRecordingClickCount(recordingClickCount + 1);
      await startQuestionRecording(); // assumes it's async
      setIsTransitioningToRecording(false);
    }
  };

  const handleStopRecording = () => {
    stopQuestionRecording((audioBlob) => {
      if (!audioBlob) {
        console.warn("No audio blob received from recording!");
        return;
      }

      // Store the audio file without advancing to the next question
      const audioFile = new File([audioBlob], `question_${question.id}.mp4`, {
        type: "audio/mp4",
      });

      setRecordedAudioFile(audioFile);
      audioBlobRef.current = audioBlob;
    });
  };

  const handleNextOrSubmit = () => {
    if (!recordedAudioFile) {
      console.warn("No completed recording available for this question!");
      return;
    }

    console.log("Submitting audio recording...");
    onAnswerSelected(question.id, null, recordedAudioFile);  // Pass the recorded audio file
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header title={isPractice ? "Practice Question" : `Question ${questionNumber} of ${totalQuestions}`} showLogout={false} showHome={false}/>
      <ProgressBar
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
      />
      {isPractice && (
        <div className="border-2 border-yellow-500 p-4 rounded-lg bg-yellow-50 shadow-lg my-4">
          <h2 className="text-md font-semibold text-yellow-700"><strong>Practice Question:</strong></h2>
          <p>Listen closely to the audio and repeat the sentence</p>
        </div>
      )}

      {/* Volume Button */}
      <div onClick={() => {
          setTimeout(() => {
            setIsAudioClicked(true);
          }, 3000);
        }}>
        <VolumeButton
          sound={question.sound}
          resetTrigger={questionNumber}
        />
      </div>

      <div className="flex justify-center mt-6">
        {recordedAudioFile ? (
          <div className="text-lg text-green-600">Audio Recording Complete!</div>
        ) : (
          <button
            className={`px-4 py-2.5 rounded-lg ${
              isQuestionRecording || isTransitioningToRecording
                ? "bg-red-600 text-white"
                : !isAudioClicked || recordingClickCount >= MAX_RECORDING_CLICKS
                ? "bg-slate-900 text-white opacity-50 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
            onClick={() => {
              if (isQuestionRecording || isTransitioningToRecording) {
                handleStopRecording();
              } else if (isAudioClicked && recordingClickCount < MAX_RECORDING_CLICKS) {
                handleStartRecording();
              }
            }}
            disabled={
              (!isQuestionRecording && !isTransitioningToRecording && !isAudioClicked) ||
              (!isQuestionRecording && !isTransitioningToRecording && recordingClickCount >= MAX_RECORDING_CLICKS)
            }
          >
            {isQuestionRecording || isTransitioningToRecording
              ? "Stop Recording"
              : !isAudioClicked
              ? "Play Audio First"
              : recordingClickCount >= MAX_RECORDING_CLICKS
              ? "Recording Complete"
              : "Start Recording"}
          </button>
        )}
      </div>

      <NextOrSubmitButton
        isLastQuestion={isLastQuestion}
        onClick={(e) => {
          e.preventDefault();
          handleNextOrSubmit();
        }}
        disabled={!recordedAudioFile}
      />
    </div>
  );
}
