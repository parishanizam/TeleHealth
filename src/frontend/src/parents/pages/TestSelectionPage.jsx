import * as React from "react";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";

const languageOptions = [
  { label: "English", value: "english" },
  { label: "Mandarin", value: "mandarin" }
];

const testTypeOptions = [
  { label: "Matching", value: "matching" },
  { label: "Repetition", value: "repetition" }
];

function TestSelectionPage() {
  return (
<div className="flex flex-col justify-center items-center min-h-screen px-5 pt-2.5 pb-56 bg-white max-md:pb-24">
  <Header title="Test Selection" />

  {/* Main Content */}
  <div className="flex flex-col justify-center items-center mt-auto mb-auto w-full text-3xl text-black max-md:mt-10 max-md:max-w-full">
    {/* Language Selection */}
    <h2 className="px-56 py-8 mb-10 max-w-full tracking-normal leading-10 text-center bg-sky-400 rounded-xl min-h-[101px] w-[940px] max-md:px-5 max-md:max-w-full">
      Select the language of the test
    </h2>
    <div className="flex flex-col gap-6 text-xl mb-16">
      {languageOptions.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`language-${option.value}`}
            name="language"
            value={option.value}
            className="w-5 h-5 mr-2 cursor-pointer"
          />
          <label htmlFor={`language-${option.value}`} className="cursor-pointer">
            {option.label}
          </label>
        </div>
      ))}
    </div>

    {/* Test Type Selection */}
    <h2 className="px-56 py-8 mb-10 max-w-full tracking-normal leading-10 text-center bg-sky-400 rounded-xl min-h-[101px] w-[940px] max-md:px-5 max-md:max-w-full">
      Select the type of test
    </h2>
    <div className="flex flex-col gap-6 text-xl mb-20">
      {testTypeOptions.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`testtype-${option.value}`}
            name="testtype"
            value={option.value}
            className="w-5 h-5 mr-2 cursor-pointer"
          />
          <label htmlFor={`testtype-${option.value}`} className="cursor-pointer">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>

  {/* Next Button */}
  
  <div className="flex gap-2.5 justify-center items-center px-60 mt-18 w-full min-h-[60px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
    <NextButton to="/parents/checklist" />
  </div>
</div>

  );
}

export default TestSelectionPage;