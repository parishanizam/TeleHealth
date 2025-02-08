import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { Header } from "../components/Header";
import { VolumeButton } from "../components/VolumeButton";
import { OptionGrid } from "../components/OptionGrid";
import NextButton from "../components/NextButton"; // Import NextButton component

import option1Image from "../../assets/tutorialassets/example1-1瓶水.jpg";
import option2Image from "../../assets/tutorialassets/example1-2瓶水.jpg";
import option3Image from "../../assets/tutorialassets/example1-3瓶水.jpg";
import tutorialSound from "../../assets/tutorialassets/example1瓶水.m4a";

export default function QuantifierTutorialPage({ testType }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [playCount, setPlayCount] = useState(0); // Track play count
  const navigate = useNavigate(); // Hook for routing

  const question = {
    id: 0,
    title: "Tutorial Question",
    sound: tutorialSound,
    options: [
      { id: "a", image: option1Image },
      { id: "b", image: option2Image },
      { id: "c", image: option3Image },
    ],
    correctAnswer: "a",
  };

  const handleAnswerClick = (optionId) => {
    if (currentStep === 2) {
      setSelectedAnswer(optionId);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedAnswer === question.correctAnswer) {
      setCurrentStep(3);
    }
  };

  const handlePlayAudio = () => {
    if (playCount < 2) {
      setPlayCount((prev) => prev + 1);
      return true; // Allow playback
    }
    return false; // Prevent playback
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header title={`Tutorial - Mandarin Matching`} />

      {currentStep === 1 && (
        <div className="border-2 border-yellow-500 p-5 rounded-lg bg-yellow-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-yellow-700">Step 1: Listen to the Audio</h2>
          <p className="text-xl">
            Click the audio button to hear the question. You are allowed one replay!
          </p>
          <p className="text-xl">Play the sound twice an then click next for following instructions!</p>
        </div>
      )}

      {currentStep === 2 && (
        <div className="border-2 border-yellow-500 p-5 rounded-lg bg-yellow-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-yellow-700">Step 2: Select the Correct Option</h2>
          <p className="text-xl">Click on the option that best matches the quantity played. Once you select the correct answer, click next!</p>
        </div>
      )}

      {currentStep === 3 && (
        <div className="border-2 border-green-500 p-5 rounded-lg bg-green-50 shadow-lg my-4 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold text-green-700">Great Job!</h2>
          <p className="text-xl">You have completed the tutorial. Click Finish to continue.</p>
        </div>
      )}

      <VolumeButton
        sound={question.sound}
        resetTrigger={null} // Do not reset on step change
        highlight={currentStep === 1}
        handlePlayAudio={handlePlayAudio} // Pass function to limit plays
        playCount={playCount}
      />

      <OptionGrid
        options={question.options}
        selectedAnswer={selectedAnswer}
        handleAnswerClick={handleAnswerClick}
        highlight={currentStep === 2}
        correctAnswer={currentStep === 3 ? question.correctAnswer : null}
      />

      {/* Show different buttons based on step */}
      <div className="flex justify-center items-center mt-6">
        {currentStep === 3 ? (
          <NextButton to="/parents/TutorialComplete" name="Finish" />
        ) : (
          <button
            className={`px-6 py-3 rounded-lg text-white font-semibold ${
              currentStep === 2 && selectedAnswer !== question.correctAnswer
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleNextStep}
            disabled={currentStep === 2 && selectedAnswer !== question.correctAnswer}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}