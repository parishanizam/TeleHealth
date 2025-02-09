import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { VolumeButton } from "../components/VolumeButton";
import { NextOrSubmitButton } from "../components/NextOrSubmitButton";

export default function RepetitionQuestion({
  question,
  onAnswerSelected,
  isLastQuestion,
  questionNumber,
  totalQuestions,
  isPractice
}) {

  if (!question) {
    return <div>Loading...</div>;
  }

  const handleNextOrSubmit = () => {
    onAnswerSelected(question.id, null); // No answer to select, so just passing null
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <Header title={isPractice ? "Practice Question" : `Question ${questionNumber} of ${totalQuestions}`} />
      <ProgressBar
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
      />
      {isPractice && (
        <div className="border-2 border-yellow-500 p-4 rounded-lg bg-yellow-50 shadow-lg my-4">
          <h2 className="text-md font-semibold text-yellow-700"><strong>Practice Question:</strong></h2>
          <p>Listen closely to the audio and repeat the sentence</p>
        </div>
      )}

      <VolumeButton sound={question.sound} resetTrigger={questionNumber} />

      <NextOrSubmitButton
        isLastQuestion={isLastQuestion}
        onClick={(e) => {
          e.preventDefault();
          handleNextOrSubmit();
        }}
      />
    </div>
  );
}
