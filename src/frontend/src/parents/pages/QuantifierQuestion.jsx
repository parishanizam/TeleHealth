/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 25, 2025
 * Purpose: Displays QuantifierQuestion page and its content
 */

import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { VolumeButton } from "../components/VolumeButton";
import { ProgressBar } from "../components/ProgressBar";
import { OptionGrid } from "../components/OptionGrid";
import { NextOrSubmitButton } from "../components/NextOrSubmitButton";

export default function QuantifierQuestion({
  question,
  onAnswerSelected,
  isLastQuestion,
  questionNumber,
  totalQuestions,
  isPractice,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!question) {
    return <div>Loading...</div>;
  }

  const handleAnswerClick = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleNextOrSubmit = () => {
    onAnswerSelected(question.id, selectedAnswer);
  };

  useEffect(() => {
    setSelectedAnswer(null);
  }, [questionNumber]);

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header
        title={
          isPractice
            ? "Practice Question"
            : `Question ${questionNumber} of ${totalQuestions}`
        }
      />
      <ProgressBar
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
      />
      {isPractice && (
        <div className="border-2 border-yellow-500 p-4 rounded-lg bg-yellow-50 shadow-lg my-4">
          <h2 className="text-md font-semibold text-yellow-700">
            <strong>Practice Question:</strong>
          </h2>
          <p>
            Choose the option where the picture best matches the quantity
            described.
          </p>
        </div>
      )}
      <VolumeButton sound={question.sound} resetTrigger={questionNumber} />
      <OptionGrid
        options={question.options}
        selectedAnswer={selectedAnswer}
        handleAnswerClick={handleAnswerClick}
      />

      <NextOrSubmitButton
        isLastQuestion={isLastQuestion}
        onClick={(e) => {
          e.preventDefault();
          handleNextOrSubmit();
        }}
        disabled={selectedAnswer === null}
      />
    </div>
  );
}
