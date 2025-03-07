import React from "react";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";

function ParentChecklistPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-white">
      <Header title="Parent Checklist" />

      {/* Settings Section */}
      <div className="max-w-5xl w-full bg-white rounded-md shadow-md p-10 flex flex-col justify-center space-y-6 text-center">
        <h2 className="text-4xl font-semibold mb-4">⚙️ Set Up</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>Ensure the room is quiet and free of distractions.</li>
          <li>Position the child in front of the camera and microphone where they can clearly see the screen.</li>
          <li>Use a stable internet connection for smooth video recording.</li>
          <li>Adjust the lighting to clearly capture the child’s face.</li>
        </ul>
      </div>

      {/* Rules Section */}
      <div className="max-w-5xl w-full bg-white rounded-md shadow-md p-10 flex flex-col justify-center space-y-6 text-center">
        <h2 className="text-4xl font-semibold mb-4">📜 Rules</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>If the child gives a wrong answer, you cannot correct them.</li>
          <li>Do not provide hints or clues during the assessment.</li>
          <li>Encourage the child to speak loudly and clearly.</li>
          <li>Avoid interrupting the child while they are answering.</li>
          <li>If your child is unsure about the answer, do not repeat the question for them. You may encourage to guess.</li>
          <li>Ensure that your child is selecting the answer independently.</li>
          <li>Do not refresh the page when test is started. It will stop the test and you will have to restart.</li>
        </ol>
      </div>

      {/* Next Button */}
      <div className="flex gap-2.5 justify-center items-center mt-10 pb-4">
        <NextButton to="/parents/MediaTesting" />
      </div>
    </div>
  );
}

export default ParentChecklistPage;
