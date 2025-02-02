import QuestionCard from "./QuestionCard";

function ResultsList() {
  // const questions = [
  //   { questionNumber: 1, status: "correct", biasDetected: true },
  //   { questionNumber: 2, status: "intermediary", biasDetected: false },
  //   { questionNumber: 3, status: "incorrect", biasDetected: true },
  //   { questionNumber: 4, status: "correct", biasDetected: false },
  // ];

  return (
    <div className="flex flex-col text-3xl tracking-normal leading-10 max-w-[742px]">
      <div className="flex gap-2.5 items-center text-5xl tracking-normal leading-[52px] text-neutral-900">
        <div className="flex flex-col justify-center self-stretch my-auto min-w-[240px] w-[630px]">
          <div className="w-full max-md:max-w-full max-md:text-4xl">
            Results
          </div>
          <div className="mt-2.5 w-full max-md:max-w-full max-md:text-4xl">
            English - Matching
          </div>
        </div>

        {/* Circle for 75% */}
        <div className="flex items-center justify-center w-16 h-16 bg-blue-400 text-white rounded-full">
          <span className="text-xl font-semibold">75%</span>
        </div>
      </div>
      
      <QuestionCard questionNumber={1} status={"correct"} biasDetected={false} />
      <QuestionCard questionNumber={2} status={"intermediary"} biasDetected={false} />
      <QuestionCard questionNumber={3} status={"incorrect"} biasDetected={true} />
      <QuestionCard questionNumber={4} status={"correct"} biasDetected={true} />
    </div>
  );
}

export default ResultsList;
