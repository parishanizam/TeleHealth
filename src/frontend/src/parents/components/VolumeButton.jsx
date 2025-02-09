import { useState, useEffect, useRef } from "react";
import VolumeButtonIcon from "../../assets/volumebutton.svg";

export function VolumeButton({ sound, resetTrigger }) {
  const [clickCount, setClickCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference to the audio element

  const handleClick = async () => {
    if (clickCount < 2 && sound && !isPlaying) {
      const audio = new Audio(sound);
      audioRef.current = audio; // Save the audio reference
      setIsPlaying(true);
      audio.play();

      audio.onended = () => setIsPlaying(false);

      setClickCount(clickCount + 1);
    }
  };

  // Reset click count when question number changes
  useEffect(() => {
    setClickCount(0);
  }, [resetTrigger]);

  // Stop audio when navigating to the next question
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio
      audioRef.current.currentTime = 0; // Reset the audio position
      setIsPlaying(false); // Update playing state
    }
  }, [resetTrigger]); // Reset when resetTrigger (question number) changes

  const isDisabled = clickCount >= 2;

  return (
    <div className="flex justify-center items-center w-full mt-4 relative">
      <div className="p-2.5 relative w-[120px] flex justify-center">
        <div className="relative w-[100px] h-[100px] rounded-full flex items-center justify-center">
          {sound ? (
            <>
              <img
                src={VolumeButtonIcon}
                alt="Play Sound"
                onClick={handleClick}
                className={`object-contain w-[100px] cursor-pointer rounded-full transition-transform duration-1 hover:scale-90 active:scale-95 hover:shadow-inner ${
                  isDisabled || isPlaying
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              />
              {isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full transition-opacity duration-500 font-bold">
                  No Plays Left
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500">No Sound</div>
          )}
        </div>
      </div>
    </div>
  );
}
