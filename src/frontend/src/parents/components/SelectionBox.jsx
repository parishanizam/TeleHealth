import * as React from "react";

export function SelectionBox({ title }) {
  return (
    <div className="px-56 py-8 max-w-full tracking-normal leading-10 text-center bg-sky-400 rounded-xl min-h-[101px] w-[940px] max-md:px-5 max-md:max-w-full">
      {title}
    </div>
  );
}