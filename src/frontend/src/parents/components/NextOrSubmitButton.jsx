export function NextOrSubmitButton({ isLastQuestion, onClick, disabled }) {
  return (
    <div className="flex justify-center px-5 mt-3 w-full min-h-[60px] max-md:px-5">
      <button
        className={`px-4 py-1 bg-slate-900 text-white rounded-lg ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {isLastQuestion ? "Submit" : "Next"}
      </button>
    </div>
  );
}
