import IconButtonGroup from "./IconButtonGroup";

function QuestionAnswers({ question, userAnswer, markState, changeMarkState }) {
  if (!question.options) {
    return <IconButtonGroup markState={markState} changeMarkState={changeMarkState} />;
  }

  // Handle the user interaction to change mark state
  const handleAnswerClick = (answerId) => {
    // Assuming the answer id corresponds to the mark state change logic
    changeMarkState(answerId);
  };

  const correctAnswer = question.correctAnswer;
  const columns = question.options.length % 2 === 0 ? 2 : 3;
  const gridClass = `grid grid-cols-${columns} gap-6 px-2`;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg font-semibold">Selected Answer</h2>

      {/* Answer Choices Grid */}
      <div className={gridClass}>
        {question.options.map((option) => {
          const isCorrect = option.id === correctAnswer;
          const isUserSelected = option.id === userAnswer;

          return (
            <div
              key={option.id}
              onClick={() => handleAnswerClick(option.id)} // Trigger the mark state change
              className={`p-2 border rounded-md transition ${isUserSelected ? (isCorrect ? "bg-green-200" : "bg-red-200") : "bg-white"}`}
            >
              <img
                src={option.image}
                alt={`Option ${option.id}`}
                className="object-contain"
              />
              <p className="text-center">{option.id.toUpperCase()}</p>
            </div>
          );
        })}
      </div>

      {/* Show Correct Answer */}
      <div className="mt-4">
        <p className="text-md text-gray-700">
          <strong>Correct Answer:</strong>{" "}
          <span className="text-green-500">{correctAnswer.toUpperCase()}</span>
        </p>
      </div>
    </div>
  );
}

export default QuestionAnswers;
