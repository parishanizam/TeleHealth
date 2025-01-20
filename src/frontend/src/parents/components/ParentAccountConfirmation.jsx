import React, { useState } from "react";

function ParentAccountConfirmation() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form className="flex flex-col items-center px-5 py-56 text-2xl text-black bg-white max-md:py-24">
      <h1 className="text-4xl tracking-tight leading-snug text-center max-md:max-w-full">
        Account Confirmation
      </h1>
      <p className="mt-5 leading-8 text-center text-zinc-950 w-[632px] max-md:max-w-full">
        Before we get started, we need you to confirm that your first and last
        name are entered correctly.
      </p>

      <div className="mt-5 leading-none text-center text-zinc-950 max-md:max-w-full">
        FirstName: John
      </div>
      <div className="mt-2 leading-none text-center text-zinc-950 max-md:max-w-full">
        LastName: Doe
      </div>

      <p className="mt-5 leading-8 text-center text-zinc-950 w-[632px] max-md:max-w-full">
        If the information you see above is incorrect, please enter the correct
        first and last name below:
      </p>

      <div className="flex flex-col mt-5 max-w-full w-[438px]">
        <input
          type="text"
          placeholder="FirstName"
          className="px-11 pt-3 pb-6 text-base tracking-tight text-center whitespace-nowrap rounded-2xl border border-solid border-zinc-300 max-md:px-5 max-md:max-w-full"
          aria-label="First Name"
        />
      </div>
      <div className="flex flex-col mt-5 max-w-full w-[438px]">
        <input
          type="text"
          placeholder="LastName"
          className="px-11 pt-3 pb-6 text-base tracking-tight text-center whitespace-nowrap rounded-2xl border border-solid border-zinc-300 max-md:px-5 max-md:max-w-full"
          aria-label="Last Name"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center mt-5 text-xl max-md:max-w-full">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 border border-black border-solid"
            aria-label="Accept terms and conditions"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="ml-2">
            I agree to the terms and conditions outlined by TeleHealth Insights
            Client Agreement
          </span>
        </label>
      </div>

      <button
        type="submit"
        className={`px-4 py-2.5 text-xl leading-none text-white bg-gray-400 rounded-lg shadow-sm w-[433px]  ${
          isChecked ? "bg-slate-900 hover:opacity-80 active:opacity-100" : "bg-gray-400"
        } min-h-[0px] w-[442px]`}
        disabled={!isChecked}
      >
        CREATE ACCOUNT
      </button>
    </form>
  );
}

export default ParentAccountConfirmation;
