import React, { useState } from "react";
import MatchingCard from "../components/MatchingCard"; 
import { Header } from "../components/Header";
import VolumeButton from "../../assets/volumebutton.svg";

export default function MatchingQuestion({
  question,
  onAnswerSelected,
  isLastQuestion,
  questionNumber, // 🔹 Added prop for sequential question numbers
  totalQuestions // 🔹 Added prop to track total questions for progress bar
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleNextOrSubmit = () => {
    onAnswerSelected(question.id, selectedAnswer);
  };

  // Dynamically determine grid layout based on number of options
  let gridClass = "";
  if (question.options.length === 4) {
    gridClass = "grid grid-cols-2 gap-5"; // 2x2 grid
  } else if (question.options.length === 3) {
    gridClass = "grid grid-cols-3 gap-5"; // 1x3 grid
  } else if (question.options.length === 2) {
    gridClass = "grid grid-cols-2 gap-5"; // 1x2 grid
  }

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      {/* 🔹 Updated Header to show sequential question number */}
      <Header title={`Question ${questionNumber} of ${totalQuestions}`} />

      {/* 🔹 Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Volume button or "No Sound" label */}
      <div className="flex justify-center items-center w-full mt-4">
        <div className="p-2.5 w-[120px]">
          {question.sound ? (
            <img
              src={VolumeButton}
              alt="Play Sound"
              onClick={() => new Audio(question.sound).play()}
              className="object-contain w-[100px] cursor-pointer hover:shadow-md"
            />
          ) : (
            <div className="text-center text-gray-500">No Sound</div>
          )}
        </div>
      </div>

      {/* Dynamically generated grid for options */}
      <div className="mt-6 flex justify-center w-full">
        <div className={gridClass}>
          {question.options?.map((option) => (
            <MatchingCard
              key={option.id}
              image={option.image}
              onClick={() => handleAnswerClick(option.id)}
              isSelected={selectedAnswer === option.id}
            />
          ))}
        </div>
      </div>

      {/* Next or Submit button */}
      <div className="flex justify-center px-60 mt-5 w-full min-h-[60px] max-md:px-5">
        <button
          className="px-4 py-2.5 bg-slate-900 text-white rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            handleNextOrSubmit();
          }}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
