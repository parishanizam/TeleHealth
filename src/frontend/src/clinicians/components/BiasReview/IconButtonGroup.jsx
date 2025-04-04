/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 18, 2025
 * Purpose: Container for individual Icon Buttons for marking assessments on the BiasReview page
 */

import { useState, useEffect } from "react";
import IconButton from "./IconButton";
import CheckmarkIcon from "../../../assets/checkmark.svg";
import XIcon from "../../../assets/x.svg";
import DashIcon from "../../../assets/dash.svg";

function IconButtonGroup({ markState, changeMarkState }) {
  const [activeButton, setActiveButton] = useState(markState);

  useEffect(() => {
    setActiveButton(markState);
  }, [markState]);

  const handleAction = (newMarkState) => {
    if (activeButton !== newMarkState) {
      setActiveButton(newMarkState);
      changeMarkState(newMarkState);
    }
  };

  return (
    <div className="flex flex-col items-center mt-1 bg-white rounded-xl border border-2 border-gray-300 rounded-xl">
      <p className="text-lg mt-2 font-semibold">Mark Answer</p>
      <div className="flex gap-4 items-center justify-center mb-3 mt-3">
        <IconButton
          iconSrc={CheckmarkIcon}
          bgColor={activeButton === "Correct" ? "bg-green-500" : "bg-green-100"}
          onClick={() => handleAction("Correct")}
          className="transition transform hover:scale-105 hover:brightness-90"
        />
        <IconButton
          iconSrc={DashIcon}
          bgColor={activeButton === "Undetermined" ? "bg-yellow-500" : "bg-yellow-100"}
          onClick={() => handleAction("Undetermined")}
          className="transition transform hover:scale-105 hover:brightness-90"
        />
        <IconButton
          iconSrc={XIcon}
          bgColor={activeButton === "Incorrect" ? "bg-red-500" : "bg-red-100"}
          onClick={() => handleAction("Incorrect")}
          className="transition transform hover:scale-105 hover:brightness-95"
        />
      </div>
    </div>
  );
}

export default IconButtonGroup;