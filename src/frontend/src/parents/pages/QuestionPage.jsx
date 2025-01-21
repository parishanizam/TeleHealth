import * as React from "react";
import MatchingCard from "../components/ImagePlaceholder";

import NextButton from "../components/NextButton";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";
import VolumeButton from "../../assets/volumebutton.svg"

export default function MatchingTest() {
  return (
    <div className="flex overflow-hidden flex-col px-5 pt-2.5 pb-24 bg-white max-md:pb-24">
      <div className="flex flex-wrap gap-10 justify-between items-start w-full text-slate-900 max-md:max-w-full">
        <button className="flex gap-1.5 items-center py-5 text-2xl leading-none whitespace-nowrap w-[67px]">
          <img
            loading="lazy"
            src={BackArrow}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.63] fill-slate-900"
          />
          <div className="self-stretch my-auto w-[51px]">Back</div>
        </button>
        <div className="gap-2.5 self-stretch py-5 text-6xl tracking-tight text-center text-black leading-[64px] min-w-[240px] w-[355px] max-md:max-w-full max-md:text-4xl">
          English Matching Test - Question 1
        </div>
        <button className="flex gap-2.5 items-center py-2.5 text-base font-bold leading-none text-center whitespace-nowrap w-[113px]">
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
        </button>
      </div>
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="flex gap-2.5 justify-center items-center w-full max-md:max-w-full">
          <div className="flex gap-2.5 justify-center items-center self-stretch p-2.5 my-auto w-[120px]">
            <img
              loading="lazy"
              src={VolumeButton}
              alt=""
              className="object-contain self-stretch my-auto aspect-square w-[100px]"
            />
          </div>
        </div>
        <div className="flex flex-col mt-5 w-full max-md:max-w-full">
          <div className="flex flex-col justify-center items-center w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
              <MatchingCard />
              <MatchingCard />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-12 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
              <MatchingCard />
              <MatchingCard />
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 justify-center items-center px-60 mt-5 w-full min-h-[60px] max-md:px-5 max-md:max-w-full">
          <NextButton/>
        </div>
      </div>
    </div>
  );
}