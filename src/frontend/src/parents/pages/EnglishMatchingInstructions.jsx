import * as React from "react";
import InstructionStep from "../components/InstructionStep";

import NextButton from "../components/NextButton";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";
import VolumeButton from "../../assets/volumebutton.svg";

function EnglishMatchingInstructions() {
  return (
    <div className="flex overflow-hidden flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <header className="flex flex-wrap gap-10 justify-between items-start w-full text-slate-900 max-md:max-w-full">
        <button className="flex gap-1.5 items-center py-5 text-2xl leading-none whitespace-nowrap w-[67px]">
          <img
            loading="lazy"
            src={BackArrow}
            className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.63] fill-slate-900"
            alt="Back arrow"
          />
          <span className="self-stretch my-auto w-[51px]">Back</span>
        </button>
        
        <h1 className="gap-2.5 self-stretch py-5 text-6xl tracking-tight text-center text-black leading-[64px] min-w-[240px] w-[355px] max-md:max-w-full max-md:text-4xl">
          English Matching Test
        </h1>
        
        <div className="flex gap-2.5 items-center py-2.5 text-base font-bold leading-none text-center whitespace-nowrap w-[113px]">
          <div className="flex gap-4 items-start self-stretch px-2 pt-2.5 pb-4 my-auto w-[113px]">
            <div className="flex flex-col">
              <img
                loading="lazy"
                src={Globe}
                className="object-contain aspect-square fill-slate-900 w-[25px]"
                alt="Language selector"
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
      </header>

      <div className="flex flex-col items-center mt-12 w-full text-3xl tracking-normal leading-10 text-center text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
        <div className="px-56 py-8 max-w-full bg-sky-400 rounded-xl min-h-[101px] w-[940px] max-md:px-5">
          Instructions
        </div>
      </div>

      <div className="flex overflow-hidden flex-col justify-center gap-6 items-center mt-12 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col justify-center items-center gap-6 max-w-[940px] w-full px-4 mx-auto text-center">
            <InstructionStep number="1">
                <div className="flex flex-wrap gap-2.5 justify-center items-center">
                <div>Press the</div>
                <img
                    loading="lazy"
                    src={VolumeButton}
                    alt="Play button"
                />
                <div>button to play the question audio.</div>
                </div>
            </InstructionStep>

            <InstructionStep number="2">
                <div>Select the image you think the audio is describing</div>
            </InstructionStep>

            <InstructionStep number="3">
                <div className="flex gap-2.5 items-center flex-nowrap w-full">
                <div className="flex items-center gap-2.5">
                    <div className="text-2xl">Press the</div>
                    <NextButton />
                    <div className="text-2xl">button to proceed, or the</div>
                </div>
                <button className="px-4 py-2.5 bg-slate-900 text-white rounded-lg text-xl w-[91px]">
                    Finish
                </button>
                <div className="text-xl">button to complete the test</div>
                </div>
            </InstructionStep>
            </div>
      </div>

      <div className="flex flex-col mt-12 w-full text-xl leading-none max-md:mt-10 max-md:max-w-full">
        <div className="flex-1 shrink gap-2.5 self-stretch w-full text-center text-black max-md:max-w-full">
          Press "Start" when ready
        </div>
        <div className="flex gap-2.5 justify-center items-center px-60 mt-6 w-full text-blue-600 whitespace-nowrap min-h-[60px] max-md:px-5 max-md:max-w-full">
          <button className="self-stretch px-4 py-2.5 my-auto bg-white rounded-lg border-blue-600 border-solid border-[1.5px] min-h-[40px] w-[91px]">
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnglishMatchingInstructions;