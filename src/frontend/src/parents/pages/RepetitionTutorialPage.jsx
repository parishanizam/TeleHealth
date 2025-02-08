import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { VolumeButton } from "../components/VolumeButton";
import { ProgressBar } from "../components/ProgressBar";
import { NextOrSubmitButton } from "../components/NextOrSubmitButton";

import tutorialSound from "../../assets/tutorialassets/3TheRoseBushesWerePlantedYesterdayByTheGirlScouts.m4a";


export default function RepetitionTutorialPage({ testType }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [playCount, setPlayCount] = useState(0);
  const navigate = useNavigate();

  const question = {
    id: 0,
    title: "Tutorial Question",
    sound: tutorialSound,
  };

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

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header title={`Tutorial - Repetition`} />
      <ProgressBar questionNumber={currentStep} totalQuestions={3} />
      {currentStep === 1 && (
        <div className="border-2 border-yellow-500 p-5 rounded-lg bg-yellow-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-yellow-700">Step 1: Listen to the Audio</h2>
          <p className="text-xl">Click the audio button to hear the sentence. You are allowed one replay!</p>
        </div>
      )}
      {currentStep === 2 && (
        <div className="border-2 border-yellow-500 p-5 rounded-lg bg-yellow-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-yellow-700">Step 2: Repeat the Sentence</h2>
          <p className="text-xl">Try your best to say the sentence exactly as you heard it. Our system is recording</p>
        </div>
      )}
      {currentStep === 3 && (
        <div className="border-2 border-green-500 p-5 rounded-lg bg-green-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-green-700">Great Job!</h2>
          <p className="text-xl">You have completed the tutorial. Click Finish to continue.</p>
        </div>
      )}
      <VolumeButton sound={question.sound} resetTrigger={null} handlePlayAudio={handlePlayAudio} playCount={playCount} />
      <div className="flex justify-center items-center mt-6">
        {currentStep === 3 ? (
          <NextOrSubmitButton to="/parents/TutorialComplete" name="Finish" />
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
