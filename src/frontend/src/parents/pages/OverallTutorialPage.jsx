import * as React from "react";
import { useNavigate } from "react-router-dom"; 
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";

function OverallTutorialPage() {
  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      {/* Header */}
      <Header title="TeleHealth Insights" />

      <div className="mt-5 px-8 max-w-10xl mx-auto space-y-12">
        <h2 className="text-4xl font-semibold text-center">
          Would you like to take a tutorial before starting the test?
        </h2>
        <p className="text-2xl text-gray-600 mb-6 text-center">
          Select a test type below to begin the corresponding tutorial.
        </p>

        <button
            className="w-full px-4 py-10 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 text-xl"
            onClick={() => navigate("/parents/MatchingTutorialPage")}
          >
            Matching Tutorial
          </button> 

        <div className="space-y-11">
          <button
            className="w-full px-4 py-10 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 text-xl"
            onClick={() => navigate("/parents/RepetitionTutorialPage")}
          >
            Repetition Tutorial
          </button>

          <button
            className="w-full px-4 py-10 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900 text-xl"
            onClick={() => navigate("/parents/QuantifierTutorialPage")}
          >
            Mandarin Quantifier Tutorial
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-12 px-8 pb-8 space-x-4">
        <NextButton to="/parents/TutorialComplete" name="Skip" />
      </div>
    </div>
    
  );
}

export default OverallTutorialPage;

