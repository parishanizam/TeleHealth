import React from "react";
import { useNavigate } from "react-router-dom";

function PreviousPageButton({
  clientId,
  parentUsername,
  firstName,
  lastName,
  securityCode,
  className = "",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clinicians/ClientOverview/${clientId}`, {
      state: {
        client: {
          clientId,
          parentUsername,
          firstName,
          lastName,
          securityCode,
        },
      },
    });
  };

  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
      onClick={handleClick}
    >
      Back to {firstName}'s Overview
    </button>
  );
}

export default PreviousPageButton;
