// eslint-disable-next-line react/prop-types
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
