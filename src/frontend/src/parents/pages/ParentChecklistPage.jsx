import * as React from "react";
import { ChecklistItem } from "../components/ChecklistItem";
import NextButton from "../components/NextButton";
import NextArrow from "../../assets/nextarrow.svg";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";

const checklistItems = [
  {
    text: "Does your computer have a stable connection to the internet?"
  },
  {
    text: "Is the room quiet and without distractions?"
  },
  {
    text: "Is your audio set to a good volume?"
  },
  {
    text: "If your child is unsure about the answer, can you repeat the question for them?"
  },
  {
    text: "If your child hesitates, can you encourage them to guess?"
  },
  {
    text: "If your child is wrong, can you correct them?"
  },
  {
    text: "Is your child doing the selection/clicking independently?"
  }
];

function ParentChecklist() {
  return (
    <div className="flex overflow-hidden flex-col px-5 pt-2.5 pb-64 bg-white max-md:pb-24">
      <div className="flex flex-wrap gap-10 justify-between items-start w-full text-slate-900 max-md:max-w-full">
        <button className="flex gap-1.5 items-center py-5 text-2xl leading-none whitespace-nowrap w-[67px]">
          <img
            loading="lazy"
            src={BackArrow}
            className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.63] fill-slate-900"
            alt=""
          />
          <div className="self-stretch my-auto w-[51px]">Back</div>
        </button>
        <div className="gap-2.5 self-stretch py-5 text-6xl tracking-tight text-center text-black leading-[64px] min-w-[240px] w-[355px] max-md:text-4xl">
          Parent Checklist
        </div>
        <div className="flex gap-2.5 items-center py-2.5 text-base font-bold leading-none text-center whitespace-nowrap w-[113px]">
          <div className="flex gap-4 items-start self-stretch px-2 pt-2.5 pb-4 my-auto w-[113px]">
            <div className="flex flex-col">
              <img
                loading="lazy"
                src={Globe}
                className="object-contain aspect-square fill-slate-900 w-[25px]"
                alt=""
              />
              <div>EN</div>
            </div>
            <div className="flex flex-col">
              <img
                loading="lazy"
                src={Logout}
                alt=""
                className="object-contain aspect-square fill-slate-900 w-[25px]"
              />
              <div>Logout</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-12 w-full text-3xl tracking-normal leading-10 text-center text-black max-md:mt-10 max-md:max-w-full">
        <div className="py-8 pr-52 pl-52 max-w-full bg-sky-400 rounded-xl min-h-[101px] w-[940px] max-md:px-5 max-md:max-w-full">
          Parents, please answer the following:
        </div>
      </div>
      <div className="flex flex-col items-center mt-12 w-full text-xl text-black max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col items-start max-md:max-w-full">
          {checklistItems.map((item, index) => (
            <ChecklistItem key={index} text={item.text} />
          ))}
        </div>
      </div>
      <div className="flex gap-2.5 justify-center items-center px-60 mt-20 w-full min-h-[60px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <NextButton />
      </div>
    </div>
  );
}

export default ParentChecklist;