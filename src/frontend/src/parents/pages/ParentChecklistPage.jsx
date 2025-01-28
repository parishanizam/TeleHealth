import React from "react";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";
import NextButton from "../components/NextButton";

function ParentChecklistPage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 bg-white shadow-md">
        <button className="flex items-center gap-2 text-xl text-slate-900">
          <img
            src={BackArrow}
            alt="Back"
            className="w-4 h-4 object-contain"
          />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-semibold text-center">Assessment Instructions</h1>
        <div className="flex gap-6 items-center">
          <button className="flex items-center gap-1 text-slate-900">
            <img
              src={Globe}
              alt="Language"
              className="w-5 h-5 object-contain"
            />
            <span>EN</span>
          </button>
          <button className="flex items-center gap-1 text-slate-900">
            <img
              src={Logout}
              alt="Logout"
              className="w-5 h-5 object-contain"
            />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center px-6 py-10">

        {/* Instructions Card */}
        <div className="max-w-5xl w-full bg-white rounded-md shadow-md p-10 flex flex-col justify-center space-y-6 text-center">
          <div>
            <h2 className="text-4xl font-semibold mb-4">⚙️ Settings</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Ensure the room is quiet and free of distractions.</li>
              <li>Position the child in front of the camera and microphone.</li>
              <li>Use a stable internet connection for smooth video recording.</li>
              <li>Adjust the lighting to clearly capture the child’s face.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-semibold mb-4">📜 Rules</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>If the child gives a wrong answer, you cannot correct them.</li>
              <li>Do not provide hints or clues during the assessment.</li>
              <li>Encourage the child to speak loudly and clearly.</li>
              <li>Avoid interrupting the child while they are answering.</li>
              <li>If your child is unsure about the answer, do not repeat the question for them.</li>
              <li>Ensure that your child is selecting the answer independently.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center px-60 w-full min-h-[50px]">
        <NextButton />
      </div>
    </div>
  );
}

export default ParentChecklistPage;
