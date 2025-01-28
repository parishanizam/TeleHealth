import { useState } from "react";
import QuestionTitle from "../components/BiasReview/QuestionTitle";
import { Header } from "../components/Header";
import IconButtonGroup from "../components/BiasReview/IconButtonGroup";
import BiasDetected from "../components/BiasReview/BiasDetected";
import QuestionAnswers from "../components/BiasReview/QuestionAnswers";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import RemoveBiasButton from "../components/BiasReview/RemoveBiasButton";

function BiasReviewPage() {
  const [biasState, setBiasState] = useState(true);

  const handleToggleBias = () => {
    setBiasState(!biasState);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-5 bg-white">
      
      {/* Header Section */}
      <Header title="Mitchell Weingust - January 3, 2025" />
      <QuestionTitle />

      {/* Title and Bias Detected Info */}
      <div className="text-center mt-4">
        <BiasDetected biasState={biasState} />
      </div>

      {/* Video + Answer Section (Side-by-side) */}
      <div className="flex w-full max-w-4xl items-center justify-between mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        
        {/* Video Section */}
        <div className="w-1/2 flex justify-center">
          <TempMediaPlayer />
        </div>

        {/* Answer Section */}
        <div className="w-1/2 flex flex-col items-center space-y-4">
          <QuestionAnswers />
          <IconButtonGroup />
        </div>

      </div>

      {/* Bottom "Remove Bias" Button Section */}
      <div className="w-full flex justify-end pr-10 pb-10">
        <RemoveBiasButton
          onClick={handleToggleBias}
          buttonText={biasState ? "Remove Bias" : "Flag Bias"}
          isBiasDetected={biasState}
        />
      </div>
    </div>
  );
}

export default BiasReviewPage;
