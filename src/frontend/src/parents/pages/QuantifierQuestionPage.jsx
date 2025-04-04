/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 26, 2025
 * Purpose: Displays QuantifierQuestionPage and its content
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
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header
        title={`Question ${questionNumber} of ${totalQuestions}`}
        showLogout={false}
        showHome={false}
      />
      <ProgressBar
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
      />
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
