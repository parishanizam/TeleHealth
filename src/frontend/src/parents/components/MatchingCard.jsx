/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 24, 2025
 * Purpose: Contains individual Matching Card component to be used on Matching and Quantifier assessments
 */

import React from "react";

export default function MatchingCard({ image, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`p-3 border-4 rounded-md 
        cursor-pointer hover:shadow-md transition-shadow items-center justify-center 
        ${isSelected ? "border-blue-500" : "border-gray-300"}
      `}
    >
      <img
        src={image}
        alt="option"
        className="w-full h-auto max-w-[150px] aspect-square object-contain"
      />
    </div>
  );
}
