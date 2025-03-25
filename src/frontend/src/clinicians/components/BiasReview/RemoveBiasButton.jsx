// eslint-disable-next-line react/prop-types
function RemoveBiasButton({ onClick, isBiasDetected }) {
  return (
    <button
      className={`p-2 text-xl tracking-normal leading-8 text-white rounded-lg shadow-sm h-12 w-[228px] mt-4 ${
        isBiasDetected ? "bg-pink-500 hover:bg-pink-600 transition" : "bg-green-600 hover:bg-green-700 transition"
      }`}
      onClick={onClick}
    >
      {isBiasDetected ? "Remove Bias" : "Add Bias"}
    </button>
  );
}

export default RemoveBiasButton;
