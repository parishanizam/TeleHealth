function QuestionAnswers() {
    return (
      <div className="flex flex-col items-start absolute bottom-40 left-1/2 transform -translate-x-1/2 ml-auto text-xl">
        <div className="z-10 mt-0 text-neutral-500">
          User: <span className="font-bold text-red-500">C</span>
        </div>
        <div className="text-neutral-500 mt-2">
          Answer: <span className="font-bold text-green-500">B</span>
        </div>
      </div>
    );
  }
  
  export default QuestionAnswers;
  