import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ArrowRight } from "lucide-react";

function ParentHomePage() {
  const parentInfo = useSelector((state) => state.parent.parentInfo);
  return (
    <div className="flex min-h-screen flex-col items-start px-32 pt-2.5 bg-white text-zinc-950">
      {/* Header */}
      <Header title="" />
      {/* Main Content */}
      <div className="flex flex-row gap-20 items-start max-w-[1600px] mt-8 px-16 w-full">
        {/* Left Column (Pushed Further Away from Edge) */}
        <div className="flex flex-col gap-5 w-3/5">
          {parentInfo && (
            <h2 className="text-2xl font-medium">
              Welcome, {parentInfo.firstName} {parentInfo.lastName}!
            </h2>
          )}
          <h1 className="text-7xl font-bold tracking-wider max-md:max-w-full max-md:text-4xl">
            TeleHealth <span className="text-indigo-800">Insights</span>
          </h1>
          <p className="mt-6 text-2xl leading-8 max-md:max-w-full">
            Welcome to our TeleHealth platform, designed to help parents actively
            support their child&apos;s speech therapy journey. Our easy-to-use
            tools provide engaging assessments allowing you to work alongside
            speech-language professionals from the comfort of your own home.
          </p>
          <div className="flex flex-wrap gap-6 justify-start mt-6">
            {/* Start Assessment Buttons */}
            <Link
              to="/parents/testselection"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white text-xl font-medium rounded-lg shadow-md hover:bg-slate-800 transition"
            >
              Start Assessment
            </Link>
            <Link
              to="/parents/testselection"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-700 text-white text-xl font-medium rounded-lg shadow-md hover:bg-indigo-800 transition"
            >
              View Results
            </Link>
          </div>
        </div>
        {/* Right Column (Lowered, Much Wider Card) */}
        <div className="w-2/5 flex justify-center items-center mt-32">
          <Card className="p-10 shadow-lg bg-gray-100 rounded-xl border border-gray-300 w-full max-w-[95%]">
            <Card.Body>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Not sure how to use the platform?
              </h2>
              <p className="text-gray-700 text-lg mb-8">
                We&apos;ve got you covered! To guide you through all the features and help you make the most of your experience.
              </p>
              <Link
                to="/parents/OverallTutorialPage"
                className="flex items-center justify-between px-8 py-2 bg-blue-100 text-blue-700 text-lg font-medium rounded-lg hover:bg-blue-200 transition w-full"
              >
                Tutorials <ArrowRight size={24} />
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ParentHomePage;
