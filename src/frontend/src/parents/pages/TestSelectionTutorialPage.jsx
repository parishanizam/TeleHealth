import React from "react";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";
import TestSelectionImage from "../../assets/TestSelection.png";

function TestSelectionTutorialPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-2.5 max-md:px-4 overflow-hidden text-zinc-950">
      {/* Header */}
      <Header title="Test Selection Tutorial" />

      {/* Instructions */}
      <section className="mt-4 text-lg leading-6 text-center max-md:mt-2 max-md:text-base">
        To begin the assessment, you will be prompted to select your preferred language and test type.
      </section>

      {/* Test Selection Image */}
      <section className="flex justify-center mt-8 px-8 max-md:px-4">
        <img
          loading="lazy"
          src={TestSelectionImage}
          alt="Test Selection Interface"
          className="w-full max-w-5xl border border-gray-300 rounded-lg shadow-md"
        />
      </section>

      {/* Next Button */}
      <div className="mt-8 flex justify-center px-8 max-md:px-4">
        <NextButton to="/parents/ParentChecklistPageTutorial" name="Next" />
      </div>
    </div>
  );
}

export default TestSelectionTutorialPage;
