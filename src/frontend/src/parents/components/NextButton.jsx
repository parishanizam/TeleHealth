/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 30, 2025
 * Purpose: Contains NextButton component to navigate to the next page
 */

import React from "react";
import { Link } from "react-router-dom";
import NextArrow from "../../assets/nextarrow.svg";

function NextButton({ to = "/", name = "Next", icon = NextArrow }) {
  return (
    <Link to={to}>
      <div
        className="flex justify-center items-center px-4 py-2.5 bg-white rounded-lg border-blue-600 
                   border-solid border-[1.5px] text-xl text-blue-600 cursor-pointer 
                   transition-all duration-200 ease-in-out 
                   hover:bg-blue-500 hover:border-blue-900 hover:text-blue-900 
                   active:bg-blue-200 active:scale-95 active:opacity-80"
      >
        <span>{name}</span>
        {icon && (
          <img src={icon} alt="Next" className="ml-2 w-5 h-5 object-contain" />
        )}
      </div>
    </Link>
  );
}

export default NextButton;
