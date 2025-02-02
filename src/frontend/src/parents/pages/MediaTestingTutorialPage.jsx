import * as React from "react";
import NextButton from "../components/NextButton";
import { Header } from "../components/Header";
import ConsentFormImage from "../../assets/ConsentFormImage.png"; // Example placeholder for consent form image
import MediaTestingTutorial from "../../assets/MediaTestingTutorial.png"; // Corrected import name

function MediaTestingTutorialPage() {
  return (
    <div className="flex flex-col px-5 pt-2.5 bg-white max-md:px-4 overflow-hidden min-h-screen">
      {/* Header */}
      <Header title="Media Testing Tutorial" />

      {/* Consent Form Section */}
      <div className="mt-8 px-8 max-md:px-4">
        <h2 className="text-4xl font-semibold text-center mb-6">Consent Form</h2>
        <p className="text-lg text-center">
          During the assessment, you will be required to review and complete a consent form.
        </p>
        <p className="text-lg text-center mb-3">
          This ensures you understand how your data will be used. Please read the provided information carefully when prompted.
        </p>
        {/* Consent Form as an Image */}
        <div className="flex justify-center">
          <img
            loading="lazy"
            src={ConsentFormImage}
            alt="Consent Form"
            className="max-w-md border border-gray-300 rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-lg leading-6 text-center max-md:mt-4 max-md:text-base px-8 max-md:px-4">
        After completing the consent form during the assessment, you will be guided to configure your video, audio, and microphone devices.
        <p>This step ensures that all devices are working correctly before you proceed.</p>
      </div>

      {/* Media Setup Section */}
      <div className="mt-8 px-8 max-md:px-4">
        {/* Placeholder Image for Media Setup */}
        <div className="flex justify-center mt-4">
          <img
            loading="lazy"
            src={MediaTestingTutorial}
            alt="Media Setup Placeholder"
            className="max-w-3xl border border-gray-300 rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Next Button Positioned Below Media Setup */}
      <div className="mt-8 flex justify-center px-8 max-md:px-4">
        <NextButton to="/parents/AssessmentTutorialPage" name="Next" />
      </div>
    </div>
  );
}

export default MediaTestingTutorialPage;
