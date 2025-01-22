import React from "react";

export default function MatchingCard({ image, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`p-3 border rounded-md 
        cursor-pointer hover:shadow-md transition-shadow
        ${isSelected ? "border-blue-500" : "border-gray-300"}
      `}
    >
      <img
        src={image}
        alt="option"
        className="w-32 h-32 object-contain"
      />
    </div>
  );
}
