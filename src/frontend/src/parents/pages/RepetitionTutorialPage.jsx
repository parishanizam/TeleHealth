import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import { VolumeButton } from "../components/VolumeButton";
import { ProgressBar } from "../components/ProgressBar";
import NextButton from "../components/NextButton";

export default function RepetitionTutorialPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [playCount, setPlayCount] = useState(0);
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();
  const testType = "repetition";
  const language = "english";

  useEffect(() => {
    const fetchTutorialQuestion = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/questions/${language}/${testType}/0`
        );
        setQuestion(res.data);
      } catch (error) {
        console.error("Error fetching tutorial question:", error);
      }
    };
    fetchTutorialQuestion();
  }, [testType, language]);

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePlayAudio = () => {
    if (playCount < 2) {
      setPlayCount((prev) => prev + 1);
      return true;
    }
    return false;
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header
        title={`Tutorial - ${
          testType.charAt(0).toUpperCase() + testType.slice(1)
        }`}
      />
      <ProgressBar questionNumber={currentStep} totalQuestions={3} />
      {currentStep === 1 && (
        <div className="border-2 border-yellow-500 p-5 rounded-lg bg-yellow-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-yellow-700">
            Step 1: Listen to the Audio
          </h2>
          <p className="text-xl">
            Click the audio button to hear the sentence. You are allowed one
            replay!
          </p>
        </div>
      )}
      {currentStep === 2 && (
        <div className="border-2 border-yellow-500 p-5 rounded-lg bg-yellow-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-yellow-700">
            Step 2: Repeat the Sentence
          </h2>
          <p className="text-xl">
            Try your best to say the sentence exactly as you heard it. Our
            system is recording
          </p>
        </div>
      )}
      {currentStep === 3 && (
        <div className="border-2 border-green-500 p-5 rounded-lg bg-green-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-green-700">Great Job!</h2>
          <p className="text-xl">
            You have completed the tutorial. Click Finish to continue.
          </p>
        </div>
      )}
      <VolumeButton
        sound={question.sound}
        resetTrigger={null}
        handlePlayAudio={handlePlayAudio}
        playCount={playCount}
      />
      <div className="flex justify-center items-center mt-6 space-x-4">
        {currentStep === 3 ? (
          <>
            <NextButton to="/parents/TutorialComplete" name="Finish" />
            <NextButton
              to="/parents/OverallTutorialPage"
              name="Try Another Tutorial"
            />
          </>
        ) : (
          <button
            className="px-6 py-3 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600"
            onClick={handleNextStep}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
