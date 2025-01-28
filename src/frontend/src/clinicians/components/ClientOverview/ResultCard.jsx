// import * as React from "react";
import ChevronIcon from "../../../assets/chevron.svg";

const circleStyles = {
  backgroundColor: "#99D0FE",
};

// eslint-disable-next-line react/prop-types
export function ResultCard({ score, date }) {
  return (
    <div className="flex flex-wrap justify-between content-center items-center px-3 mt-2.5 w-full text-center bg-sky-400 rounded-xl gap-[569px_100px] gap-y-[569px] max-w-[742px] min-h-[101px] max-md:max-w-full">
      <div style={circleStyles}
      className="flex items-center justify-center rounded-full min-h-[101px] min-w-[101px]">
        <span className="text-lg font-bold text-neutral-900">{score}</span>
      </div>
      <div className="self-stretch my-auto">{date}</div>
      <img
        loading="lazy"
        src={ChevronIcon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
      />
    </div>
  );
}
