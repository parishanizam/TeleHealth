import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatTestTitle } from "../../../utils/testTitleUtils";
import { formatDate } from "../../../utils/dateUtils";

const Graph = ({ client, filters, selectedDate }) => {
  const [scoresByTestType, setScoresByTestType] = useState({});

  const LANGUAGE_FILTERS = ["English", "Mandarin"];
  const TYPE_FILTERS = ["Matching", "Repetition", "Quantifier"];

  function toYMD(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (!client?.parentUsername) {
      console.warn("No client information provided for Graph.");
      return;
    }

    const fetchScores = async () => {
      try {
        const assessmentHistoryApiUrl = `https://telehealth-insights.onrender.com/resultstorage/assessment-history/${client.parentUsername}`;
        const response = await fetch(assessmentHistoryApiUrl);
        const assessmentHistory = await response.json();

        if (
          !assessmentHistory.assessments ||
          assessmentHistory.assessments.length === 0
        ) {
          console.warn("No assessment history found.");
          setScoresByTestType({});
          return;
        }

        const selectedLanguages = filters
          .filter((f) => LANGUAGE_FILTERS.includes(f))
          .map((f) => f.toLowerCase());
        const selectedTestTypes = filters
          .filter((f) => TYPE_FILTERS.includes(f))
          .map((f) => f.toLowerCase());
        const dateFilterActive = filters.includes("Date");

        const groupedScores = {};

        for (const result of assessmentHistory.assessments) {
          const [langRaw, testRaw] = result.questionBankId.split("-");
          const language = langRaw.toLowerCase();
          const testType = testRaw.toLowerCase();

          // Language filter
          if (
            selectedLanguages.length > 0 &&
            !selectedLanguages.includes(language)
          ) {
            continue;
          }
          // Test-type filter
          if (
            selectedTestTypes.length > 0 &&
            !selectedTestTypes.includes(testType)
          ) {
            continue;
          }
          // Date filter
          if (dateFilterActive && selectedDate) {
            const dbDateYMD = result.date.split("T")[0];
            const chosenYMD = toYMD(selectedDate);
            if (dbDateYMD !== chosenYMD) {
              continue;
            }
          }
          const resultsApiUrl = `https://telehealth-insights.onrender.com/resultstorage/results/${client.parentUsername}/${result.assessment_id}`;
          const resultsResponse = await fetch(resultsApiUrl);
          const resultsData = await resultsResponse.json();
          if (!resultsData.results) continue;

          let correctAnswers = 0;
          const totalQuestions = resultsData.results.length;

          if (testType === "repetition") {
            correctAnswers = resultsData.results.filter(
              (q) => q.mark_state === "Correct",
            ).length;
          } else {
            const questionPromises = resultsData.results.map(async (res) => {
              const questionApiUrl = `https://telehealth-insights.onrender.com/questions/${language}/${testType}/${res.question_id}`;
              const questionResponse = await fetch(questionApiUrl);
              const questionData = await questionResponse.json();

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

          const combination = formatTestTitle(`${language}-${testType}`);

          if (!groupedScores[combination]) {
            groupedScores[combination] = [];
          }
          const testNumber = groupedScores[combination].length + 1;

          groupedScores[combination].push({
            name: `${testNumber}`,
            score,
            date: formatDate(result.date),
          });
        }

        setScoresByTestType(groupedScores);
      } catch (error) {
        console.error("Error fetching scores for graph:", error);
        setScoresByTestType({});
      }
    };

    fetchScores();
  }, [client, filters, selectedDate]);

  const maxTests = Math.max(
    0,
    ...Object.values(scoresByTestType).map((scores) => scores.length),
  );
  const xAxisLabels = Array.from({ length: maxTests }, (_, i) => `${i + 1}`);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="p-2 bg-white border border-gray-300 rounded shadow-md">
          <p className="font-bold">Test {entry.name}</p>
          {payload.map((item, idx) => (
            <p key={idx} style={{ color: item.color }}>
              {item.payload.date}: {item.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div
        style={{
          marginBottom: 10,
          textAlign: "center",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        {payload.map((entry, index) => (
          <span
            key={`item-${index}`}
            style={{
              marginRight: 20,
              display: "inline-flex",
              alignItems: "center",
              color: entry.color,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: entry.color,
                marginRight: 5,
              }}
            ></span>
            {entry.value}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "1000px", height: "400px", margin: "0 auto" }}>
      {Object.keys(scoresByTestType).length === 0 ? (
        <p>No data available to plot.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              type="category"
              allowDuplicatedCategory={false}
              ticks={xAxisLabels}
              label={{
                value: "Attempt",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              content={<CustomLegend />}
              verticalAlign="top"
              align="center"
            />
            {Object.entries(scoresByTestType).map(([combo, scores], idx) => (
              <Line
                key={combo}
                type="monotone"
                dataKey="score"
                name={combo}
                data={scores}
                stroke={`hsl(${idx * 60}, 70%, 50%)`}
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
