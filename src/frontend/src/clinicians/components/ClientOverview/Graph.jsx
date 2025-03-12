import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatTestTitle } from "../../../utils/testTitleUtils";
import { formatDate } from "../../../utils/dateUtils";

const Graph = ({ client }) => {
  const [scoresByTestType, setScoresByTestType] = useState({});

  useEffect(() => {
    if (!client || !client.parentUsername) {
      console.warn("No client information provided for Graph.");
      return;
    }

    const fetchScores = async () => {
      try {
        const assessmentHistoryApiUrl = `http://localhost:3000/resultstorage/assessment-history/${client.parentUsername}`;
        const response = await fetch(assessmentHistoryApiUrl);
        const assessmentHistory = await response.json();

        if (!assessmentHistory.assessments || assessmentHistory.assessments.length === 0) {
          console.warn("No assessment history found.");
          return;
        }

        const groupedScores = {};

        for (const result of assessmentHistory.assessments) {
          const resultsApiUrl = `http://localhost:3000/resultstorage/results/${client.parentUsername}/${result.assessment_id}`;
          const resultsResponse = await fetch(resultsApiUrl);
          const resultsData = await resultsResponse.json();

          if (!resultsData.results) continue;

          const fetchedQuestionBankId = resultsData.questionBankId;
          const [language, testType] = fetchedQuestionBankId.split("-");

          // Create key for graph grouping
          const combination = formatTestTitle(`${language}-${testType}`);

          if (!groupedScores[combination]) {
            groupedScores[combination] = [];
          }

          let correctAnswers = 0;
          let totalQuestions = resultsData.results.length;

          if (testType === "repetition") {
            correctAnswers = resultsData.results.filter((q) => q.mark_state === "Correct").length;
          } else {
            const questionPromises = resultsData.results.map(async (res) => {
              const questionApiUrl = `http://localhost:3000/questions/${language}/${testType}/${res.question_id}`;
              const questionResponse = await fetch(questionApiUrl);
              const questionData = await questionResponse.json();

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
          const testNumber = groupedScores[combination].length + 1;

          // Add the test date alongside score and test number
          groupedScores[combination].push({
            name: `${testNumber}`,
            score,
            date: formatDate(result.date), // Format the date
          });
        }

        setScoresByTestType(groupedScores);
      } catch (error) {
        console.error("Error fetching scores for graph:", error);
      }
    };

    fetchScores();
  }, [client]);

  const maxTests = Math.max(
    ...Object.values(scoresByTestType).map((scores) => scores.length)
  );
  const xAxisLabels = Array.from({ length: maxTests }, (_, i) => `${i + 1}`);

  // Custom Tooltip to display date and score
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload; // Access the data from the first payload entry
      return (
        <div className="p-2 bg-white border border-gray-300 rounded shadow-md">
          <p className="font-bold">Test {entry.name}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.payload.date}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ maxwidth: "1000px", height: "400px", margin: "0 auto" }}>
      {Object.keys(scoresByTestType).length === 0 ? (
        <p>No data available to plot.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              type="category"
              allowDuplicatedCategory={false}
              ticks={xAxisLabels}
              label={{ value: "Tests", position: "insideBottom", offset: -10, dy: -10 }}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend layout="vertical" align="right" verticalAlign="top" offset={200} />
            {Object.entries(scoresByTestType)
              .filter(([, scores]) => scores.length > 0)
              .map(([combination, scores], index) => (
                <Line
                  key={combination}
                  type="monotone"
                  dataKey="score"
                  name={combination}
                  data={scores}
                  stroke={`hsl(${index * 60}, 70%, 50%)`}
                  strokeWidth={2}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Graph;
