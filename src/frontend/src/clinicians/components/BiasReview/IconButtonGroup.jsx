import IconButton from "./IconButton";
import CheckmarkIcon from "../../../assets/checkmark.svg";
import XIcon from "../../../assets/x.svg";
import DashIcon from "../../../assets/dash.svg";

function IconButtonGroup() {
  const handleAction = (actionType) => {
    console.log(`${actionType} button clicked`);
  };

  return (
    <div className="flex gap-4 items-center justify-center mt-4">
      <IconButton
        iconSrc={CheckmarkIcon}
        bgColor="bg-green-500"
        onClick={() => handleAction("Checkmark")}
      />
      <IconButton
        iconSrc={XIcon}
        bgColor="bg-red-500"
        onClick={() => handleAction("Cross")}
      />
      <IconButton
        iconSrc={DashIcon}
        bgColor="bg-yellow-500"
        onClick={() => handleAction("Dash")}
      />
    </div>
  );
}

export default IconButtonGroup;
