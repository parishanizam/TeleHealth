import React from "react";
import MacbookImage from "../assets/Macbook.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#E5ECF4] to-[#B2DFEA] min-h-screen flex items-center justify-center px-4 py-10">
      {/* Main container / hero card */}
      <div
        className="
          max-w-6xl
          w-full
          bg-white
          rounded-xl
          shadow-lg
          p-24
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-8
        "
      >
        {/* Left: Text & Buttons */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          <h1 className="text-5xl font-bold text-[#001B3A] mb-4">
            TeleHealth Insights
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-md">
            Empower bilingual families to conduct at-home speech and language
            assessments with confidence through our intuitive telehealth
            solution.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              to="/clinicians/login"
              className="
                px-6 py-3
                bg-[#001B3A]
                text-white
                text-base
                md:text-lg
                font-medium
                rounded-full
                hover:bg-[#0F172A]
                transition
              "
            >
              Clinicians Login
            </Link>
            <Link
              to="/parents/login"
              className="
                px-6 py-3
                bg-[#001B3A]
                text-white
                text-base
                md:text-lg
                font-medium
                rounded-full
                hover:bg-[#0F172A]
                transition
              "
            >
              Parents Login
            </Link>
          </div>
        </div>

        {/* Right: Centered laptop image */}
        <div className="flex-1 flex justify-center">
          <img
            src={MacbookImage}
            alt="TeleHealth platform interface"
            className="max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
