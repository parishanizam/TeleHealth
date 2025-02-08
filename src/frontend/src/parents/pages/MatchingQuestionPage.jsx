import { useState } from "react";
import { Header } from "../components/Header";
import { VolumeButton } from "../components/VolumeButton";
import { ProgressBar } from "../components/ProgressBar";
import { OptionGrid } from "../components/OptionGrid";
import { NextOrSubmitButton } from "../components/NextOrSubmitButton";

export default function MatchingQuestion({
  question,
  onAnswerSelected,
  isLastQuestion,
  questionNumber, // Added prop for sequential question numbers
  totalQuestions // Added prop to track total questions for progress bar
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleNextOrSubmit = () => {
    const currentTime = new Date().getTime();
    onAnswerSelected(question.id, selectedAnswer, currentTime);
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header title={`Question ${questionNumber} of ${totalQuestions}`} />
      <ProgressBar questionNumber={questionNumber} totalQuestions={totalQuestions}/>
      <VolumeButton sound={question.sound}/>
      <OptionGrid options={question.options} selectedAnswer={selectedAnswer} handleAnswerClick={handleAnswerClick} />
      <NextOrSubmitButton isLastQuestion={isLastQuestion} onClick={(e) => {
        e.preventDefault();
        handleNextOrSubmit();
      }} />
    </div>
  );
}
