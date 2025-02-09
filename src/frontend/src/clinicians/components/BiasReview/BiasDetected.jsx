// eslint-disable-next-line react/prop-types
function BiasDetected({ biasState }) {
  if (!biasState) return null; // Don't render anything if biasState is false

  return (
    <div
      className={`text-3xl tracking-tight text-center text-pink-500 leading-[64px] max-md:max-w-full max-md:text-4xl`}
    >
      <span className="font-bold">Bias Detected</span>
    </div>
  );
}

export default BiasDetected;
