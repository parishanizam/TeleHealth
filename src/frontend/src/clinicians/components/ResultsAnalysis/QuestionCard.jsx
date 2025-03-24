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
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 mt-2.5 w-full bg-sky-400 rounded-xl min-h-[101px] cursor-pointer hover:bg-sky-500 transition"
    >
      {/* Status Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-blue-300 rounded-full">
        <img src={icon} alt="Status Icon" className="w-8 h-8 object-contain" />
      </div>

      {/* Bias Dot placeholder */}
      <div className="w-6 h-6 ml-5 shrink-0">
        <img
          src={BiasDot}
          alt="Bias Dot"
          className={`${biasDetected ? "visible" : "invisible"} w-full h-full`}
        />
      </div>

      {/* Question Number */}
      <div className="flex-1 text-center ml-4 text-black text-xg">
        Question {questionNumber}
      </div>

      {/* Chevron Icon */}
      <img
        src={ChevronIcon}
        alt="Chevron Icon"
        className="w-12 h-12 shrink-0 object-contain"
      />
    </div>
  );
}

export default QuestionCard;
