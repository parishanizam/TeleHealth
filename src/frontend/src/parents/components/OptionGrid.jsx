/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 23, 2025
 * Purpose: Contains Option Grid which contains various Matching Card components
 *          dynamically changes number of columns depending on length of options
 *          to be used on the QuizManagement page
 */

import MatchingCard from "../components/MatchingCard";

export function OptionGrid({ options, selectedAnswer, handleAnswerClick }) {
  const columns = options.length % 2 === 0 ? 2 : 3;
  const gridClass = `grid grid-cols-${columns} gap-1`;

  return (
    <div className="flex justify-center w-full">
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
