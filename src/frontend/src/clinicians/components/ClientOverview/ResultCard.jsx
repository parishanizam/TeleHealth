import ChevronIcon from "../../../assets/chevron.svg";

// eslint-disable-next-line react/prop-types
export function ResultCard({ score, test, date, onClick }) {
  return (
    <button
      onClick={onClick} // Click triggers navigation
      className="flex flex-wrap justify-between content-center items-center px-3 mt-2.5 w-full text-center bg-sky-400 rounded-xl gap-[569px_100px] max-w-[742px] min-h-[101px] max-md:max-w-full cursor-pointer hover:bg-sky-500 transition"
    >
      {/* Score Circle */}
      <div className="flex items-center justify-center rounded-full min-h-[101px] min-w-[101px] bg-blue-400">
        <span className="text-lg font-bold text-neutral-900">{score}</span>
      </div>

      {/* Test & Date on separate lines */}
      <div className="self-stretch my-auto">
        <div>{test}</div>
        <div>{date}</div>
      </div>

      {/* Chevron Icon */}
      <img
        loading="lazy"
        src={ChevronIcon}
        alt="Navigate"
        className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
      />
    </button>
  );
}
