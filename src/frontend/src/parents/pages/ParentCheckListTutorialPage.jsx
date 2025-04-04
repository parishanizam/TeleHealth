/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 27, 2025
 * Purpose: Displays ParentChecklistTutorialPage and its content
 */

import React from "react";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";
import ParentChecklistImage from "../../assets/Parentchecklist.png";

function ParentChecklistPage() {
  return (
    <div className="flex flex-col px-5 pt-2.5 bg-white max-md:px-4 overflow-hidden min-h-screen">
      <Header title="Parent Checklist Tutorial" />

      {/* Instructions */}
      <section className="text-center mt-8 px-4">
        <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
          Please thoroughly review set up instructions and rules carefully
          before proceeding with each assessment.
        </p>
      </section>

      {/* Checklist Image */}
      <section className="flex justify-center mt-8 px-8 max-md:px-4">
        <img
          loading="lazy"
          src={ParentChecklistImage}
          alt="Parent Checklist"
          className="w-full max-w-5xl border border-gray-300 rounded-lg shadow-md"
        />
      </section>

      <div className="flex justify-center items-center mt-12 px-8 pb-8">
        <NextButton to="/parents/MediaTestingTutorialPage" name="Next" />
      </div>
    </div>
  );
}

export default ParentChecklistPage;
