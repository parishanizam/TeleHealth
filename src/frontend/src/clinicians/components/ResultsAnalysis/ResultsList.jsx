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
  bias_length,
  clientId,
  securityCode,
}) {
  const navigate = useNavigate();

  // ─────────────────────────────────────────────────────────
  // (ADD) Create an array of question IDs from results
  // ─────────────────────────────────────────────────────────
  const questionIds = results.map((r) => r.question_id);

  const [language, testType] = questionBankId.split("-");
  
  const handleCardClick = (question, questionNumber) => {
    navigate("/clinicians/BiasReviewPage", {
      state: {
        // 🔹 Existing fields (unchanged):
        questionId: question.question_id,
        userAnswer: question.user_answer,
        correctAnswer: question.correctAnswer,
        questionBankId,
        parentUsername,
        assessmentId,
        firstName,
        lastName,
        date,
        questionNumber,
        clientId, 
        securityCode,
        bias_state: question.bias_state,
        mark_state: question.mark_state,

        // ─────────────────────────────────────────────────────────
        // (ADD) New fields to facilitate Next/Back in BiasReviewPage
        // ─────────────────────────────────────────────────────────
        results,             // entire array of results
        questionIds,         // array of all question IDs in the same order
        currentIndex: questionNumber - 1, // zero-based index
        totalQuestions: results.length,
      },
    });
  };

  return (
    <div className="flex flex-col w-full max-w-lg text-3xl tracking-normal leading-10">
      <div className="h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {results.length > 0 ? (
          results.map((result, index) => (
            <QuestionCard
              key={index}
              questionNumber={index + 1}
              status={result.status} 
              biasDetected={result.bias_state}
              mark_state={result.mark_state}
              testType={testType}
              onClick={() => handleCardClick(result, index + 1)}
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
