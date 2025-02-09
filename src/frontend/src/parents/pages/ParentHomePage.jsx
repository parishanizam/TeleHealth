import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";

function ParentHomePage() {
  const parentInfo = useSelector((state) => state.parent.parentInfo);
  return (
    <div className="flex min-h-screen flex-col items-center px-5 pt-2.5 bg-white text-zinc-950">
      {/* Header */}
      <Header title="" />
      {/* Main Content */}
      <div className="flex flex-col gap-5 items-center max-w-[800px] mt-8 px-4">
        {/* You can display parent's first or last name if available */}
        {parentInfo && (
          <h2 className="text-2xl font-medium">
            Welcome, {parentInfo.firstName} {parentInfo.lastName}!
          </h2>
        )}
        <h1 className="text-7xl font-bold tracking-wider text-center max-md:max-w-full max-md:text-4xl">
          TeleHealth Insights
        </h1>
        <p className="mt-8 text-2xl leading-8 text-center max-md:max-w-full">
          Welcome to our TeleHealth platform, designed to help parents actively
          support their child&apos;s speech therapy journey. Our easy-to-use
          tools provide engaging assessments allowing you to work alongside
          speech-language professionals from the comfort of your own home.
        </p>
        <div className="flex flex-wrap gap-7 justify-center items-center mt-8 w-full">
          {/* Start Assessment Button */}
          <Link
            to="/parents/testselection"
            aria-label="Start"
            className="inline-flex overflow-hidden gap-2.5 px-10 mt-8 py-6 bg-slate-900 rounded-[40px] text-2xl font-medium leading-none text-white 
             border-2 border-slate-900 hover:bg-white hover:text-slate-900 hover:border-slate-900 transition-colors duration-200"
          >
            Start
          </Link>
        </div>
        <p className="mt-8 text-2xl leading-8 text-center max-md:max-w-full">
          Not sure how to use the platform? We&apos;ve got you covered! To guide
          you through all the features and help you make the most of your
          experience.
        </p>

        {/* Next Button */}
        <div className="flex justify-center items-center mt-12 px-8 pb-8">
          <NextButton to="/parents/TestSelectionTutorialPage" name="Tutorial" />
        </div>
      </div>
    </div>
  );
}

export default ParentHomePage;
