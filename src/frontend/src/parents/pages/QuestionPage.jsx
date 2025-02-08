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
  totalQuestions
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleNextOrSubmit = () => {
    onAnswerSelected(question.id, selectedAnswer);
  };

  // Reset the state when the question number changes (i.e., moving to the next question)
  useEffect(() => {
    setSelectedAnswer(null); // Reset the answer when the question changes
  }, [questionNumber]); // Only run this when the question number changes

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header title={`Question ${questionNumber} of ${totalQuestions}`} />
      <ProgressBar questionNumber={questionNumber} totalQuestions={totalQuestions}/>
      <VolumeButton sound={question.sound} resetTrigger={questionNumber}/>
      <OptionGrid options={question.options} selectedAnswer={selectedAnswer} handleAnswerClick={handleAnswerClick} />
      
      <NextOrSubmitButton
        isLastQuestion={isLastQuestion}
        onClick={(e) => {
          e.preventDefault();
          handleNextOrSubmit();
        }}
        disabled={selectedAnswer === null} // Disable button if no option is selected
      />
    </div>
  );
}
