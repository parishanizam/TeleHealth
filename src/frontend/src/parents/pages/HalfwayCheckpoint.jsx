import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Halfwaythrough from "../../assets/Halfwaythrough.gif";

export default function MotivationPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/parents/QuizManagement");
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-100 p-4">
      <Card className="bg-blue-200 rounded-lg shadow-xl p-12 w-full max-w-4xl">
        <Card.Body className="text-center">
          <img
            src={Halfwaythrough}
            alt="Motivational GIF"
            className="w-full max-w-xl mb-8 mx-auto"
          />
          <h1 className="text-4xl font-bold mb-4 text-blue-600 text-center">
            You're halfway there!
          </h1>
          <p className="text-2xl mb-8 text-center">
            Keep going, you can do it!
          </p>
          <button
            onClick={handleContinue}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-2xl hover:bg-blue-700 transition duration-300 mx-auto block"
          >
            Continue
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}
