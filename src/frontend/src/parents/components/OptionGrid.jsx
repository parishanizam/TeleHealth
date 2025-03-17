import MatchingCard from "../components/MatchingCard";

// eslint-disable-next-line react/prop-types
export function OptionGrid({ options, selectedAnswer, handleAnswerClick }) {
// fixed dynamic calculation for question options
const columns = options.length % 2 === 0 ? 2 : 3; // 2 for even, 3 for odd
const gridClass = `grid grid-cols-${columns} gap-5`;


  return (
    <div className="mt-2 flex justify-center w-full">
      <div className={gridClass}>
        {options.map((option) => (
          <MatchingCard
            key={option.id}
            image={option.image}
            onClick={() => handleAnswerClick(option.id)}
            isSelected={selectedAnswer === option.id}
          />
        ))}
      </div>
    </div>
  );
}
