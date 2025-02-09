// eslint-disable-next-line react/prop-types
function RemoveBiasButton({ onClick, isBiasDetected }) {
  return (
    <button
      className={`fixed bottom-6 right-6 p-2 text-xl tracking-normal leading-8 text-white rounded-lg shadow-sm h-12 w-[228px] ${
        isBiasDetected ? "bg-pink-500" : "bg-green-600"
      }`}
      onClick={onClick}
    >
      {isBiasDetected ? "Remove Bias" : "Add Bias"}
    </button>
  );
}

export default RemoveBiasButton;
