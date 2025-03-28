// TestInstructions.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { RecordingManagerContext } from "../helpers/RecordingManagerContext";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import InstructionContainer from "../components/InstructionContainer";
import puppy2 from "../../assets/puppy.png";

export default function TestInstructions() {
  const { testTypeInstructions } = useParams();
  const testType = testTypeInstructions
    .replace("Instructions", "")
    .toLowerCase();
  const navigate = useNavigate();
  const { startRecording } = useContext(RecordingManagerContext);
  const { selectedCameraId, selectedMicId } = useSelector(
    (state) => state.device,
  );

  const handleStart = async () => {
    await startRecording({
      audioDeviceId: selectedMicId,
      videoDeviceId: selectedCameraId,
    });
    navigate("/parents/QuizManagement");
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <Header
          title={`${testType.charAt(0).toUpperCase() + testType.slice(1)} Assessment`}
        />
      </div>

      <div className="flex flex-2 pt-[100px] px-16 items-center justify-center gap-12">
        {/* INSTRUCTION CARD */}
        <div className="w-2/3 flex justify-center">
          <div className="bg-white w-full max-w-3xl p-8 rounded-xl shadow-lg">
            <InstructionContainer type={testType} />
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl shadow-lg">
          <img
            src={puppy2}
            alt="Motivational Puppy"
            className="w-3/4 rounded-lg"
          />
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-4">
            Are you ready to begin?
          </h2>
          <button
            onClick={handleStart}
            className="px-4 py-3 bg-blue-600 text-white text-2xl font-semibold transition transform hover:scale-105 active:scale-95 rounded-lg shadow-md"
          >
            Let's Go!
          </button>
        </div>
      </div>
    </div>
  );
}
