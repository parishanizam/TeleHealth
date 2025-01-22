import React, { useState } from "react";
import MatchingCard from "../components/MatchingCard"; 
import NextButton from "../components/NextButton";
import { Header } from "../components/Header";
import VolumeButton from "../../assets/volumebutton.svg";

export default function MatchingQuestion({
  question,
  onAnswerSelected,
  isLastQuestion
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (optionId) => {
    setSelectedAnswer(optionId);
    // If you wanted to auto-advance upon selection, you could call onAnswerSelected here.
  };

  // We'll call this from the parent DIV wrapping <NextButton>
  const handleNextClick = () => {
    onAnswerSelected(question.id, selectedAnswer);
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header title={question.title} />

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

      {/* 2x2 grid for options */}
      <div className="mt-6 flex justify-center w-full">
        <div className="grid grid-cols-2 gap-5">
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

      {/* Wrap NextButton in a parent div to intercept click */}
      <div
        className="flex justify-center px-60 mt-5 w-full min-h-[60px] max-md:px-5"
        onClick={(e) => {
          e.preventDefault(); // prevent link jump or page refresh
          handleNextClick();  // trigger your "go to next question" logic
        }}
      >
        <NextButton
          to="#"
          name={isLastQuestion ? "Submit Test" : "Next"}
        />
      </div>
    </div>
  );
}
