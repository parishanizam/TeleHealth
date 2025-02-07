import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { VideoTest } from "../components/VideoTest";
import { AudioTest } from "../components/AudioTest";
import { MicrophoneTest } from "../components/MicrophoneTest";
import NextButton from "../components/NextButton";
import ConsentForm from "../components/ConsentForm";

import VideoIcon from "../../assets/video.svg";
import SpeakerIcon from "../../assets/speaker.svg";
import MicrophoneIcon from "../../assets/microphone.svg";
import VolumeTestPlaceholder from "../../assets/volumetestplaceholder.svg";

// Demo data to render the "device selectors"
const devices = [
  {
    type: "video",
    icon: VideoIcon,
    label: "Video",
    selectedDevice: "Chosen Device",
  },
  {
    type: "speaker",
    icon: SpeakerIcon,
    label: "Speaker",
    selectedDevice: "Chosen Device",
  },
  {
    type: "microphone",
    icon: MicrophoneIcon,
    label: "Microphone",
    selectedDevice: "Chosen Device",
  },
];

export default function MediaTesting() {
  const [showConsent, setShowConsent] = useState(true);
  const navigate = useNavigate();

  // Fetch test selection from Redux
  const { language, testType } = useSelector((state) => state.testSelection);

  const handleConsent = () => {
    setShowConsent(false);
  };

  const handleDecline = () => {
    navigate("/");
  };

  // Determine the next route based on language and test type
  const getNextRoute = () => {
    if (testType === "matching") {
      return "/parents/MatchingInstructions";
    }
    if (testType === "repetition") {
      return "/parents/RepetitionInstructions";
    }
    // const getNextRoute = () => {
    //   if (language === "english" && testType === "matching") {
    //     return "/parents/EnglishMatchingInstructions";
    //   }

    //   if (language === "english" && testType === "repetition") {
    //     return "/parents/EnglishRepetitionInstructions";
    //   }

    //   if (language === "mandarin" && testType === "matching") {
    //     return "/parents/MandarinMatchingInstructions";
    //   }

    //   if (language === "mandarin" && testType === "repetition") {
    //     return "/parents/MandarinRepetitionInstructions";
    //   }

    // // Default route
    // return "/";
  };

  useEffect(() => {
    if (showConsent) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "hidden";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConsent]);

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24 overflow-hidden">
      <Header title="Video, Audio and Microphone" />

      <main className="flex flex-wrap items-start justify-center gap-10 mt-20 w-full max-md:mt-10 max-md:max-w-full">
        {/* VIDEO SECTION */}
        <div className="flex flex-col w-[478px] min-w-[240px] max-md:max-w-full">
          <VideoTest />
        </div>

        {/* AUDIO & MICROPHONE SECTION */}
        <div className="flex flex-col w-[478px] min-w-[240px] max-md:max-w-full">
          {/* Speaker Test */}
          <AudioTest visualizer={VolumeTestPlaceholder} />

          {/* Microphone Test */}
          <MicrophoneTest visualizer={VolumeTestPlaceholder} />
        </div>
      </main>

      {/* Navigation or Next Step */}
      <div className="flex gap-2.5 justify-center items-center px-60 mt-20 w-full min-h-[60px] max-md:px-5 max-md:mt-10">
        <NextButton to={getNextRoute()} />
      </div>

      {/* Consent Form Modal */}
      {showConsent && (
        <ConsentForm onConsent={handleConsent} onDecline={handleDecline} />
      )}
    </div>
  );
}
