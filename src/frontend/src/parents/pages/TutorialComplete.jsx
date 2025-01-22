import React from "react";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";
import CheckMark from "../../assets/BlueCheckMark.png";

function TutorialComplete() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-950">
      {/* Header */}
      <div className="flex justify-between items-center w-full px-8 py-4 bg-gray-100">
        <button className="flex gap-1.5 items-center text-2xl leading-none whitespace-nowrap">
          <img
            loading="lazy"
            src={BackArrow}
            alt="Back"
            className="object-contain w-4 aspect-square fill-slate-900"
          />
          <span>Back</span>
        </button>
        <div className="flex gap-6 items-center">
          {/* EN Button */}
          <button className="flex flex-col items-center text-base font-bold leading-none text-center">
            <img
              loading="lazy"
              src={Globe}
              alt="Language"
              className="object-contain w-6 aspect-square fill-slate-900"
            />
            <span>EN</span>
          </button>
          {/* Logout Button */}
          <button className="flex flex-col items-center text-base font-bold leading-none text-center">
            <img
              loading="lazy"
              src={Logout}
              alt="Logout"
              className="object-contain w-6 aspect-square fill-slate-900"
            />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="mt-8 text-center">
        <h1 className="text-7xl font-bold tracking-wider max-md:text-4xl">
          TeleHealth Insights
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow max-w-[766px] mx-auto px-4 text-center mt-[-50px]">
        <p className="mt-8 text-4xl font-semibold leading-9 max-md:text-xl">
          You're All Set!
        </p>

        {/* Checkmark Icon and Button */}
        <div className="flex flex-col items-center mt-12">
          <img
            loading="lazy"
            src={CheckMark}
            alt="Checkmark"
            className="object-contain w-16 h-16 mb-6"
          />
          <button
            className="overflow-hidden gap-2.5 px-14 py-6 bg-slate-900 min-w-[240px] rounded-[40px] text-2xl font-medium leading-none text-white"
            tabIndex={0}
            aria-label="Start Assessment"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorialComplete;
