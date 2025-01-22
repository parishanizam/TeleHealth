import * as React from "react";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";
import PlaceholderImage from "../../assets/Tutorial.png";
import TutorialButton from "../components/TutorialButton";

function AssessmentTutorialPage() {
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
      <div className="text-center mt-8">
        <h1 className="text-5xl font-bold">Tutorial of Assessment</h1>
      </div>

      {/* Content Section */}
      <div className="mt-5 px-8 max-w-3xl mx-auto space-y-12">
        {/* English Matching Section */}
        <div className = "text-center">
        <p  className="text-center text-lg text-gray-700 mb-6">
        Please watch the following videos to give yourself and your child a clear understanding of what the assessment questions will be like.
        </p>
          <h2 className="text-3xl font-semibold mb-4">English Matching</h2>
          <div className="bg-gray-200 rounded-lg h-[200px] flex items-center justify-center">
            <img
              src={PlaceholderImage}
              alt="Matching Placeholder"
              className="max-h-full max-w-full"
            />
          </div>
        </div>

        {/* English Repetition Section */}
        <div className = "text-center">
          <h2 className="text-3xl font-semibold mb-4">English Repetition</h2>
          <div className="bg-gray-200 rounded-lg h-[200px] flex items-center justify-center">
            <img
              src={PlaceholderImage}
              alt="Repetition Placeholder"
              className="max-h-full max-w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-12 px-8 pb-8 space-x-4">
        <TutorialButton/>
      </div>
    </div>
  );
}

export default AssessmentTutorialPage;
