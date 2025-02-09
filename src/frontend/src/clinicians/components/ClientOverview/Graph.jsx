import React, { useEffect, useState } from "react";
import axios from "axios";
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

const Graph = ({ client }) => {
  const [scoresByTestType, setScoresByTestType] = useState({});

  useEffect(() => {
    const fetchScores = async () => {
      if (!client || !client.parentUsername) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/results/calculate-scores/${client.parentUsername}`
        );
        if (response.data && response.data.groupedScores) {
          setScoresByTestType(response.data.groupedScores);
        } else {
          setScoresByTestType({});
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
        setScoresByTestType({});
      }
    };

    fetchScores();
  }, [client]);

  const maxTests = Math.max(
    ...Object.values(scoresByTestType).map((scores) => scores.length),
    0 // Ensures it does not break when empty
  );

  const xAxisLabels = Array.from({ length: maxTests }, (_, i) => `Test ${i + 1}`);

  return (
    <div style={{ width: "800px", height: "400px", margin: "0 auto" }}>
      {Object.keys(scoresByTestType).length === 0 ? (
        <p>No data available to plot.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" type="category" allowDuplicatedCategory={false} ticks={xAxisLabels} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            {Object.entries(scoresByTestType).map(([testType, scores], index) => (
              <Line
                key={testType}
                type="monotone"
                dataKey="score"
                name={testType}
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
