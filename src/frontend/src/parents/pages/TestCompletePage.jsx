import { Header } from "../components/Header";
import SmileyFace from "../../assets/smileyface.svg";
import NextButton from "../components/NextButton";

function TestComplete() {
  return (
    <div className="flex flex-col items-center h-screen bg-white overflow-hidden">
      
      {/* Fixed Header at the Very Top */}
      <div className="fixed top-0 left-0 w-full">
        <Header title="Assessment Complete!" />
      </div>

      {/* Main Content - Push Below Header */}
      <div className="flex flex-col items-center justify-center w-full pt-40 space-y-6">
        
        {/* Smiley Face */}
        <div className="flex justify-center">
          <img
            loading="lazy"
            src={SmileyFace}
            alt="Test completion indicator"
            className="object-contain w-[120px]"
          />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl text-center font-semibold text-blue-700">
          Thank you for completing the assessment!
        </h2>
        <p className="text-lg text-center text-gray-700">
          Your results have been saved and your clinician will review them soon.
          <span className="block font-medium mt-1">You did a fantastic job!</span>
        </p>

        {/* Follow-up Question */}
        <h3 className="text-center text-xl font-semibold text-blue-700">
          Would you like to do another assessment?
        </h3>

        {/* Button Container */}
        <div className="flex gap-8 justify-center">
          {/* Yes Button */}
          <NextButton
            to="/parents/TestSelection"
            name="Yes, Let's Go!"
            icon={false}
          />
          {/* No Button */}
          <NextButton
            to="/parents/ParentHomePage"
            name="No, I'm Done"
            icon={false}
          />
        </div>
      </div>
      
    </div>
  );
}

export default TestComplete;
