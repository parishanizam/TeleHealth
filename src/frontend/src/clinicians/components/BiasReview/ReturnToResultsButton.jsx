// ReturnToResultsButton.jsx
import { useNavigate } from "react-router-dom";

/**
 * A button that always goes to "/clinicians/ResultsAnalysisPage"
 * passing along any props (like date, firstName, lastName, etc.)
 */
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
    // Always go to ResultsAnalysisPage
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
    <button onClick={handleClick} className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}>
      Return to Results
    </button>
  );
}

export default ReturnToResultsButton;
