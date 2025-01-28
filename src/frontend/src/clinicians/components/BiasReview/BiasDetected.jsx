// eslint-disable-next-line react/prop-types
function BiasDetected({ biasState }) {
    return (
      <div
        className={`text-5xl tracking-tight text-center ${
          biasState ? "text-pink-500" : "text-black-500"
        } leading-[64px] max-md:max-w-full max-md:text-4xl`}
      >
        <span className="font-bold">{biasState ? "Bias Detected" : "Review"}</span>
      </div>
    );
  }
  
  export default BiasDetected;
  