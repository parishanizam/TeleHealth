export function ResultCard({ score, test, date, onClick }) {
  return (
    <button
      className="flex items-center justify-start p-4 w-full max-w-[742px] h-[120px] 
                 bg-sky-400 rounded-xl max-md:max-w-full"
    >
      <div
        className="flex items-center justify-center w-[101px] h-[101px] 
                      bg-blue-400 rounded-full"
      >
        <span className="text-lg font-bold text-neutral-900">{score}</span>
      </div>

      {/* Test & Date */}
      <div className="flex flex-col justify-center ml-6 text-left">
        <div className="text-base font-semibold">{test}</div>
        <div className="text-sm text-neutral-600">{date}</div>
      </div>
    </button>
  );
}
