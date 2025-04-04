/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: February 6, 2025
 * Purpose: Contains ResultCard components for listing past assessments on the ParentOverview page
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResultCard } from "./ResultCard";
import { formatDate } from "../../../utils/dateUtils";
import { formatTestTitle } from "../../../utils/testTitleUtils";

export function Results({ data, parent, filters = [], selectedDate = null }) {
  const navigate = useNavigate();
  const [scores, setScores] = useState({});
  const LANGUAGE_FILTERS = ["English", "Mandarin"];
  const TYPE_FILTERS = ["Matching", "Repetition", "Quantifier"];

  // Format to "YYYY-MM-DD" safely
  const formatYMD = (date) => new Date(date).toISOString().split("T")[0];

  useEffect(() => {
    const fetchScores = async () => {
      if (!data || !Array.isArray(data) || data.length === 0 || !parent) return;

      const newScores = {};

      for (const result of data) {
        try {
          const resultsApiUrl = `https://telehealth-insights.onrender.com/resultstorage/results/${parent.username}/${result.assessment_id}`;
          const response = await fetch(resultsApiUrl);
          const fetchedData = await response.json();

          if (!fetchedData.results || !fetchedData.questionBankId) continue;

          const fetchedQuestionBankId = fetchedData.questionBankId;
          const [langRaw, testRaw] = fetchedQuestionBankId.split("-");
          const testType = testRaw.toLowerCase();

          let correctAnswers = 0;
          const totalQuestions = fetchedData.results.length;

          if (testType === "repetition") {
            const hasUndetermined = fetchedData.results.some(
              (q) => q.mark_state === "Undetermined"
            );
            if (hasUndetermined) {
              newScores[`${result.assessment_id}_${fetchedQuestionBankId}`] = "N/A";
              continue;
            }
            correctAnswers = fetchedData.results.filter(
              (q) => q.mark_state === "Correct"
            ).length;
          } else {
            const questionPromises = fetchedData.results.map(async (res) => {
              const questionRes = await fetch(
                `https://telehealth-insights.onrender.com/questions/${langRaw}/${testRaw}/${res.question_id}`,
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
              (q) => q.status === "correct"
            ).length;
          }

          const score =
            totalQuestions > 0
              ? Math.round((correctAnswers / totalQuestions) * 100)
              : 0;

          newScores[`${result.assessment_id}_${fetchedQuestionBankId}`] = score;
        } catch (error) {
          console.error(
            `Error fetching score for assessment ${result.assessment_id}:`,
            error
          );
        }
      }

      setScores(newScores);
    };

    fetchScores();
  }, [data, parent]);

  const filteredData = (data || []).filter((result) => {
    if (!result.questionBankId || !result.questionBankId.includes("-")) return false;

    const [langRaw, testRaw] = result.questionBankId.split("-");
    const language = langRaw.toLowerCase();
    const testType = testRaw.toLowerCase();

    const selectedLanguages = filters
      .filter((f) => LANGUAGE_FILTERS.includes(f))
      .map((f) => f.toLowerCase());

    if (selectedLanguages.length > 0 && !selectedLanguages.includes(language)) {
      return false;
    }

    const selectedTestTypes = filters
      .filter((f) => TYPE_FILTERS.includes(f))
      .map((f) => f.toLowerCase());

    if (selectedTestTypes.length > 0 && !selectedTestTypes.includes(testType)) {
      return false;
    }

    if (filters.includes("Date") && selectedDate) {
      const resultYMD = formatYMD(result.date);
      const selectedYMD = formatYMD(selectedDate);
      if (resultYMD !== selectedYMD) return false;
    }

    return true;
  });

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
        score: scores[`${result.assessment_id}_${result.questionBankId}`] || 0,
      },
    });
  };

  return (
    <div className="flex flex-col justify-start items-start p-6 w-full space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {filteredData.map((result) => (
        <ResultCard
          key={`${result.assessment_id}_${result.questionBankId}`}
          score={`${scores[`${result.assessment_id}_${result.questionBankId}`] ?? "N/A"}%`}
          test={formatTestTitle(result.questionBankId)}
          date={formatDate(result.date)}
          onClick={() => handleCardClick(result)}
        />
      ))}
    </div>
  );
}
