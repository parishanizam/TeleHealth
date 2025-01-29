import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-zinc-950">
      <div className="flex flex-col items-center max-w-[766px] text-center">
        <h1 className="text-7xl font-bold tracking-wider max-md:text-4xl">
          TeleHealth Insights
        </h1>
        <p className="mt-8 text-2xl leading-8 max-md:text-base">
          Empower bilingual families to conduct at-home speech and language
          assessments with confidence through our intuitive telehealth solution.
        </p>

        <div className="flex flex-wrap gap-7 justify-center items-center mt-8 w-full">
          <Link
            to="/clinicians/login"
            className="px-14 py-6 bg-slate-900 min-w-[240px] rounded-[40px] text-2xl font-medium leading-none text-white hover:opacity-80 active:opacity-100 text-center"
            aria-label="Clinicians login link"
          >
            Clinicians login
          </Link>

          <Link
            to="/parents/login"
            className="px-14 py-6 bg-slate-900 min-w-[240px] rounded-[40px] text-2xl font-medium leading-none text-white hover:opacity-80 active:opacity-100 text-center"
            aria-label="Parents login link"
          >
            Parents login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
