import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import { formatTestTitle } from "../../../utils/testTitleUtils";

function ResultsList({
  results,
  questionBankId,
  parentUsername,
  assessmentId,
  firstName,
  lastName,
  date,
}) {
  const navigate = useNavigate();

  const handleCardClick = (question) => {
    navigate("/clinicians/BiasReviewPage", {
      state: {
        questionId: question.question_id,
        userAnswer: question.user_answer,
        correctAnswer: question.correctAnswer, // 🔹 Pass correct answer
        questionBankId,
        parentUsername,
        assessmentId,
        firstName,
        lastName,
        date,
      },
    });
  };

  return (
    <div className="flex flex-col w-full max-w-lg text-3xl tracking-normal leading-10">
      <div className="text-left text-4xl font-semibold mb-4">Results</div>
      <div className="text-left text-3xl font-semibold mb-4">
        {/* Displaying Language and Test Type */}
        {formatTestTitle(questionBankId)}
      </div>

      {results.length > 0 ? (
        results.map((result, index) => (
          <QuestionCard
            key={index}
            questionNumber={index + 1}
            status={result.status} // 🔹 Status is now correctly set
            biasDetected={result.biasDetected}
            onClick={() => handleCardClick(result)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No results available.</p>
      )}
    </div>
  );
}

export default ResultsList;
