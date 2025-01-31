import React from "react";

function QuestionAnswers({ options, userAnswer, correctAnswer }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {options.map((option) => (
        <div
          key={option.id}
          className={`p-4 rounded-lg shadow-md w-32 text-center
            ${userAnswer === option.id ? "border-4 border-red-500" : ""}
            ${correctAnswer === option.id ? "border-4 border-green-500" : ""}
          `}
        >
          <img src={option.image} alt="Option" className="w-full rounded-lg" />
          <p className="mt-2">{option.id.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
}

export default QuestionAnswers;
