function TempMediaPlayer({ videoUrl }) {
  if (!videoUrl) {
    return <p className="text-center text-gray-500">No video available.</p>;
  }

  return (
    <div className="w-full max-w-2xl">
      <video
        controls
        className="w-full"
        onError={(e) => console.error("Video error:", e)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default TempMediaPlayer;
