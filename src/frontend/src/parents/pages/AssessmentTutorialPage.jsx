import * as React from "react";
import { Header } from "../components/Header";
import PlaceholderImage from "../../assets/Tutorial.png";
import NextButton from "../components/NextButton";

function AssessmentTutorialPage() {
  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      {/* Header */}
      <Header title="TeleHealth Insights" />

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

      <div className="flex justify-center items-center mt-12 px-8 pb-8 space-x-4">
        <NextButton to="/parents/TutorialComplete" name = "Next" />
      </div>
    </div>
  );
}

export default AssessmentTutorialPage;
