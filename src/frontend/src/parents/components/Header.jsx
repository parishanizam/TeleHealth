import React from "react";
import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";

function Header() {
  return (
    <div className="flex justify-between items-center w-full px-8 py-4 bg-gray-100">
      <button className="flex gap-1.5 items-center text-2xl leading-none whitespace-nowrap">
        <img
          loading="lazy"
          src={BackArrow}
          alt="Back"
          className="object-contain w-4 aspect-square fill-slate-900"
        />
        <span>Back</span>
      </button>
      <div className="flex gap-6 items-center">
        {/* EN Button */}
        <button className="flex flex-col items-center text-base font-bold leading-none text-center">
          <img
            loading="lazy"
            src={Globe}
            alt="Language"
            className="object-contain w-6 aspect-square fill-slate-900"
          />
          <span>EN</span>
        </button>
        {/* Logout Button */}
        <button className="flex flex-col items-center text-base font-bold leading-none text-center">
          <img
            loading="lazy"
            src={Logout}
            alt="Logout"
            className="object-contain w-6 aspect-square fill-slate-900"
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
