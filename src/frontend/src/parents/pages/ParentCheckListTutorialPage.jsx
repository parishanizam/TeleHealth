import * as React from "react";
import { ChecklistItem } from "../components/ChecklistItem";
import NextButton from "../components/NextButton";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";

const checklistItems = [
  {
    text: "Does your computer have a stable connection to the internet?"
  },
  {
    text: "Is the room quiet and without distractions?"
  },
  {
    text: "Is your audio set to a good volume?"
  },
  {
    text: "If your child is unsure about the answer, can you repeat the question for them?"
  },
  {
    text: "If your child hesitates, can you encourage them to guess?"
  },
  {
    text: "If your child is wrong, can you correct them?"
  },
  {
    text: "Is your child doing the selection/clicking independently?"
  }
];

function ParentChecklistPage() {
  return (
<div className="flex flex-col min-h-screen bg-white text-zinc-950">
  {/* Header */}
  <div className="flex justify-between items-center w-full px-8 py-4 bg-gray-100">
    <button className="flex gap-1.5 items-center text-2xl leading-none whitespace-nowrap">
      <img
        loading="lazy"
        src={BackArrow}
        alt="Back"
        className="object-contain w-4 aspect-square fill-slate-900"
      />
      <span>Back</span>
    </button>
    <div className="flex gap-6 items-center">
      {/* Language Button */}
      <button className="flex flex-col items-center text-base font-bold leading-none text-center">
        <img
          loading="lazy"
          src={Globe}
          alt="Language"
          className="object-contain w-6 aspect-square fill-slate-900"
        />
        <span>EN</span>
      </button>
      {/* Logout Button */}
      <button className="flex flex-col items-center text-base font-bold leading-none text-center">
        <img
          loading="lazy"
          src={Logout}
          alt="Logout"
          className="object-contain w-6 aspect-square fill-slate-900"
        />
        <span>Logout</span>
      </button>
    </div>
  </div>

  {/* Title and Instructions */}
  <div className="text-center mt-8">
    <h1 className="text-4xl font-bold">Parent Checklist</h1>
    <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
      The assessment will first prompt you to fill in a checklist to ensure your child is prepared to take the assessment with minimal assistance.
    </p>
  </div>

  {/* Checklist Prompt */}
  <div className="flex justify-center mt-6">
    <div className="bg-blue-400 text-white text-xl font-semibold py-4 px-8 rounded-lg shadow-md">
      Parents, please answer the following:
    </div>
  </div>

  {/* Checklist Items */}
  <div className="mt-8 px-8 max-w-3xl mx-auto">
    <ul className="space-y-4 text-lg text-gray-800">
      {checklistItems.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Next Button Positioned in Bottom-Right */}
  <div className="flex justify-end items-center mt-12 px-8 pb-8">
    <NextButton />
  </div>
</div>

  );
}

export default ParentChecklistPage;
