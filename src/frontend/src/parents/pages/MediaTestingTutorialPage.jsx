import * as React from "react";
import { DeviceSelector } from "../components/DeviceSelector";
import { AudioTest } from "../components/AudioTest";
import NextButton from "../components/NextButton";

import Globe from "../../assets/globe.svg";
import BackArrow from "../../assets/backarrow.svg";
import Logout from "../../assets/logout.svg";
import Video from "../../assets/video.svg";
import Speaker from "../../assets/speaker.svg";
import Microphone from "../../assets/microphone.svg";
import VolumeTestPlaceholder from "../../assets/volumetestplaceholder.svg";
import ConsentFormImage from "../../assets/ConsentFormImage.png"; // Example placeholder for consent form image
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

function MediaTestingTutorialPage() {
  return (
<div className="flex flex-col min-h-screen bg-white text-zinc-950">
  {/* Header */}
  <div className="flex justify-between items-center w-full px-8 py-4 bg-gray-100">
    <button className="flex gap-1.5 items-center text-2xl leading-none whitespace-nowrap">
      <img
        loading="lazy"
        src={BackArrow}
        alt="Back"
        className="object-contain w-4 aspect-square fill-slate-900"
      />
      <span>Back</span>
    </button>
    <div className="flex gap-6 items-center">
      {/* Language Button */}
      <button className="flex flex-col items-center text-base font-bold leading-none text-center">
        <img
          loading="lazy"
          src={Globe}
          alt="Language"
          className="object-contain w-6 aspect-square fill-slate-900"
        />
        <span>EN</span>
      </button>
      {/* Logout Button */}
      <button className="flex flex-col items-center text-base font-bold leading-none text-center">
        <img
          loading="lazy"
          src={Logout}
          alt="Logout"
          className="object-contain w-6 aspect-square fill-slate-900"
        />
        <span>Logout</span>
      </button>
    </div>
  </div>

  {/* Title */}
  <div className="mt-6 text-center">
    <h1 className="text-5xl font-bold tracking-wide max-md:text-3xl">
      Media Setup Tutorial
    </h1>
  </div>

  {/* Consent Form Section */}
  <div className="mt-8 px-8">
    <h2 className="text-4xl font-semibold text-center mb-6">Consent Form</h2>
    <p className="text-lg text-center">
      During the assessment, you will be required to review and complete a consent form.
    </p>
    <p className="text-lg text-center mb-3">
      This ensures you understand how your data will be used. Please read the provided information carefully when prompted.
    </p>
    {/* Consent Form as an Image */}
    <div className="flex justify-center">
      <img
        loading="lazy"
        src={ConsentFormImage}
        alt="Consent Form"
        className="max-w-md border border-gray-300 rounded-lg shadow-md"
      />
    </div>
  </div>

  {/* Instructions */}
  <div className="mt-8 text-lg leading-6 text-center max-md:mt-2 max-md:text-base">
    After completing the consent form during the assessment, you will be guided to configure your video, audio, and microphone devices.
    <p>This step ensures that all devices are working correctly before you proceed.</p>
  </div>

  {/* Media Setup Section */}
  <div className="mt-3 flex flex-wrap gap-2 justify-center items-start">
    {/* Video Setup */}
    <div className="flex flex-col min-w-[240px] w-[478px] max-md:max-w-full">
      <DeviceSelector {...devices[0]} />
      <div className="flex flex-col mt-1 max-w-full w-[478px]">
        <div className="flex shrink-0 bg-zinc-300 h-[269px] max-md:max-w-full"></div>
      </div>
    </div>

    {/* Speaker and Microphone Setup */}
    <div className="flex flex-col min-w-[240px] w-[478px] max-md:max-w-full">
      <div className="mb-1">
        <DeviceSelector {...devices[1]} />
        <AudioTest visualizer={VolumeTestPlaceholder} />
      </div>
      <div className="mb-1">
        <DeviceSelector {...devices[2]} />
        <AudioTest visualizer={VolumeTestPlaceholder} />
      </div>
    </div>
  </div>

  {/* Next Button Positioned in Bottom-Right */}
  <div className="flex justify-end items-center mt-8 px-8 pb-8">
    <NextButton />
  </div>
</div>

  );
}

export default MediaTestingTutorialPage;
