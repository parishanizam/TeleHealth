import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { VideoTest } from "../components/VideoTest";
import { AudioTest } from "../components/AudioTest";
import { MicrophoneTest } from "../components/MicrophoneTest";
import NextButton from "../components/NextButton";
import ConsentForm from "../components/ConsentForm";
import VolumeTestPlaceholder from "../../assets/volumetestplaceholder.svg";

export default function MediaTesting() {
  const [showConsent, setShowConsent] = useState(true);
  const navigate = useNavigate();
  const { testType } = useSelector((state) => state.testSelection);

  const handleConsent = () => setShowConsent(false);
  const handleDecline = () => navigate("/");

  const getNextRoute = () => `/parents/${testType.charAt(0).toUpperCase() + testType.slice(1)}Instructions`;

  useEffect(() => {
    document.body.style.overflow = showConsent ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showConsent]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white px-4 pt-4">
      <Header title="Video, Audio & Microphone" />

      {/* Main Content */}
      <main className="flex flex-wrap items-start justify-center gap-6 mt-10 w-full">
        {/* Video Section */}
        <div className="w-full max-w-md">
          <VideoTest />
        </div>

        {/* Audio & Microphone Section */}
        <div className="w-full max-w-md space-y-4">
          <AudioTest visualizer={VolumeTestPlaceholder} />
          <MicrophoneTest visualizer={VolumeTestPlaceholder} />
        </div>
      </main>

      {/* Next Button */}
      <div className="flex justify-center items-center w-full mt-10 min-h-[50px]">
        <NextButton to={getNextRoute()} />
      </div>

      {/* Consent Form */}
      {showConsent && <ConsentForm onConsent={handleConsent} onDecline={handleDecline} />}
    </div>
  );
}
