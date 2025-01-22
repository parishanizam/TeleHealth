import * as React from "react";

export function LanguageOption({ label }) {
  return (
    <div className="flex gap-2 items-center w-full mt-6 first:mt-0">
      <div className="flex shrink-0 self-stretch my-auto w-5 h-5 bg-white border border-black border-solid" />
      <div className="self-stretch my-auto">{label}</div>
    </div>
  );
}