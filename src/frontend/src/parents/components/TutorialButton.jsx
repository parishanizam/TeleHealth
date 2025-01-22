import * as React from "react";
import NextArrow from "../../assets/nextarrow.svg";

function TutorialButton() {
  return (
    <div className="flex justify-end items-center">
      <div
        className="flex justify-between items-center px-5 py-3 bg-white rounded-lg border-blue-600 border-solid border-[1.5px] min-h-[50px] w-auto cursor-pointer"
        tabIndex="0"
        role="button"
      >
        <span className="text-lg font-medium text-blue-600 leading-none">
          Complete Tutorial
        </span>
        <img
          loading="lazy"
          src={NextArrow}
          className="ml-3 object-contain aspect-square fill-blue-600 w-5 h-5"
          alt="Next Arrow"
        />
      </div>
    </div>
  );
}

export default TutorialButton;
