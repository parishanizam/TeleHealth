import * as React from "react";

export function ChecklistItem({ text }) {
  return (
    <div className="flex flex-wrap gap-2 items-center mt-5 max-md:max-w-full">
      <div className="flex shrink-0 self-stretch my-auto w-5 h-5 bg-white border border-black border-solid" 
           role="checkbox" 
           tabIndex="0" 
           aria-checked="false" />
      <div className="self-stretch my-auto max-md:max-w-full">{text}</div>
    </div>
  );
}