import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTestSelection } from "../../redux/testSelectionSlice";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import SmileyFace from "../../assets/smileyface.svg";
import NextButton from "../components/NextButton";

// Language options
const languageOptions = [
  { label: "English", value: "english" },
  { label: "Mandarin", value: "mandarin" }
];

// Test Type options
const testTypeOptions = [
  { label: "Matching", value: "matching" },
  { label: "Repetition", value: "repetition" }
];

function TestComplete() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTestType, setSelectedTestType] = useState("");

  // Handle language change
  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  // Handle test type change
  const handleTestTypeChange = (value) => {
    setSelectedTestType(value);
  };

  // Handle start next test
  const handleStartNextTest = () => {
    if (!selectedLanguage || !selectedTestType) {
      alert("Please select a language and test type.");
      return;
    }

    // 🔹 Update Redux with new selection
    dispatch(setTestSelection({ language: selectedLanguage, testType: selectedTestType }));

    // Navigate to instructions (next test setup)
    navigate("/parents/EnglishMatchingInstructions");
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 bg-white pb-[510px] max-md:pb-24">
      {/* Header */}
      <Header title="Test Complete" />

      {/* Smiley Face */}
      <div className="flex justify-center mt-6">
        <img
          loading="lazy"
          src={SmileyFace}
          alt="Test completion indicator"
          className="object-contain w-[100px]"
        />
      </div>

      {/* Language Selection */}
      <h2 className="mt-6 text-xl text-center font-semibold">Select Language</h2>
      <div className="flex flex-col items-center mt-4 w-full text-lg text-black">
        {languageOptions.map((option) => (
          <div key={option.value} className="flex items-center gap-2.5 mt-3">
            <input
              type="radio"
              name="language"
              value={option.value}
              checked={selectedLanguage === option.value}
              onChange={() => handleLanguageChange(option.value)}
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>

      {/* Test Type Selection */}
      <h2 className="mt-6 text-xl text-center font-semibold">Select Test Type</h2>
      <div className="flex flex-col items-center mt-4 w-full text-lg text-black">
        {testTypeOptions.map((option) => (
          <div key={option.value} className="flex items-center gap-2.5 mt-3">
            <input
              type="radio"
              name="testType"
              value={option.value}
              checked={selectedTestType === option.value}
              onChange={() => handleTestTypeChange(option.value)}
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 items-center mt-6">
        {/* 🔹 Updates Redux & Navigates to Instructions */}
        <button
          onClick={handleStartNextTest}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg"
        >
          Start Next Test
        </button>
        
        {/* Return to Homepage */}
        <NextButton to="/parents/ParentHomePage" name="Return to Homepage" />
      </div>
    </div>
  );
}

export default TestComplete;
