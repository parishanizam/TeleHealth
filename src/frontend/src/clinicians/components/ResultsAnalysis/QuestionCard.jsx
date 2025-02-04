import ChevronIcon from "../../../assets/chevron.svg"; 
import CheckmarkIcon from "../../../assets/checkmark.svg";
import DashIcon from "../../../assets/dash.svg"; 
import XIcon from "../../../assets/x.svg"; 

function QuestionCard({ questionNumber, status, biasDetected, onClick }) {
  let icon;
  if (status === "correct") {
    icon = CheckmarkIcon;
  } else if (status === "incorrect") {
    icon = XIcon;
  } else {
    icon = DashIcon;
  }

  return (
    <div
      className="flex items-center justify-between px-3 mt-2.5 w-full text-center bg-sky-400 rounded-xl min-h-[101px] max-md:max-w-full cursor-pointer hover:bg-sky-500 transition"
      onClick={onClick} 
    >
      {/* Status Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-blue-300 text-white rounded-full">
        <img src={icon} alt="Status Icon" className="object-contain w-8 h-8" />
      </div>

      {/* Question Number & Bias Info */}
      <div className="flex items-center text-black space-x-2">
        <div className="mr-2">Question {questionNumber}</div>
        {biasDetected && <div className="text-pink-500 font-bold">Bias Detected</div>}
      </div>

      {/* Chevron Icon */}
      <img
        src={ChevronIcon}
        alt="Chevron Icon"
        className="object-contain shrink-0 w-12 aspect-square"
      />
    </div>
  );
}

export default QuestionCard;
