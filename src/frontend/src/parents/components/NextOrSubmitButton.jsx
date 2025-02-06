// eslint-disable-next-line react/prop-types
export function NextOrSubmitButton({ isLastQuestion, onClick }) {
    return (
      <div className="flex justify-center px-60 mt-5 w-full min-h-[60px] max-md:px-5">
        <button
          className="px-4 py-2.5 bg-slate-900 text-white rounded-lg"
          onClick={onClick}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </button>
      </div>
    );
  }