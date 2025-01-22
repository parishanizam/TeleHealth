import * as React from "react";
import NextArrow from "../../assets/nextarrow.svg";

function NextButton() {
  return (
    <div className="flex flex-col self-stretch my-auto w-[117px]">
      <div className="flex overflow-hidden justify-center items-center px-4 py-2.5 w-full bg-white rounded-lg border-blue-600 border-solid border-[1.5px] min-h-[40px]" tabindex="0" role="button">
        <div className="self-stretch my-auto text-xl leading-none text-blue-600">Next</div>
        <div className="flex gap-2.5 items-center self-stretch p-1.5 my-auto w-[23px]">
          <img
            loading="lazy"
            src={NextArrow}
            className="object-contain self-stretch my-auto aspect-square fill-blue-600 w-[13px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default NextButton;