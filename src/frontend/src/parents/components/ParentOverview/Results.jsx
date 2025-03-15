import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResultCard } from "./ResultCard";
import { formatDate } from "../../../utils/dateUtils";
import { formatTestTitle } from "../../../utils/testTitleUtils";

export function Results({ data }) {
  const navigate = useNavigate();
  const parent = useSelector((state) => state.parent.parentInfo);

  const [scores, setScores] = useState({}); 

  useEffect(() => {
    const fetchScores = async () => {
      if (!data || !Array.isArray(data) || data.length === 0 || !parent) return;

      const newScores = {}; 

      for (const result of data) {
        try {
          const resultsApiUrl = `http://localhost:3000/resultstorage/results/${parent.username}/${result.assessment_id}`;
          const response = await fetch(resultsApiUrl);
          const fetchedData = await response.json();

          if (!fetchedData.results) continue;

          const fetchedQuestionBankId = fetchedData.questionBankId;
          const [language, testType] = fetchedQuestionBankId.split("-");

          let correctAnswers = 0;
          let totalQuestions = fetchedData.results.length;

          if (testType === "repetition") {
            const hasUndetermined = fetchedData.results.some((q) => q.mark_state === "Undetermined");
            if (hasUndetermined) {
              newScores[result.assessment_id] = "N/A";
              continue;
            }
            correctAnswers = fetchedData.results.filter((q) => q.mark_state === "Correct").length;
          } else {
            const questionPromises = fetchedData.results.map(async (res) => {
              const questionRes = await fetch(
                `http://localhost:3000/questions/${language}/${testType}/${res.question_id}`
              );
              const questionData = await questionRes.json();
              return {
                ...res,
                correctAnswer: questionData.correctAnswer,
                status: res.user_answer === questionData.correctAnswer ? "correct" : "incorrect",
              };
            });

            const updatedResults = await Promise.all(questionPromises);
            correctAnswers = updatedResults.filter((q) => q.status === "correct").length;
          }

          const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
          newScores[result.assessment_id] = score;
        } catch (error) {
          console.error(`Error fetching score for assessment ${result.assessment_id}:`, error);
        }
      }

      setScores(newScores); 
    };

    fetchScores();
  }, [data, parent]);

  const handleCardClick = (result) => {
    if (!parent) {
      console.warn("Parent data is missing!");
      return;
    }

    navigate(`/parents/ResultsAnalysisPage`, {
      state: {
        date: result.date,
        firstName: parent.firstName,
        lastName: parent.lastName,
        assessmentId: result.assessment_id,
        questionBankId: result.questionBankId,
        parentUsername: parent.username,
        score: scores[result.assessment_id] || 0,
      },
    });
  };

  return (
    <div className="flex flex-col justify-start items-start p-6 w-full space-y-4 h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {data.map((result) => (
        <ResultCard
          key={result.assessment_id}
          score={`${scores[result.assessment_id] ?? "N/A"}%`} 
          test={formatTestTitle(result.questionBankId)}
          date={formatDate(result.date)}
          onClick={() => handleCardClick(result)}
        />
      ))}
    </div>
  );
}
