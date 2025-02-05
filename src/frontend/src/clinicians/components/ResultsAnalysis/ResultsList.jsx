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

  // Calculate overall score
  const totalQuestions = results.length;
  const correctAnswers = results.filter(result => result.status === "correct").length;
  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

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

      {/* Displaying overall score */}
      <div className="text-left text-3xl font-medium mb-6">
        Score: {scorePercentage}%
      </div>

      <div className="h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
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
    </div>
  );
}

export default ResultsList;
