import React from "react";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";
import TestSelectionImage from "../../assets/TestSelection.png";

function TestSelectionTutorialPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-2.5 max-md:px-4 overflow-hidden text-zinc-950">

      <Header title="Test Selection Tutorial" />

      <section className="mt-4 text-lg leading-6 text-center max-md:mt-2 max-md:text-base">
        To begin the assessment, you will be prompted to select your language and test type, which was provided by your clinician via email. 
      </section>

      <section className="flex justify-center mt-8 px-8 max-md:px-4">
        <img
          loading="lazy"
          src={TestSelectionImage}
          alt="Test Selection Interface"
          className="w-full max-w-5xl border border-gray-400 rounded-lg shadow-md"
        />
      </section>

      <section className="mt-4 text-lg leading-6 text-center max-md:mt-2 max-md:text-base">
      <h2 className="font-bold text-blue-600 mb-2">
        Available Options
      </h2>
        <p><strong>Language Type: </strong> English, Mandarin</p>
        <p><strong>Test Type: </strong> Matching, Repetition, Quantifiers</p>
      </section>

      {/* Next Button */}
      <div className="mt-8 flex justify-center px-8 max-md:px-4">
        <NextButton to="/parents/ParentChecklistPageTutorial" name="Next" />
      </div>
    </div>
  );
}

export default TestSelectionTutorialPage;
