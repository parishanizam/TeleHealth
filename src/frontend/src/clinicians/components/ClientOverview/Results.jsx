import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResultCard } from "./ResultCard";
import { formatDate } from "../../../utils/dateUtils";
import { formatTestTitle } from "../../../utils/testTitleUtils";

export function Results({ data, client, filters, selectedDate }) {
  const navigate = useNavigate();
  const [scores, setScores] = useState({});
  const LANGUAGE_FILTERS = ["English", "Mandarin"];
  const TYPE_FILTERS = ["Matching", "Repetition", "Quantifier"];

  const toYMD = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedLanguages = filters
    .filter((f) => LANGUAGE_FILTERS.includes(f))
    .map((f) => f.toLowerCase());
  const selectedTestTypes = filters
    .filter((f) => TYPE_FILTERS.includes(f))
    .map((f) => f.toLowerCase());
  const dateFilterActive = filters.includes("Date");

  useEffect(() => {
    const fetchScores = async () => {
      if (!data || !Array.isArray(data) || data.length === 0 || !client) return;

      const newScores = {};

      for (const result of data) {
        try {
          const resultsApiUrl = `/rehttps://telehealth-insights.onrender.comsultstorage/results/${client.parentUsername}/${result.assessment_id}`;
          const response = await fetch(resultsApiUrl);
          const fetchedData = await response.json();

          if (!fetchedData.results) continue;

          const fetchedQuestionBankId = fetchedData.questionBankId;
          const [langRaw, testRaw] = fetchedQuestionBankId.split("-");
          const language = langRaw.toLowerCase();
          const testType = testRaw.toLowerCase();

          let correctAnswers = 0;
          const totalQuestions = fetchedData.results.length;

          if (testType === "repetition") {
            const hasUndetermined = fetchedData.results.some(
              (q) => q.mark_state === "Undetermined",
            );
            if (hasUndetermined) {
              newScores[result.assessment_id] = "N/A";
              continue;
            }
            correctAnswers = fetchedData.results.filter(
              (q) => q.mark_state === "Correct",
            ).length;
          } else {
            const questionPromises = fetchedData.results.map(async (res) => {
              const questionRes = await fetch(
                `https://telehealth-insights.onrender.com/questions/${language}/${testType}/${res.question_id}`,
              );
              const questionData = await questionRes.json();
              return {
                ...res,
                correctAnswer: questionData.correctAnswer,
                status:
                  res.user_answer === questionData.correctAnswer
                    ? "correct"
                    : "incorrect",
              };
            });

            const updatedResults = await Promise.all(questionPromises);
            correctAnswers = updatedResults.filter(
              (q) => q.status === "correct",
            ).length;
          }

          const score =
            totalQuestions > 0
              ? Math.round((correctAnswers / totalQuestions) * 100)
              : 0;
          newScores[result.assessment_id] = score;
        } catch (error) {
          console.error(
            `Error fetching score for assessment ${result.assessment_id}:`,
            error,
          );
        }
      }

      setScores(newScores);
    };

    fetchScores();
  }, [data, client]);

  // -------------
  // Filter data
  // -------------
  const filteredData = (data || []).filter((result) => {
    const [langRaw, testRaw] = result.questionBankId.split("-");
    const language = langRaw.toLowerCase();
    const testType = testRaw.toLowerCase();

    if (selectedLanguages.length > 0 && !selectedLanguages.includes(language)) {
      return false;
    }

    if (selectedTestTypes.length > 0 && !selectedTestTypes.includes(testType)) {
      return false;
    }

    if (dateFilterActive && selectedDate) {
      const dbDateYMD = result.date.split("T")[0];
      const chosenYMD = toYMD(selectedDate);
      if (dbDateYMD !== chosenYMD) {
        return false;
      }
    }

    return true;
  });

  const handleCardClick = (result) => {
    if (!client) {
      console.warn("Client data is missing!");
      return;
    }
    navigate(`/clinicians/ResultsAnalysisPage`, {
      state: {
        date: result.date,
        firstName: client.firstName,
        lastName: client.lastName,
        assessmentId: result.assessment_id,
        questionBankId: result.questionBankId,
        parentUsername: client.parentUsername,
        score: scores[result.assessment_id] || 0,
        clientId: client.clientId,
        securityCode: client.securityCode,
      },
    });
  };

  return (
    <div className="flex flex-col justify-start items-end w-full space-y-4 h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {filteredData.length === 0 ? (
        <div className="mt-6 text-center w-full">
          No results found for the selected filters.
        </div>
      ) : (
        filteredData.map((result) => (
          <ResultCard
            key={result.assessment_id}
            score={`${scores[result.assessment_id] ?? "N/A"}%`}
            test={formatTestTitle(result.questionBankId)}
            date={formatDate(result.date)}
            onClick={() => handleCardClick(result)}
          />
        ))
      )}
    </div>
  );
}
