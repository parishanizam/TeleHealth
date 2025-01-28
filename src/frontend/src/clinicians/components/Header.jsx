import React from "react";
import BackArrow from "../../assets/backarrow.svg";
import Globe from "../../assets/globe.svg";
import Logout from "../../assets/logout.svg";

export function Header({ title }) {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-start w-full text-slate-900 max-md:max-w-full">
      <button className="flex gap-1.5 items-center py-5 text-2xl leading-none whitespace-nowrap w-[67px]">
        <img
          loading="lazy"
          src={BackArrow}
          className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.63] fill-slate-900"
          alt="Back"
        />
        <div className="self-stretch my-auto w-[51px]">Back</div>
      </button>
      <div className="gap-2.5 self-stretch py-5 text-6xl tracking-tight text-center text-black leading-[64px] whitespace-nowrap max-md:text-4xl">
        {title}
      </div>
      <div className="flex gap-2.5 items-center py-2.5 text-base font-bold leading-none text-center whitespace-nowrap w-[113px]">
        <div className="flex gap-4 items-start self-stretch px-2 pt-2.5 pb-4 my-auto w-[113px]">
          <div className="flex flex-col items-center">
            <img
              loading="lazy"
              src={Globe}
              className="object-contain aspect-square fill-slate-900 w-[25px]"
              alt="Language"
            />
            <div>EN</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              loading="lazy"
              src={Logout}
              alt="Logout"
              className="object-contain aspect-square fill-slate-900 w-[25px]"
            />
            <div>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}