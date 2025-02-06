import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTestSelection } from "../../redux/testSelectionSlice";
import { Header } from "../components/Header";

const testTypeOptionsByLanguage = {
  english: [
    { label: "Matching", value: "matching" },
    { label: "Repetition", value: "repetition" }
  ],
  mandarin: [
    { label: "Matching", value: "matching" },
    { label: "Repetition", value: "repetition" }//,
    // { label: "Quantifier", value: "quantifier" } // Future implementation for quantifier type of questions
  ]
};

function TestSelectionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTestType, setSelectedTestType] = useState("");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setSelectedTestType(""); // Reset test type when language changes
  };

  const handleNext = () => {
    if (!selectedLanguage || !selectedTestType) {
      alert("Please select a language and test type.");
      return;
    }

    dispatch(setTestSelection({ language: selectedLanguage, testType: selectedTestType }));
    navigate("/parents/checklist");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-5 pt-2.5 pb-56 bg-white">
      <Header title="Test Selection" />

      {/* Language Selection */}
      <h2 className="px-56 py-8 mb-10 bg-sky-400 rounded-xl w-[940px] text-center text-2xl">
        Select Test Language
      </h2>
      <select
        value={selectedLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="mb-16 px-4 py-2 text-xl border rounded-lg w-full max-w-[400px]"
      >
        <option value="" disabled>Select a language</option>
        <option value="english">English</option>
        <option value="mandarin">Mandarin</option>
      </select>

      {/* Test Type Selection */}
      <h2 className="px-56 py-8 mb-10 bg-sky-400 rounded-xl w-[940px] text-center text-2xl">
        Select Test Type
      </h2>
      <select
        value={selectedTestType}
        onChange={(e) => setSelectedTestType(e.target.value)}
        className="mb-20 px-4 py-2 text-xl border rounded-lg w-full max-w-[400px]"
        disabled={!selectedLanguage}
      >
        <option value="" disabled>Select a test type</option>
        {selectedLanguage &&
          testTypeOptionsByLanguage[selectedLanguage].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      {/* Next Button */}
      <button onClick={handleNext} className="px-4 py-2.5 bg-slate-900 text-white rounded-lg">
        Next
      </button>
    </div>
  );
}

export default TestSelectionPage;
