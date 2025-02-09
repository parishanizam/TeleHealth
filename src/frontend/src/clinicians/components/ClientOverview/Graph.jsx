import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatTestTitle } from "../../../utils/testTitleUtils";
const Graph = ({ client }) => {
const [scoresByTestType, setScoresByTestType] = useState({}); // To store scores grouped by test type
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
        // a line for each language and testtype (5 possible combinations)
        const combination = formatTestTitle(`${language}-${testType}`);
        if (!groupedScores[combination]) {
          groupedScores[combination] = [];
        }
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
        // Calculating scores from api to graph
        const totalQuestions = updatedResults.length;
        const correctAnswers = updatedResults.filter((q) => q.status === "correct").length;
        const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        const testNumber = groupedScores[combination].length + 1;
        groupedScores[combination].push({
          name: `Test ${testNumber}`,
          score,
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
const xAxisLabels = Array.from({ length: maxTests }, (_, i) => `Test ${i + 1}`);
// setting div so that graph is set on page and is always same dimension
return (
  <div style={{ width: "800px", height: "400px", margin: "0 auto" }}>
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
          />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
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