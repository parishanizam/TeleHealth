import React from "react";
import { Header } from "../components/Header";
import CheckMark from "../../assets/BlueCheckMark.png";
import { Link } from "react-router-dom";
import NextButton from "../components/NextButton";

function TutorialComplete() {
  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-2.5 max-md:px-4 overflow-hidden text-zinc-950">
      {/* Header */}
      <Header title="TeleHealth Insights" />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-start mt-36 flex-grow max-w-[766px] mx-auto px-4 text-center">
        {/* Completion Message */}
        <h1 className="mt-8 text-5xl font-semibold leading-tight max-md:text-3xl">
          You're All Set!
        </h1>

        {/* Checkmark Icon */}
        <div className="flex flex-col items-center mt-12 gap-10">
          <img
            loading="lazy"
            src={CheckMark}
            alt="Checkmark"
            className="w-24 h-24 mb-6"
          />
          {/* Start Assessment Button */}
          <Link
            to="/parents/testselection" 
            aria-label="Start Assessment"
          >
            <a className="overflow-hidden gap-2.5 px-14 mt-8 py-6 bg-slate-900 min-w-[240px] rounded-[40px] text-2xl font-medium leading-none text-white">
              Start Assessment
            </a>
          </Link>
        </div>
        {/* Next Button */}
      <div className="flex justify-center items-center mt-12 px-8 pb-8">
        <NextButton to="/parents/ParentHomePage" name="Homepage" />
      </div>
      </main>
    </div>
  );
}

export default TutorialComplete;
