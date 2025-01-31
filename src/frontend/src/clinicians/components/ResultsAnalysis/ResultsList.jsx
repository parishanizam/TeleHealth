import QuestionCard from "./QuestionCard";

// 🔹 Now receives `results` & `questionBankId` dynamically
function ResultsList({ results, questionBankId }) {
  return (
    <div className="flex flex-col w-full max-w-lg text-3xl tracking-normal leading-10">
      <div className="text-center text-4xl font-semibold mb-4">
        Results
      </div>
      <div className="text-center text-2xl text-gray-700 mb-4">
        {questionBankId ? questionBankId.replace("-", " ") : "Unknown Test"}
      </div>

      {/* 🔹 Score Calculation (Dynamic) */}
      <div className="flex items-center justify-center w-16 h-16 bg-blue-400 text-white rounded-full self-center mb-4">
        <span className="text-xl font-semibold">
          {results.length > 0
            ? `${Math.round(
                (results.filter((r) => r.status === "correct").length /
                  results.length) *
                  100
              )}%`
            : "N/A"}
        </span>
      </div>

      {/* 🔹 Display Each Question Result */}
      {results.length > 0 ? (
        results.map((result, index) => (
          <QuestionCard
            key={index}
            questionNumber={index + 1}
            status={result.status}
            biasDetected={result.biasDetected}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No results available.</p>
      )}
    </div>
  );
}

export default ResultsList;
