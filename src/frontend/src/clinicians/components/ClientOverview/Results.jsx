import { useNavigate } from "react-router-dom";
import { ResultCard } from "./ResultCard";

export function Results({ data, client }) {
  const navigate = useNavigate();

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-500">No assessment history found.</p>;
  }

  const handleCardClick = (result) => {
    console.log("Navigating to Bias Review with:", { result, client });

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
      },
    });
  };

  return (
    <div className="flex flex-col justify-start items-start p-6 w-full space-y-4">
      {data.map((result) => (
        <ResultCard
          key={result.assessment_id}
          score="100%"
          date={`${result.questionBankId} - ${result.date}`}
          onClick={() => handleCardClick(result)} // Pass click event
        />
      ))}
    </div>
  );
}
