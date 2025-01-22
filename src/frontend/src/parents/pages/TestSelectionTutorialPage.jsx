import * as React from "react";
import { LanguageOption } from "../components/LanguageOption";
import { TestTypeOption } from "../components/TestTypeOption";
import { SelectionBox } from "../components/SelectionBox";
import NextButton from "../components/NextButton";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";

const languageOptions = [
  { label: "English", value: "english" },
  { label: "Mandarin", value: "mandarin" }
];

const testTypeOptions = [
  { label: "Matching", value: "matching" },
  { label: "Repetition", value: "repetition" }
];

function TestSelectionTutorialPage() {
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

      {/* Title */}
      <div className="mt-6 text-center">
        <h1 className="text-5xl font-bold tracking-wide max-md:text-3xl">
          Test Selection
        </h1>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-lg leading-6 text-center max-md:mt-2 max-md:text-base">
        To begin the assessment, you will be prompted to select your preferred language and test type.
      </div>

      {/* Test Information */}
      <div className="mt-3 text-lg leading-7 text-center max-md:mt-2 max-md:text-sm">
        <span className="font-bold">Matching Test:</span> Match the provided
        photos to the corresponding audio descriptions.
        <br />
        <span className="font-bold">Repetition Test:</span> Accurately repeat a
        prompted message to evaluate speech and comprehension.
      </div>

      {/* Tutorial Section */}
      <div className="mt-10 flex flex-col items-center space-y-12">
        {/* Language Selection */}
        <div className="relative">
          <div className="absolute -top-5 -left-12 -right-12 -bottom-5 border-2 border-dashed rounded-full border-blue-500"></div>
          <SelectionBox title="Select the language of the test" />
          <div className="mt-6 space-y-4">
            {languageOptions.map((option) => (
              <LanguageOption key={option.value} label={option.label} />
            ))}
          </div>
        </div>

        {/* Test Type Selection */}
        <div className="relative">
          <div className="absolute -top-5 -left-12 -right-12 -bottom-5 border-2 border-dashed rounded-full border-blue-500"></div>
          <SelectionBox title="Select the type of test" />
          <div className="mt-6 space-y-4">
            {testTypeOptions.map((option) => (
              <TestTypeOption key={option.value} label={option.label} />
            ))}
          </div>
        </div>
      </div>

      {/* Next Button Positioned in Bottom-Right */}
      <div className="flex justify-end items-center mt-12 px-8 pb-8">
        <NextButton />
      </div>
    </div>
  );
}

export default TestSelectionTutorialPage;
