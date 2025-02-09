import { useState } from "react";
import IconButton from "./IconButton";
import CheckmarkIcon from "../../../assets/checkmark.svg";
import XIcon from "../../../assets/x.svg";
import DashIcon from "../../../assets/dash.svg";

function IconButtonGroup() {
  const [activeButton, setActiveButton] = useState(null);

  const handleAction = (actionType) => {
    setActiveButton(actionType);
    console.log(`${actionType} button clicked`);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <p className="mb-4 text-lg font-semibold">
        Select a button to grade the question
      </p>
      <div className="flex gap-4 items-center justify-center mt-4">
        <IconButton
          iconSrc={CheckmarkIcon}
          bgColor={
            activeButton === "Checkmark" ? "bg-green-500" : "bg-green-100"
          }
          onClick={() => handleAction("Checkmark")}
        />
        <IconButton
          iconSrc={DashIcon}
          bgColor={activeButton === "Dash" ? "bg-yellow-500" : "bg-yellow-100"}
          onClick={() => handleAction("Dash")}
        />
        <IconButton
          iconSrc={XIcon}
          bgColor={activeButton === "Cross" ? "bg-red-500" : "bg-red-100"}
          onClick={() => handleAction("Cross")}
        />
      </div>
    </div>
  );
}

export default IconButtonGroup;
