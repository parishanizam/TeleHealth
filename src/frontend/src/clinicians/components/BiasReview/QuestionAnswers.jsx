import React from "react";

function QuestionAnswers({ question, userAnswer }) {
  if (!question || !question.options) {
    return <p className="text-gray-500">No answer options available.</p>;
  }

  // Determine correct answer
  const correctAnswer = question.correctAnswer; 

  // Grid Layout Based on Number of Options
  let gridClass = "grid grid-cols-1 gap-4"; 
  if (question.options.length === 4) {
    gridClass = "grid grid-cols-2 gap-4"; // 2x2 Grid
  } else if (question.options.length === 3) {
    gridClass = "grid grid-cols-3 gap-4"; // 1x3 Grid
  } else if (question.options.length === 2) {
    gridClass = "grid grid-cols-2 gap-4"; // 1x2 Grid
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg font-semibold">Answer Choices</h2>
      
      {/* Answer Choices Grid */}
      <div className={gridClass}>
        {question.options.map((option) => {
          const isCorrect = option.id === correctAnswer;
          const isUserSelected = option.id === userAnswer;

          return (
            <div 
              key={option.id} 
              className={`p-4 border rounded-md transition ${
                isUserSelected ? (isCorrect ? "bg-green-200 border-green-600" : "bg-red-200 border-red-600") : "bg-white"
              }`}
            >
              <img 
                src={option.image} 
                alt={`Option ${option.id}`} 
                className="w-32 h-32 object-contain mx-auto" // 🔹 Bigger images
              />
              <p className="text-center">{option.id}</p>
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
