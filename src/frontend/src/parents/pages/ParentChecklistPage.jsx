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
    <div className="flex overflow-hidden flex-col px-5 pt-2.5 pb-64 bg-white max-md:pb-24">
      <Header title="Parent Checklist" />

    
      {/* Title Section */}
      <div className="flex flex-col items-center mt-12 w-full text-3xl tracking-normal leading-10 text-center text-black max-md:mt-10 max-md:max-w-full">
        <div className="py-8 pr-52 pl-52 max-w-full bg-sky-400 rounded-xl min-h-[101px] w-[940px] max-md:px-5 max-md:max-w-full">
          Parents, please answer the following:
        </div>
      </div>

      {/* Checklist Items */}
      <div className="flex flex-col items-center mt-12 w-full text-xl text-black max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col items-start max-md:max-w-full">
          {checklistItems.map((item, index) => (
            <div className="flex flex-wrap gap-2 items-center mt-5 max-md:max-w-full" key={index}>
              <input
                type="checkbox"
                id={`checklist-item-${index}`}
                className="w-5 h-5 border border-black cursor-pointer"
              />
              <label htmlFor={`checklist-item-${index}`} className="self-stretch my-auto max-md:max-w-full">
                {item.text}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button Section */}
      <div className="flex gap-2.5 justify-center items-center px-60 mt-44 w-full min-h-[60px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <NextButton to="/parents/login" />
      </div>
    </div>
  );
}

export default ParentChecklistPage;
