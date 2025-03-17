import { useNavigate } from "react-router-dom";

function PreviousPageButton({ 
  parentUsername, 
  assessmentId, 
  date, 
  firstName, 
  lastName, 
  clientId, // Accept clientId as a prop
  destination = "/clinicians/ResultsAnalysisPage" // Default destination
}) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    // Dynamically update the destination based on the presence of clientId
    const dynamicDestination = clientId 
      ? `/clinicians/ClientOverview/${clientId}` // Navigate to client overview if clientId is provided
      : destination; // Otherwise, navigate to the ResultsAnalysisPage

    navigate(dynamicDestination, {
      state: { parentUsername, assessmentId, date, firstName, lastName, clientId },
    });
  };

  return (
    <button
      onClick={handleNavigation}
      className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"
    >
      {clientId ? "Return to Client Overview" : "Return to Results"} {/* Dynamically change button text */}
    </button>
  );
}

export default PreviousPageButton;
