import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ArrowRight } from "lucide-react";

function ParentHomePage() {
  const parentInfo = useSelector((state) => state.parent.parentInfo);

  return (
    <div className="flex min-h-screen flex-col items-center w-full bg-white text-zinc-950 px-6 md:px-12 lg:px-24">
      <Header title="" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl w-full space-y-10 md:space-y-0 mt-20">
        <div className="flex flex-col gap-6 w-full md:w-3/5 text-left">
          {parentInfo && (
            <h2 className="text-xl md:text-2xl font-medium">
              Welcome, {parentInfo.firstName} {parentInfo.lastName}!
            </h2>
          )}
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            TeleHealth <span className="text-blue-500">Insights</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl leading-relaxed">
            Welcome to our TeleHealth platform, designed to help parents
            actively support their child&apos;s speech therapy journey. Our
            easy-to-use tools provide engaging assessments, allowing you to work
            alongside speech-language professionals from the comfort of your own
            home.
          </p>

          <div className="flex flex-wrap gap-6 justify-start mt-6">
            <Link
              to="/parents/testselection"
              className="px-6 py-3 bg-blue-700 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-900 transition"
            >
              Start Assessment
            </Link>
            <Link
              to="/parents/ParentOverview"
              className="px-6 py-3 bg-white text-blue-700 text-lg font-medium rounded-lg border-2 border-blue-700 shadow-md hover:shadow-lg hover:border-blue-900 transition-colors duration-200"
            >
              View Results
            </Link>
          </div>
        </div>

        <div className="w-full md:w-2/5 flex justify-center">
          <Card className="p-6 shadow-lg bg-gray-100 rounded-xl border border-gray-300 w-full max-w-lg">
            <Card.Body>
              <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-4">
                Not sure how to use the platform?
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-6">
                We&apos;ve got you covered! To guide you through all the
                features and help you make the most of your experience.
              </p>
              <Link
                to="/parents/OverallTutorialPage"
                className="flex items-center justify-between px-6 py-2 bg-blue-100 text-blue-700 text-lg font-medium rounded-lg hover:bg-blue-200 transition w-full"
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
