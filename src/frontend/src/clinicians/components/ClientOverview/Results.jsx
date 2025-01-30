import { ResultCard } from "./ResultCard";

export function Results({ data }) {
  console.log("Results Component Data:", data); // Debugging output

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-500">No assessment history found.</p>;
  }

  return (
    <div className="flex flex-col justify-start items-start p-6 w-full space-y-4">
      {data.map((result) => (
        <ResultCard
          key={result.assessment_id}
          score="100%"
          date={`${result.questionBankId} - ${result.date}`}
        />
      ))}
    </div>
  );
}
