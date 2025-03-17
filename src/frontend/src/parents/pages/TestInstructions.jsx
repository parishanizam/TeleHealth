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
    <div className="flex flex-col items-center min-h-screen w-full bg-white overflow-auto">
      
      {/* Fixed Header */}
      <div className="w-full fixed top-0 z-10 bg-white shadow-md">
        <Header title={`${testType.charAt(0).toUpperCase() + testType.slice(1)} Assessment`} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-2xl px-6 pt-[150px] space-y-4 mx-auto">
        
        {/* Instruction Steps */}
        <InstructionContainer type={testType} />

        {/* Start Button */}
        <div className="text-center text-black mt-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold
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
