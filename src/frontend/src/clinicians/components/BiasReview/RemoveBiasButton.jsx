// eslint-disable-next-line react/prop-types
function RemoveBiasButton({ onClick, buttonText, isBiasDetected }) {
  return (
    <button
      className={`absolute bottom-6 right-6 p-2 text-xl tracking-normal leading-8 text-white rounded-lg shadow-sm h-12 w-[228px] ${
        isBiasDetected ? "bg-pink-500" : "bg-pink-500"
      }`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default RemoveBiasButton;
