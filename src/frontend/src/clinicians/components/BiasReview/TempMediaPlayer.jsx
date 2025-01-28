function TempMediaPlayer() {
  return (
    <div className="flex items-center justify-center w-full max-w-lg bg-gray-200 rounded-lg p-4">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d56a357d7e43e7485ae4cc03db41eb5376d99fedd1f8802d50421974d1be262?apiKey=a65563d9d7d64b678f9f6025a688ee39&"
        alt="Bias detection visualization"
        className="object-cover w-full max-h-[500px] rounded-md"
      />
    </div>
  );
}

export default TempMediaPlayer;
