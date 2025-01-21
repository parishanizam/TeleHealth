import * as React from "react";

import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";
import SmileyFace from "../../assets/smileyface.svg";
import NextArrow from "../../assets/nextarrow.svg";

const navigationButtons = [
  { text: "Next Test", href: "/next-test" },
  { text: "Homepage", href: "/" }
];

const testOptions = [
  { 
    label: "English Matching",
    iconSrc: "",
    isChecked: false
  },
  {
    label: "Mandarin Matching",
    iconSrc: "",
    isChecked: false
  }
];

function TestComplete() {
  return (
    <div className="flex overflow-hidden flex-col px-5 pt-2.5 bg-white pb-[510px] max-md:pb-24">
      <div className="flex flex-wrap gap-10 justify-between items-start w-full text-slate-900 max-md:max-w-full">
        <button 
          className="flex gap-1.5 items-center py-5 text-2xl leading-none whitespace-nowrap w-[67px]"
          aria-label="Go back"
        >
          <img
            loading="lazy"
            src={BackArrow}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.63] fill-slate-900"
          />
          <div className="self-stretch my-auto w-[51px]">Back</div>
        </button>
        <div className="gap-2.5 self-stretch py-5 text-6xl tracking-tight text-center text-black leading-[64px] min-w-[240px] w-[355px] max-md:text-4xl">
          Test Complete
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
      <div className="flex gap-2.5 justify-center items-center mt-6 w-full max-md:max-w-full">
        <img
          loading="lazy"
          src={SmileyFace}
          alt="Test completion indicator"
          className="object-contain self-stretch my-auto aspect-square w-[100px]"
        />
      </div>
      <div className="flex flex-col items-center mt-6 w-full text-xl text-black max-md:max-w-full">
        <div className="flex flex-col">
          {testOptions.map((option, index) => (
            <div key={index} className="flex gap-2.5 items-center mt-5 first:mt-0">
              {option.iconSrc ? (
                <img
                  loading="lazy"
                  src={option.iconSrc}
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                />
              ) : (
                <div className="flex shrink-0 self-stretch my-auto w-5 h-5 bg-white border border-black border-solid" />
              )}
              <div className="self-stretch my-auto">{option.label}</div>
            </div>
          ))}
        </div>
      </div>
      {navigationButtons.map((button, index) => (
        <div key={index} className="flex gap-2.5 justify-center items-center px-60 mt-6 w-full min-h-[60px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch my-auto w-[200px]">
            <a
              href={button.href}
              className="flex overflow-hidden justify-center items-center px-4 py-2.5 w-full bg-white rounded-lg border-blue-600 border-solid border-[1.5px] min-h-[40px]"
            >
              <div className="self-stretch my-auto text-xl leading-none text-blue-600">
                {button.text}
              </div>
              <div className="flex gap-2.5 items-center self-stretch p-1.5 my-auto w-[23px]">
                <img
                  loading="lazy"
                  src={NextArrow}
                  alt=""
                  className="object-contain self-stretch my-auto aspect-square fill-blue-600 w-[13px]"
                />
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestComplete;