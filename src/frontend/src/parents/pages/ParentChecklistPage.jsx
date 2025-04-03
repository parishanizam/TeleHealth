/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 27, 2025
 * Purpose: Displays ParentChecklistPage and its content
 */

import React from "react";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";

function ParentChecklistPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen px-4 bg-white">
      <Header title="Parent Checklist" />

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl min-h-[85vh] overflow-y-auto pt-4 space-y-4">
        {/* Setup Section */}
        <div className="w-full bg-white rounded-md shadow-md p-4 sm:p-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">⚙️ Set Up</h2>

          <div className="flex justify-center">
            <ul className="list-disc pl-8 space-y-1 text-gray-800 text-sm sm:text-base text-left max-w-lg">
              <li>Ensure the room is quiet and free of distractions.</li>
              <li>Position the child in front of the camera and microphone.</li>
              <li>Use a stable internet connection for smooth recording.</li>
              <li>Adjust the lighting to clearly capture the child’s face.</li>
            </ul>
          </div>
        </div>

        {/* Rules Section */}
        <div className="w-full bg-white rounded-md shadow-md p-4 sm:p-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">📜 Rules</h2>
          <div className="flex justify-center">
            <ol className="list-decimal pl-8 space-y-1 text-gray-800 text-sm sm:text-base text-left max-w-lg">
              <li>If the child gives a wrong answer, you cannot correct them.</li>
              <li>Do not provide hints or clues during the assessment.</li>
              <li>Encourage the child to speak loudly and clearly.</li>
              <li>Avoid interrupting the child while they are answering.</li>
              <li>Do not repeat the question if the child is unsure.</li>
              <li>Ensure the child selects the answer independently.</li>
              <li>Do not refresh the page once the test starts.</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-center">
          <NextButton to="/parents/MediaTesting" />
        </div>
      </div>
    </div>
  );
}

export default ParentChecklistPage;
