import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecordingManagerContext } from '../helpers/RecordingManagerContext';

import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import InstructionStep from "../components/InstructionStep";
import VolumeButton from "../../assets/volumebutton.svg";

export default function RepetitionInstructions() {
  const navigate = useNavigate();
  const { startRecording } = useContext(RecordingManagerContext);

  // Grab the chosen devices from Redux
  const { selectedCameraId, selectedMicId } = useSelector((state) => state.device);

  const handleStart = async () => {
    console.log("Recording")
    // Kick off the recording with the user’s chosen mic/camera IDs
    await startRecording({
      audioDeviceId: selectedMicId,
      videoDeviceId: selectedCameraId,
    });
    // Then navigate to the quiz
    navigate("/parents/QuizManagement");
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title="Repetition Assessment" />

      {/* Basic instructions */}
      <div className="flex flex-col items-center mt-12 w-full text-3xl text-center text-black max-md:mt-10">
        <div className="px-10 py-8 bg-sky-400 rounded-xl w-full max-w-4xl">
          Instructions
        </div>
      </div>

      <div className="flex flex-col items-center mt-12 gap-6 w-full max-md:mt-10">
        <div className="flex flex-col gap-6 w-full max-w-5xl px-4 text-center">
          <InstructionStep number="1">
            Press the{" "}
            <img
              loading="lazy"
              src={VolumeButton}
              alt="Play button"
              className="inline-block w-6 h-6 mx-1"
            />{" "}
            button to <span className="font-bold">Play</span> the Question Audio
          </InstructionStep>
          <InstructionStep number="2">
            The{" "}
            <img
              loading="lazy"
              src={VolumeButton}
              alt="Play button"
              className="inline-block w-6 h-6 mx-1"
            />{" "}
            button can only be pressed <span className="font-bold">2 times</span>
          </InstructionStep>
          <InstructionStep number="3">
            Press <span className="font-bold">Next</span> to save your answer and go to the <span className="font-bold">next question</span>
          </InstructionStep>
          <InstructionStep number="4">
            Press <span className="font-bold">Finish</span> to complete the test
          </InstructionStep>
        </div>
      </div>

      {/* Start button */}
      <div className="flex flex-col items-center mt-12 w-full text-center text-black max-md:mt-10">
        <div>Press <span className="font-bold">Start</span> when you&apos;re ready to begin!</div>
        <div className="mt-6" onClick={(e) => e.preventDefault()}>
        <button className="flex justify-center items-center px-4 py-2.5 bg-white rounded-lg border-blue-600 border-solid border-[1.5px] text-xl text-blue-600 cursor-pointer" onClick={handleStart}>Start</button>
        </div>
      </div>
    </div>
  );
}
