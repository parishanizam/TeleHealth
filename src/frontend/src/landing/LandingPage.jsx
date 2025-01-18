import React from "react";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-zinc-950">
      <div className="flex flex-col items-center max-w-[766px]">
        <h1 className="text-7xl font-bold tracking-wider text-center max-md:max-w-full max-md:text-4xl">
          TeleHealth Insights
        </h1>
        <p className="mt-8 text-2xl leading-8 text-center max-md:max-w-full">
          Empower bilingual families to conduct at-home speech and language
          assessments with confidence through our intuitive telehealth solution.
        </p>
        <div className="flex flex-wrap gap-7 justify-center items-center mt-8 w-full">
          <button
            className="overflow-hidden gap-2.5 px-14 py-6 bg-slate-900 min-w-[240px] rounded-[40px] text-2xl font-medium leading-none text-white"
            tabIndex={0}
            aria-label="Clinicians login button"
          >
            Clinicians login
          </button>
          <button
            className="overflow-hidden gap-2.5 px-14 py-6 bg-slate-900 min-w-[240px] rounded-[40px] text-2xl font-medium leading-none text-white w-[257px]"
            tabIndex={0}
            aria-label="Parents login button"
          >
            Parents login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
