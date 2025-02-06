import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { VolumeButton } from '../components/VolumeButton';
import { NextOrSubmitButton } from '../components/NextOrSubmitButton';

export default function RepetitionQuestion({
  question,
  onAnswerSelected,
  isLastQuestion,
  questionNumber,
  totalQuestions
}) {
  // Handle the Next button click
  const handleNextOrSubmit = () => {
    onAnswerSelected(question.id, null); // No answer to select, so just passing null
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      {/* Header and Progress Bar */}
      <Header title={`Question ${questionNumber} of ${totalQuestions}`} />
      <ProgressBar questionNumber={questionNumber} totalQuestions={totalQuestions}/>
      
      {/* Volume Button */}
      <VolumeButton sound={question.sound} />

      {/* Instruction or Message (this could be a prompt or placeholder for now) */}
      {/* <div className="flex justify-center items-center mt-6">
        <div className="text-xl">Ready to Repeat</div>
      </div> */}

      {/* Start Button (Placeholder for now) */}
      {/* <div className="flex justify-center mt-6">
        <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg">
          Start Recording
        </button>
      </div> */}

      {/* Next or Submit button */}
      <NextOrSubmitButton isLastQuestion={isLastQuestion} onClick={(e) => {
              e.preventDefault();
              handleNextOrSubmit();
            }} />
    </div>
  );
}
