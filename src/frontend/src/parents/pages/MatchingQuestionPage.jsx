/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 23, 2025
 * Purpose: Displays MatchingQuestionPage and its content
 */

import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { VolumeButton } from "../components/VolumeButton";
import { ProgressBar } from "../components/ProgressBar";
import { OptionGrid } from "../components/OptionGrid";
import { NextOrSubmitButton } from "../components/NextOrSubmitButton";

export default function MatchingQuestion({
  question,
  onAnswerSelected,
  isLastQuestion,
  questionNumber,
  totalQuestions,
  isPractice,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleNextOrSubmit = () => {
    const currentTime = new Date().getTime();
    onAnswerSelected(question.id, selectedAnswer, currentTime);
  };

  // Reset the state when the question number changes
  useEffect(() => {
    setSelectedAnswer(null);
  }, [questionNumber]);

  return (
    <div className="flex flex-col h-full min-h-screen overflow-hidden px-5 pt-2.5 pb-4 bg-white">
      <div className="text-sm">
        <Header
          title={
            isPractice
              ? "Practice Question"
              : `Question ${questionNumber} of ${totalQuestions}`
          }
          showLogout={false}
          showHome={false}
        />
      </div>
      <ProgressBar
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
      />
      {isPractice && (
        <div className="border-2 border-yellow-500 p-1 rounded-lg bg-yellow-50 shadow-lg my-1">
          <p>
            Choose the option where the picture best matches the scenario
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
