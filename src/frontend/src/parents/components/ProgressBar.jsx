/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 27, 2025
 * Purpose: Contains ProgressBar component, which tracks assessment progress and communicates
 *          to users how far in an assessment they are. To be used on QuizManagement page
 */

export function ProgressBar({ questionNumber, totalQuestions }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all"
        style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
      />
    </div>
  );
}
