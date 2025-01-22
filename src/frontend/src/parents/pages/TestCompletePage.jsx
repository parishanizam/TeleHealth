import React, { useState } from "react";
import { Header } from "../components/Header";
import SmileyFace from "../../assets/smileyface.svg";
import NextButton from "../components/NextButton"; // Adjust the import path if necessary

// Options for the radio buttons
const testOptions = [
  { label: "English Matching", value: "english" },
  { label: "Mandarin Matching", value: "mandarin" }
];

function TestComplete() {
  const [selectedOption, setSelectedOption] = useState("");

  // Handle radio button change
  const handleOptionChange = (value) => {
    setSelectedOption(value);
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

      {/* Radio Button Options */}
      <div className="flex flex-col items-center mt-6 w-full text-xl text-black">
        {testOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 mt-5 first:mt-0"
          >
            <input
              type="radio"
              name="testOption"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleOptionChange(option.value)}
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>

      {/* Buttons NEED TO ADD CORRECT ROUTES*/}
      <div className="flex flex-col gap-3 items-center mt-6">
        <NextButton to="/next-test" name="Start Next Test" />
        <NextButton to="/" name="Return to Homepage" />
      </div>
    </div>
  );
}

export default TestComplete;
