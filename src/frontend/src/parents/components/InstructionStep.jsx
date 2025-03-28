import React from "react";

const InstructionStep = ({ number, children }) => {
  return (
    <div className="flex items-center gap-4 w-full text-black max-md:max-w-full">
      <div
        className="flex items-center justify-center w-[50px] h-[50px] bg-neutral-200 rounded-full 
                      text-3xl tracking-normal leading-10 text-center"
      >
        {number}
      </div>
      <div className="text-2xl tracking-normal leading-7">{children}</div>
    </div>
  );
};

export default InstructionStep;
