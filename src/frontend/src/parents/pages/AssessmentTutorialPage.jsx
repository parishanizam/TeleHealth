import * as React from "react";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";

function AssessmentTutorialPage() {
  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title="TeleHealth Insights" />

      {/* Content Section */}
      <div className="mt-5 px-8 max-w-5xl mx-auto space-y-12">
        {/* Parent Instructions Section */}
        <div className="text-center space-y-4">
          <p className="text-center text-3xl text-gray-700 mb-6">
            Please watch the following videos to give yourself and your child a
            clear understanding of the assessment process.
          </p>
          <h2 className="text-3xl font-semibold mb-4">Parent Instructions</h2>
          <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center border-4 border-blue-300">
            <iframe
              className="w-full rounded"
              height="450"
              src="https://www.youtube.com/embed/iklkk62J6-Q"
              title="Parent Instructions Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Child Instructions Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold mb-4">Child Instructions</h2>
          <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center border-4 border-blue-300">
            <iframe
              className="w-full rounded"
              height="450"
              src="https://www.youtube.com/embed/iklkk62J6-Q"
              title="Child Instructions Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-12 px-8 pb-8 space-x-4">
        <NextButton to="/parents/OverallTutorialPage" name="Next" />
      </div>
    </div>
  );
}

export default AssessmentTutorialPage;
