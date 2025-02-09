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
  score,
}) {
  const navigate = useNavigate();

  const [language, testType] = questionBankId.split("-");
  const handleCardClick = (question, questionNumber) => {
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
        questionNumber,
        bias_state: question.bias_state,
        mark_state: question.mark_state,
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
        Score: {score}%
      </div>

      <div className="h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {results.length > 0 ? (
        results.map((result, index) => (
          <QuestionCard
            key={index}
            questionNumber={index + 1}
            status={result.status} // 🔹 Status is now correctly set
            biasDetected={result.biasDetected}
            mark_state={result.mark_state}
            testType={testType}
            onClick={() => handleCardClick(result, index+1)}
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
