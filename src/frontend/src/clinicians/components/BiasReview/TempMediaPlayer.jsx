/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 18, 2025
 * Purpose: (Temporary) Media Player to display video assessment information on BiasReview page
 */

function TempMediaPlayer({ videoUrl }) {
  const handleVideoError = (e) => {
    console.error("Video error event:", e);
    console.error("Native event:", e.nativeEvent);
    console.error("Event target:", e.target);

    if (e.target && e.target.error) {
      console.error("Video error details:", e.target.error);
    }
  };

  if (!videoUrl) {
    return <p className="text-center text-gray-500">No video available.</p>;
  }

  return (
    <div className="w-full max-w-2xl">
      <video controls className="w-full" onError={handleVideoError}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default TempMediaPlayer;
