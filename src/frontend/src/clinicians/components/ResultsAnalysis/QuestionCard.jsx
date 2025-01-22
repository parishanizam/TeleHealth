import ChevronIcon from "../../../assets/chevron.svg"; // Assuming ChevronIcon is needed
import CheckmarkIcon from "../../../assets/checkmark.svg";
import DashIcon from "../../../assets/dash.svg"; // For intermediary status
import XIcon from "../../../assets/x.svg"; // For incorrect status

// eslint-disable-next-line react/prop-types
function QuestionCard({ questionNumber, status, biasDetected }) {
  // Set the icon based on the status
  let icon;
  if (status === "correct") {
    icon = CheckmarkIcon;
  } else if (status === "incorrect") {
    icon = XIcon;
  } else if (status === "intermediary") {
    icon = DashIcon;
  }

  return (
    <div className="flex items-center justify-between px-3 mt-2.5 w-full text-center bg-sky-400 rounded-xl min-h-[101px] max-md:max-w-full">
      {/* Blue Circle for the Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-blue-400 text-white rounded-full">
        <img
          loading="lazy"
          src={icon} // Dynamically get the icon based on status
          alt="Question Status Icon"
          className="object-contain w-8 h-8"
        />
      </div>
      
      {/* Question number and Bias Detected (if present) */}
      <div className="flex items-center text-black space-x-2">
        <div className="mr-2">Question {questionNumber}</div>

        {/* Bias Detected (only if present) */}
        {biasDetected && (
          <div className="text-pink-500 font-bold">
            Bias Detected
          </div>
        )}
      </div>

      {/* Chevron Icon */}
      <img
        loading="lazy"
        src={ChevronIcon}
        alt="Chevron Icon"
        className="object-contain shrink-0 w-12 aspect-square"
      />
    </div>
  );
}

export default QuestionCard;
