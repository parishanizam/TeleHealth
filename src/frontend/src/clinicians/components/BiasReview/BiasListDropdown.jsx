/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 18, 2025
 * Purpose: List of bias elements to be displayed when bias is detected on BiasReview page
 */

import { useState } from "react";

function BiasListDropdown({ biasTimestamps }) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert timestamps from ms to seconds
  const formattedBias = biasTimestamps.map((bias) => ({
    ...bias,
    timestamp: (bias.timestamp / 1000).toFixed(2),
  }));

  return (
    <div className="w-full max-w-2xl mt-4">
      <button
        className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Bias List ⬆" : "Show Bias List ⬇"}
      </button>
      {isOpen && (
        <div className="mt-2 border border-gray-300 rounded-lg p-3 bg-white shadow-md">
          <p className="text-red-600 font-bold mb-2">Bias Detected:</p>
          <div className="overflow-auto max-h-40">
            <ul className="list-disc list-inside">
              {formattedBias.map((bias, index) => (
                <li key={index} className="py-1">
                  <strong>⏳ {bias.timestamp}s</strong> - {bias.keyword}
                  <span className="text-gray-500">
                    {" "}
                    (Faces Detected: {bias.faceCount})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default BiasListDropdown;
