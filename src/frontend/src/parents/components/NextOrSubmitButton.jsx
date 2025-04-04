/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 25, 2025
 * Purpose: Contains the Next or Submit Button component which to be used on the QuizManagement page
 *          for either going to the next question, or submitting an assessment
 */

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
