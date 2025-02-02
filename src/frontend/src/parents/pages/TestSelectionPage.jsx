import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTestSelection } from "../../redux/testSelectionSlice";
import { Header } from "../components/Header";

const languageOptions = [
  { label: "English", value: "english" },
  { label: "Mandarin", value: "mandarin" }
];

const testTypeOptions = [
  { label: "Matching", value: "matching" },
  { label: "Repetition", value: "repetition" }
];

function TestSelectionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTestType, setSelectedTestType] = useState(null);

  const handleNext = () => {
    if (!selectedLanguage || !selectedTestType) {
      alert("Please select a language and test type.");
      return;
    }

    // Store in Redux
    dispatch(setTestSelection({ language: selectedLanguage, testType: selectedTestType }));

    // Navigate to instructions (no state passing needed)
    navigate("/parents/checklist");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-5 pt-2.5 pb-56 bg-white">
      <Header title="Test Selection" />

      {/* Language Selection */}
      <h2 className="px-56 py-8 mb-10 bg-sky-400 rounded-xl w-[940px] text-center">
        Select the language of the test
      </h2>
      <div className="flex flex-col gap-6 text-xl mb-16">
        {languageOptions.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              name="language"
              value={option.value}
              checked={selectedLanguage === option.value}
              onChange={() => setSelectedLanguage(option.value)}
              className="w-5 h-5 mr-2 cursor-pointer"
            />
            <label className="cursor-pointer">{option.label}</label>
          </div>
        ))}
      </div>

      {/* Test Type Selection */}
      <h2 className="px-56 py-8 mb-10 bg-sky-400 rounded-xl w-[940px] text-center">
        Select the type of test
      </h2>
      <div className="flex flex-col gap-6 text-xl mb-20">
        {testTypeOptions.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              name="testtype"
              value={option.value}
              checked={selectedTestType === option.value}
              onChange={() => setSelectedTestType(option.value)}
              className="w-5 h-5 mr-2 cursor-pointer"
            />
            <label className="cursor-pointer">{option.label}</label>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button onClick={handleNext} className="px-4 py-2.5 bg-slate-900 text-white rounded-lg">
        Next
      </button>
    </div>
  );
}

export default TestSelectionPage;
