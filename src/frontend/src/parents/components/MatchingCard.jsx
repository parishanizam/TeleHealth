import React from "react";

export default function MatchingCard({ image, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`p-3 border rounded-md 
        cursor-pointer hover:shadow-md transition-shadow items-center justify-center 
        ${isSelected ? "border-blue-500" : "border-gray-300"}
      `}
    >
      <img
        src={image}
        alt="option"
        className="w-full h-auto max-w-[175px] aspect-square object-contain"
      />
    </div>
  );
}
