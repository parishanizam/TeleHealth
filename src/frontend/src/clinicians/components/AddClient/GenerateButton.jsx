/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 17, 2025
 * Purpose: Generate security code button to be added to AddClient page
 */

function GenerateButton({ onClick, disabled, buttonText }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 text-xl leading-none text-white rounded-lg shadow-sm w-[433px] ${
        disabled
          ? "bg-gray-400"
          : "bg-slate-900 hover:opacity-80 active:opacity-100"
      }`}
    >
      {buttonText}
    </button>
  );
}

export default GenerateButton;
