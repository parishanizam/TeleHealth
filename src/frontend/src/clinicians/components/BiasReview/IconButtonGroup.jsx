import { useState, useEffect } from "react";
import IconButton from "./IconButton";
import CheckmarkIcon from "../../../assets/checkmark.svg";
import XIcon from "../../../assets/x.svg";
import DashIcon from "../../../assets/dash.svg";

function IconButtonGroup({ markState, changeMarkState }) {
  const [activeButton, setActiveButton] = useState(markState);

  // Sync only when `markState` changes externally (initial load or forced update)
  useEffect(() => {
    setActiveButton(markState);
  }, [markState]);

  const handleAction = (newMarkState) => {
    if (activeButton !== newMarkState) {
      setActiveButton(newMarkState); // Keep the UI consistent
      changeMarkState(newMarkState); // Inform the parent
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <p className="mb-4 text-lg font-semibold">Select a button to grade the question</p>
      <div className="flex gap-4 items-center justify-center mt-4">
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