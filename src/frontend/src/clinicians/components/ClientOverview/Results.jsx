import { ResultCard } from "./ResultCard";
import { resultsData } from "./ResultsData";

export function Results() {
  return (
    <div className="flex flex-col justify-center items-start self-stretch py-40 pr-8 pl-12 my-auto min-w-[240px] w-[820px] max-md:px-5 max-md:py-24 max-md:max-w-full absolute left-1/2">
      <div className="text-5xl tracking-normal leading-[52px] text-neutral-900 max-md:max-w-full max-md:text-4xl">
        Results
      </div>
      {resultsData.map((result) => (
        <ResultCard key={result.id} score={result.score} date={result.date} />
      ))}
    </div>
  );
}
