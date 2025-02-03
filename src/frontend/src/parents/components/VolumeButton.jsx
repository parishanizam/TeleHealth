import VolumeButtonIcon from "../../assets/volumebutton.svg";

// eslint-disable-next-line react/prop-types
export function VolumeButton({ sound }) {
  return (
    <div className="flex justify-center items-center w-full mt-4">
      <div className="p-2.5 w-[120px]">
        {sound ? (
          <img
            src={VolumeButtonIcon}
            alt="Play Sound"
            onClick={() => new Audio(sound).play()}
            className="object-contain w-[100px] cursor-pointer hover:shadow-md"
          />
        ) : (
          <div className="text-center text-gray-500">No Sound</div>
        )}
      </div>
    </div>
  );
}