import { useNavigate } from "react-router-dom";
function ReturnToResultsButton({
  parentUsername,
  assessmentId,
  date,
  firstName,
  lastName,
  clientId,
  securityCode,
  className = "",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/clinicians/ResultsAnalysisPage", {
      state: {
        parentUsername,
        assessmentId,
        date,
        firstName,
        lastName,
        clientId,
        securityCode,
      },
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
    >
      Return to Results
    </button>
  );
}

export default ReturnToResultsButton;
