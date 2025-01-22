import React from "react";
import { Header } from "../components/Header";
import VolumeButton from "../../assets/volumebutton.svg";
import InstructionStep from "../components/InstructionStep";
import NextButton from "../components/NextButton";

function EnglishMatchingInstructions() {
  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title="English Matching Instructions" />

      {/* Instructions Header Box */}
      <div className="flex flex-col items-center mt-12 w-full text-3xl text-center text-black max-md:mt-10">
        <div className="px-10 py-8 bg-sky-400 rounded-xl w-full max-w-4xl">
          Instructions
        </div>
      </div>

      {/* Steps Section */}
      <div className="flex flex-col items-center mt-12 gap-6 w-full max-md:mt-10">
        <div className="flex flex-col gap-6 w-full max-w-5xl px-4 text-center">
          
          <InstructionStep number="1">
            Press the{" "}
            <img
              loading="lazy"
              src={VolumeButton}
              alt="Play button"
              className="inline-block w-6 h-6 mx-1"
            />{" "}
            button to play the question audio.
          </InstructionStep>

          <InstructionStep number="2">
            Select the image you think the audio is describing.
          </InstructionStep>

          <InstructionStep number="3">
            Press the{" "}
            <a
              href="#"
              className="px-4 py-2.5 bg-white rounded-lg border-blue-600 border border-solid text-blue-600 cursor-default inline-block mx-1"
            >
              Next
            </a>{" "}
            button to proceed, or the{" "}
            <a
              href="#"
              className="px-4 py-2.5 bg-slate-900 text-white rounded-lg cursor-default inline-block mx-1"
            >
              Finish
            </a>{" "}
            button to complete the test.
          </InstructionStep>

        </div>
      </div>

      {/* Start Section */}
      <div className="flex flex-col items-center mt-12 w-full text-center text-black max-md:mt-10">
        <div>Press &quot;Start&quot; when ready</div>
        <div className="mt-6">
        <NextButton to="/parents/EnglishMatchingInstructions" name = "Start" />
        </div>
      </div>
    </div>
  );
}

export default EnglishMatchingInstructions;
