import ChevronIcon from "../../../assets/chevron.svg"; 
import CheckmarkIcon from "../../../assets/checkmark.svg";
import DashIcon from "../../../assets/dash.svg"; 
import XIcon from "../../../assets/x.svg"; 
import BiasDot from "../../../assets/BiasDot.png";
function QuestionCard({ questionNumber, status, biasDetected, mark_state, onClick, testType }) {
  let icon;
  console.log(testType)
  if (testType === "repetition") {
    // Override icon logic for repetition tests based on mark_state
    if (mark_state === "Correct") {
      console.log("THIS IS A TEST", mark_state)
      icon = CheckmarkIcon;
    } else if (mark_state === "Incorrect") {
      icon = XIcon;
    } else {
      icon = DashIcon; // "Undetermined" state
    }
  } else {
    // Default logic for non-repetition tests
    if (status === "correct") {
      icon = CheckmarkIcon;
    } else if (status === "incorrect") {
      icon = XIcon;
    } else {
      icon = DashIcon;
    }
  }

  return (
    <div
      className="flex items-center justify-between px-3 mt-2.5 w-full text-center bg-sky-400 rounded-xl min-h-[101px] max-md:max-w-full cursor-pointer hover:bg-sky-500 transition"
      onClick={onClick} 
    >

      {/* Status Icon */}
      <div className="relative flex items-center justify-center w-16 h-16 bg-blue-300 text-white rounded-full">
        <img src={icon} alt="Status Icon" className="object-contain w-8 h-8" />
        {biasDetected && (
          <img
            src={BiasDot}
            alt="Bias Dot"
            className="absolute left-[100px] top-5 w-6 h-6"
          />
        )}
      </div>

      {/* Question Number & Bias Info */}
      <div className="flex items-center text-black space-x-2">
        <div className="mr-2">Question {questionNumber}</div>
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
