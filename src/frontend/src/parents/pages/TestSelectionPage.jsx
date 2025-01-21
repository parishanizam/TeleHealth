import * as React from "react";
import { LanguageOption } from "../components/TestSelectionLanguage";
import { TestTypeOption } from "../components/TestSelectionType";
import { SelectionBox } from "../components/SelectionBox";
import NextArrow from "../../assets/nextarrow.svg";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";


const languageOptions = [
  { label: "English", value: "english" },
  { label: "Mandarin", value: "mandarin" }
];

const testTypeOptions = [
  { label: "Matching", value: "matching" },
  { label: "Repetition", value: "repetition" }
];

function TestSelection() {
  return (
    <div className="flex overflow-hidden flex-col px-5 pt-2.5 pb-56 bg-white max-md:pb-24">
      <div className="flex flex-wrap gap-10 justify-between items-start w-full text-slate-900 max-md:max-w-full">
        <div className="flex gap-1.5 items-center py-5 text-2xl leading-none whitespace-nowrap w-[67px]">
          <img
            loading="lazy"
            src={BackArrow}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.63] fill-slate-900"
          />
          <button className="self-stretch my-auto w-[51px]" tabIndex="0">Back</button>
        </div>
        <div className="gap-2.5 self-stretch py-5 text-6xl tracking-tight text-center text-black leading-[64px] min-w-[240px] w-[355px] max-md:text-4xl">
          Test Selection
        </div>
        <div className="flex gap-2.5 items-center py-2.5 text-base font-bold leading-none text-center whitespace-nowrap w-[113px]">
          <div className="flex gap-4 items-start self-stretch px-2 pt-2.5 pb-4 my-auto w-[113px]">
            <div className="flex flex-col">
              <img
                loading="lazy"
                src={Globe}
                alt=""
                className="object-contain aspect-square fill-slate-900 w-[25px]"
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
      <div className="flex flex-col justify-center items-center mt-12 w-full text-3xl text-black max-md:mt-10 max-md:max-w-full">
        <SelectionBox title="Select the language of the test" />
        <div className="flex flex-col mt-12 max-w-full text-xl text-black whitespace-nowrap w-[115px] max-md:mt-10">
          {languageOptions.map((option) => (
            <LanguageOption key={option.value} label={option.label} />
          ))}
        </div>
        <SelectionBox title="Select the type of test" />
        <div className="flex flex-col mt-12 max-w-full text-xl text-black whitespace-nowrap w-[120px] max-md:mt-10">
          {testTypeOptions.map((option) => (
            <TestTypeOption key={option.value} label={option.label} />
          ))}
        </div>
      </div>
      <div className="flex gap-2.5 justify-center items-center px-60 mt-12 w-full min-h-[60px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col self-stretch my-auto w-[117px]">
          <button className="flex overflow-hidden justify-center items-center px-4 py-2.5 w-full bg-white rounded-lg border-blue-600 border-solid border-[1.5px] min-h-[40px]" tabIndex="0">
            <div className="self-stretch my-auto text-xl leading-none text-blue-600">
              Next
            </div>
            <div className="flex gap-2.5 items-center self-stretch p-1.5 my-auto w-[23px]">
              <img
                loading="lazy"
                src={NextArrow}
                alt=""
                className="object-contain self-stretch my-auto aspect-square fill-blue-600 w-[13px]"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestSelection;