import * as React from "react";

export const AudioTest = ({ visualizer }) => {
  return (
    <div className="flex gap-2.5 items-center mt-12 text-xl leading-none text-white whitespace-nowrap max-md:mt-10 max-md:max-w-full">
      <button 
        className="self-stretch px-4 py-2.5 my-auto rounded-lg bg-slate-900 min-h-[40px] w-[91px]"
        aria-label="Test audio"
      >
        Test
      </button>
      <img
        loading="lazy"
        src={visualizer}
        className="object-contain self-stretch my-auto aspect-[14.71] min-w-[240px] w-[369px]"
        alt="Audio visualizer"
      />
    </div>
  );
};