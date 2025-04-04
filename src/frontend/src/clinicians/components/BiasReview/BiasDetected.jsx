/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 18, 2025
 * Purpose: Bias Detected text to be displayed when bias is detected on BiasReview page
 */

function BiasDetected({ biasState }) {
  if (!biasState) return null;
  return (
    <div className={`text-3xl tracking-tight text-center text-pink-500`}>
      <span className="font-bold">Bias Detected</span>
    </div>
  );
}

export default BiasDetected;
