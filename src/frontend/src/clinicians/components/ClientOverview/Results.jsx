import { ResultCard } from "./ResultCard";
import { resultsData } from "./ResultsData";

export function Results() {
  return (
    <div className="flex flex-col justify-start items-start p-6 w-full space-y-4 bg-white rounded-md shadow-md">
      {resultsData.map((result) => (
        <ResultCard key={result.id} score={result.score} date={result.date} />
      ))}
    </div>
  );
}
