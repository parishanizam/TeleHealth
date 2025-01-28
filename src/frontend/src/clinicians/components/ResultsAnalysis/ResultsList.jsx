import QuestionCard from "./QuestionCard";

function ResultsList() {
  return (
    <div className="flex flex-col w-full max-w-lg text-3xl tracking-normal leading-10">
      <div className="text-center text-4xl font-semibold mb-4">
        Results
      </div>
      <div className="text-center text-2xl text-gray-700 mb-4">
        English - Matching
      </div>

      {/* Score Bubble */}
      <div className="flex items-center justify-center w-16 h-16 bg-blue-400 text-white rounded-full self-center mb-4">
        <span className="text-xl font-semibold">75%</span>
      </div>

      {/* Question List */}
      <QuestionCard questionNumber={1} status={"correct"} biasDetected={false} />
      <QuestionCard questionNumber={2} status={"intermediary"} biasDetected={false} />
      <QuestionCard questionNumber={3} status={"incorrect"} biasDetected={true} />
      <QuestionCard questionNumber={4} status={"correct"} biasDetected={true} />
    </div>
  );
}

export default ResultsList;
