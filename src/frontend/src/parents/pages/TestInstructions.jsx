import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { RecordingManagerContext } from "../helpers/RecordingManagerContext";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import InstructionContainer from "../components/InstructionContainer";

export default function TestInstructions() {
  const { testTypeInstructions } = useParams();
  const testType = testTypeInstructions.replace("Instructions", "").toLowerCase();
  const navigate = useNavigate();
  const { startRecording } = useContext(RecordingManagerContext);

  // Grab the chosen devices from Redux
  const { selectedCameraId, selectedMicId } = useSelector((state) => state.device);

  const handleStart = async () => {
    console.log("Recording");
    await startRecording({
      audioDeviceId: selectedMicId,
      videoDeviceId: selectedCameraId,
    });
    navigate("/parents/QuizManagement");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white overflow-hidden">
      
      {/* Fixed Header at the Top */}
      <div className="w-full fixed top-0">
        <Header title={`${testType.charAt(0).toUpperCase() + testType.slice(1)} Assessment`} />
      </div>

      {/* Main Content with padding to prevent overlap */}
      <div className="flex flex-col items-center justify-center w-full pt-20 space-y-6">
        
        {/* Instructions Header */}
        <div className="px-10 py-6 bg-sky-400 rounded-xl w-full max-w-4xl text-3xl text-center text-white font-semibold shadow-md">
          Instructions
        </div>

        {/* Instruction Steps */}
        <InstructionContainer type={testType} />

        {/* Start button */}
        <div className="text-center text-black">
          <p className="text-lg">Press <span className="font-bold">Start</span> when you're ready to begin!</p>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-xl 
                       transition-all duration-200 ease-in-out 
                       hover:bg-blue-700 hover:scale-105 
                       active:bg-blue-800 active:scale-95 active:opacity-90 shadow-md"
            onClick={handleStart}
          >
            Start
          </button>
        </div>

      </div>
    </div>
  );
}
