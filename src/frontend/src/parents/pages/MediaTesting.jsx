import React, { useState } from "react";
import { DeviceSelector } from "../components/DeviceSelector";
import { AudioTest } from "../components/AudioTest";
import ConsentForm from "../components/ConsentForm"; 
import NextButton from "../components/NextButton";

import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";
import Video from "../../assets/video.svg";
import Speaker from "../../assets/speaker.svg";
import Microphone from "../../assets/microphone.svg";
import VolumeTestPlaceholder from "../../assets/volumetestplaceholder.svg";

const devices = [
  {
    type: "video",
    icon: Video,
    label: "Video",
    selectedDevice: "Chosen Device"
  },
  {
    type: "speaker",
    icon: Speaker,
    label: "Speaker",
    selectedDevice: "Chosen Device"
  },
  {
    type: "microphone",
    icon: Microphone,
    label: "Microphone",
    selectedDevice: "Chosen Device"
  }
];

export default function MediaTesting() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const handleShowPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="relative flex overflow-hidden flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      {/* Popup Overlay */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <ConsentForm />
        </div>
      )}


      <header className="flex flex-wrap gap-10 justify-between items-start w-full text-slate-900 max-md:max-w-full">
        <button
          className="flex gap-1.5 items-center py-5 text-2xl leading-none whitespace-nowrap w-[67px]"
          aria-label="Go back"
        >
          <img
            loading="lazy"
            src={BackArrow}
            className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.63] fill-slate-900"
            alt=""
          />
          <span className="self-stretch my-auto w-[51px]">Back</span>
        </button>
        <h1 className="gap-2.5 self-stretch py-5 text-6xl tracking-tight text-center text-black leading-[64px] min-w-[240px] w-[355px] max-md:max-w-full max-md:text-4xl">
          Video, Audio and Microphone
        </h1>
        <div className="flex gap-2.5 items-center py-2.5 text-base font-bold leading-none text-center whitespace-nowrap w-[113px]">
          <div className="flex gap-4 items-start self-stretch px-2 pt-2.5 pb-4 my-auto w-[113px]">
            <div className="flex flex-col">
              <img
                loading="lazy"
                src={Globe}
                className="object-contain aspect-square fill-slate-900 w-[25px]"
                alt="Language selector"
              />
              <div>EN</div>
            </div>
            <div className="flex flex-col">
              <img
                loading="lazy"
                src={Logout}
                alt=""
                className="object-contain aspect-square fill-slate-900 w-[25px]"
              />
              <div>Logout</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-wrap gap-10 justify-center items-start mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col min-w-[240px] w-[478px] max-md:max-w-full">
          <DeviceSelector {...devices[0]} />
          <div className="flex flex-col mt-10 max-w-full w-[478px]">
            <div className="flex shrink-0 bg-zinc-300 h-[269px] max-md:max-w-full" />
          </div>
        </div>

        <div className="flex flex-col min-w-[240px] w-[478px] max-md:max-w-full">
          <DeviceSelector {...devices[1]} />
          <AudioTest visualizer={VolumeTestPlaceholder} />
          <DeviceSelector {...devices[2]} />
          <AudioTest visualizer={VolumeTestPlaceholder} />
        </div>
      </main>

      <div className="flex gap-2.5 justify-center items-center px-60 mt-20 w-full min-h-[60px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <NextButton onClick={handleShowPopup} />
      </div>
    </div>
  );
}
