import IconButtonGroup from "./IconButtonGroup";

function QuestionAnswers({ question, userAnswer }) {
  if (!question.options) {
    return <IconButtonGroup />;
  }

  // Determine correct answer
  const correctAnswer = question.correctAnswer;

  // Grid Layout Based on Number of Options
  const columns = question.options.length % 2 === 0 ? 2 : 3; // 2 for even, 3 for odd
  const gridClass = `grid grid-cols-${columns} gap-6 px-4`; // Add extra gap and padding

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg font-semibold">User Answer</h2>

      {/* Answer Choices Grid */}
      <div className={gridClass}>
        {question.options.map((option) => {
          const isCorrect = option.id === correctAnswer;
          const isUserSelected = option.id === userAnswer;

          return (
            <div
              key={option.id}
              className={`p-4 border rounded-md transition ${
                isUserSelected
                  ? isCorrect
                    ? "bg-green-200 border-green-600"
                    : "bg-red-200 border-red-600"
                  : "bg-white"
              }`}
            >
              <img
                src={option.image}
                alt={`Option ${option.id}`}
                className="w-32 h-32 object-contain mx-auto" // 🔹 Bigger images
              />
              <p className="text-center">{option.id.toUpperCase()}</p>
            </div>
          );
        })}
      </div>

      {/* Show Correct Answer */}
      <div className="mt-4">
        <p className="text-md text-gray-700">
          <strong>Correct Answer:</strong> {correctAnswer.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default QuestionAnswers;
