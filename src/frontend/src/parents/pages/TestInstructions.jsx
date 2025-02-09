import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { RecordingManagerContext } from "../helpers/RecordingManagerContext";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import InstructionContainer from "../components/InstructionContainer";

export default function TestInstructions() {
  const { testTypeInstructions } = useParams();
  const testType = testTypeInstructions
    .replace("Instructions", "")
    .toLowerCase();
  const navigate = useNavigate();
  const { startRecording } = useContext(RecordingManagerContext);

  // Grab the chosen devices from Redux
  const { selectedCameraId, selectedMicId } = useSelector(
    (state) => state.device
  );

  const handleStart = async () => {
    console.log("Recording");
    await startRecording({
      audioDeviceId: selectedMicId,
      videoDeviceId: selectedCameraId,
    });
    navigate("/parents/QuizManagement");
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title={`${testType.charAt(0).toUpperCase() + testType.slice(1)} Assessment`} />

      {/* Instructions Header */}
      <div className="flex flex-col items-center mt-12 w-full text-3xl text-center text-black max-md:mt-10">
        <div className="px-10 py-8 bg-sky-400 rounded-xl w-full max-w-4xl">
          Instructions
        </div>
      </div>

      {/* Instruction Steps */}
      <div className="flex flex-col items-center mt-12 gap-6 w-full max-md:mt-10">
        <InstructionContainer type={testType} />
      </div>

      {/* Start button */}
      <div className="flex flex-col items-center mt-12 w-full text-center text-black max-md:mt-10">
        <div>
          Press <span className="font-bold">Start</span> when you&apos;re ready to
          begin!
        </div>
        <div className="mt-6">
          <button
            className="flex justify-center items-center px-4 py-2.5 bg-white rounded-lg border-blue-600 border-solid border-[1.5px] text-xl text-blue-600 cursor-pointer"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
