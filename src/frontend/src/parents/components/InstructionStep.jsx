import * as React from "react";

const InstructionStep = ({ number, children }) => {
  return (
    <div className="flex flex-wrap gap-6 items-center w-full text-black max-md:max-w-full">
      <div className="flex flex-col self-stretch my-auto text-3xl tracking-normal leading-10 text-center whitespace-nowrap w-[50px]">
        <div className="px-1.5 rounded-full bg-neutral-200 fill-neutral-200 h-[50px] w-[50px]">
          {number}
        </div>
      </div>
      <div className="flex flex-col self-stretch my-auto text-2xl tracking-normal leading-7 min-w-[240px] max-md:max-w-full">
        {children}
      </div>
    </div>
  );
};

export default InstructionStep;