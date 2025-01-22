import React from "react";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";

function ParentHomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white text-zinc-950">
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

      {/* Main Content */}
      <div className="flex flex-col items-center max-w-[766px] mt-8 px-4">
        <h1 className="text-7xl font-bold tracking-wider text-center max-md:max-w-full max-md:text-4xl">
          TeleHealth Insights
        </h1>
        <p className="mt-8 text-2xl leading-8 text-center max-md:max-w-full">
          Welcome to our TeleHealth platform, designed to help parents actively
          support their children's speech therapy journey. Our easy-to-use tools
          provide engaging assignments allowing you to work alongside
          speech-language professionals from the comfort of your home.
        </p>
        <div className="flex flex-wrap gap-7 justify-center items-center mt-8 w-full">
          <button
            className="overflow-hidden gap-2.5 px-14 py-6 bg-slate-900 min-w-[240px] rounded-[40px] text-2xl font-medium leading-none text-white"
            tabIndex={0}
            aria-label="Clinicians login button"
          >
            Start Assessment
          </button>
        </div>
        <p className="mt-8 text-2xl leading-8 text-center max-md:max-w-full">
          Not sure how to use the platform? We've got you covered! to guide you
          through all the features and help you make the most of your
          experience.
        </p>
        <button className="flex overflow-hidden justify-center items-center px-4 py-2.5 mt-8 bg-white rounded-lg border-blue-600 shadow-sm border-[1.5px] min-h-[41px] w-[223px]">
          <span className="text-xl leading-none text-blue-600">Tutorial</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f54e913165dc8c5f0b7a7862509258dc172adc844fe6fb88f6b472374506d140?placeholderIfAbsent=true&apiKey=c6a9eb88b37d40d2ae3de36a46eb8082"
            alt="Tutorial icon"
            className="object-contain w-5 aspect-square ml-2"
          />
        </button>
      </div>
    </div>
  );
}

export default ParentHomePage;
