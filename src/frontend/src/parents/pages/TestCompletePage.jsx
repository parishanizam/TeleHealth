import { Header } from "../components/Header";
import SmileyFace from "../../assets/smileyface.svg";
import NextButton from "../components/NextButton";

function TestComplete() {
  return (
    <div className="flex flex-col items-center px-5 pt-2.5 pb-[510px] max-md:pb-24">
      <Header title="Assessment Complete!" />

      {/* Smiley Face */}
      <div className="flex justify-center mt-6">
        <img
          loading="lazy"
          src={SmileyFace}
          alt="Test completion indicator"
          className="object-contain w-[120px]"
        />
      </div>

      {/* Success Message */}
      <h2 className="mt-6 text-2xl text-center font-semibold text-blue-700">
        Thank you for completing the assessment!
      </h2>
      <p className="mt-3 text-lg text-center text-gray-700">
        Your results have been saved and your clinician will review them soon.
        <span className="block font-medium mt-1">You did a fantastic job!</span>
      </p>

      {/* Follow-up Question */}
      <h3 className="mt-12 text-center text-xl font-semibold text-blue-700">
        Would you like to do another assessment?
      </h3>

      <div className="flex gap-8 justify-center mt-6">
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
  );
}

export default TestComplete;
