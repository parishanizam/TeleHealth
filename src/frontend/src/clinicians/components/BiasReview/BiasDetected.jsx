function BiasDetected({ biasState }) {
  if (!biasState) return null;
  return (
    <div className={`text-3xl tracking-tight text-center text-pink-500`}>
      <span className="font-bold">Bias Detected</span>
    </div>
  );
}

export default BiasDetected;
