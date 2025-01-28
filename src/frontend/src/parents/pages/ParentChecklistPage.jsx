import React from "react";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";

const checklistItems = [
  { text: "Does your computer have a stable connection to the internet?" },
  { text: "Is the room quiet and without distractions?" },
  { text: "Is your audio set to a good volume?" },
  { text: "If your child is unsure about the answer, can you repeat the question for them?" },
  { text: "If your child hesitates, can you encourage them to guess?" },
  { text: "If your child is wrong, can you correct them?" },
  { text: "Is your child doing the selection/clicking independently?" },
];

function ParentChecklistPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-white">
      <Header title="Things to keep in mind" />

      {/* Checklist Section */}
      <div className="max-w-5xl w-full bg-white rounded-md shadow-md p-10 flex flex-col justify-center space-y-6 text-center">
        <h2 className="text-4xl font-semibold mb-4">✅ Parent Checklist</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          {checklistItems.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      </div>

      {/* Settings Section */}
      <div className="max-w-5xl w-full bg-white rounded-md shadow-md p-10 flex flex-col justify-center space-y-6 text-center">
        <h2 className="text-4xl font-semibold mb-4">⚙️ Settings</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>Ensure the room is quiet and free of distractions.</li>
          <li>Position the child in front of the camera and microphone.</li>
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
          <li>If your child is unsure about the answer, do not repeat the question for them.</li>
          <li>Ensure that your child is selecting the answer independently.</li>
        </ol>
      </div>

      {/* Next Button */}
      <div className="flex gap-2.5 justify-center items-center mt-10">
        <NextButton to="/parents/MediaTesting" />
      </div>
    </div>
  );
}

export default ParentChecklistPage;
