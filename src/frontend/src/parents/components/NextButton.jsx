import React from "react";
import { Link } from "react-router-dom";
import NextArrow from "../../assets/nextarrow.svg";

function NextButton({ to = "/", name = "Next" }) {
  return (
    <Link to={to}>
      <div className="flex justify-center items-center px-4 py-2.5 bg-white rounded-lg border-blue-600 border-solid border-[1.5px] text-xl text-blue-600 cursor-pointer">
        <span>{name}</span>
        <img
          src={NextArrow}
          alt="Next"
          className="ml-2 w-5 h-5 object-contain"
        />
      </div>
    </Link>
  );
}

export default NextButton;
