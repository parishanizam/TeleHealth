import * as React from "react";

export const DeviceSelector = ({ icon, label, selectedDevice, onSelect }) => {
  return (
    <div className="flex flex-col w-full max-w-[478px] max-md:max-w-full">
      <div className="flex justify-between items-center w-full text-xl text-black">
        <img
          loading="lazy"
          src={icon}
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[25px]"
          alt={`${label} device icon`}
        />
        <div className="self-stretch my-auto w-[453px] max-md:max-w-full">
          {label}
        </div>
      </div>
      <div className="flex justify-between items-center pl-2 w-full bg-white rounded-lg border border-blue-600 border-solid min-h-[48px] max-md:max-w-full">
        <div className="self-stretch my-auto text-xl leading-8 text-black w-[446px] max-md:max-w-full">
          {selectedDevice}
        </div>
        <div className="flex overflow-hidden gap-2.5 items-center self-stretch px-2.5 py-2.5 my-auto min-h-[25px] w-[25px]">
          <div className="flex flex-col flex-1 shrink justify-center items-center self-stretch my-auto w-full basis-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0da183f4a7b6083ece05c2807c7b42ca215c23459e1f3d21aa26a957d250255?placeholderIfAbsent=true&apiKey=ca3d1652331448359ab6df8ba03c489a"
              className="object-contain aspect-[1.5] w-[13px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};