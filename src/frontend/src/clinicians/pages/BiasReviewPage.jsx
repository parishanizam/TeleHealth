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
    <div>
      <Header title="Mitchell Weingust - January 3, 2025" />
      <QuestionTitle />
      <BiasDetected biasState={biasState} />
      <TempMediaPlayer />
      <QuestionAnswers />
      <IconButtonGroup />
      <RemoveBiasButton
        onClick={handleToggleBias}
        buttonText={biasState ? "Remove Bias" : "Flag Bias"}
        isBiasDetected={biasState}
      />
    </div>
  );
}

export default BiasReviewPage;
