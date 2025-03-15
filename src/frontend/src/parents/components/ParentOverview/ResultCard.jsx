import ChevronIcon from "../../../assets/chevron.svg";

// eslint-disable-next-line react/prop-types
export function ResultCard({ score, test, date, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex justify-between items-center p-4 w-full bg-sky-400 rounded-xl max-w-[742px] h-[120px] max-md:max-w-full cursor-pointer hover:bg-sky-500 transition"
    >
      {/* Score Circle */}
      <div className="flex items-center justify-center rounded-full w-[101px] h-[101px] bg-blue-400">
        <span className="text-lg font-bold text-neutral-900">{score}</span>
      </div>

      {/* Test & Date */}
      <div className="flex flex-col justify-center items-start ml-4">
        <div className="text-base font-semibold">{test}</div>
        <div className="text-sm text-neutral-600">{date}</div>
      </div>

      {/* Chevron Icon */}
      <img
        loading="lazy"
        src={ChevronIcon}
        alt="Navigate"
        className="w-8 h-8 object-contain ml-auto"
      />
    </button>
  );
}
