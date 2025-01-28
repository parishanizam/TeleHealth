function TempMediaPlayer() {
  return (
    <div className="flex gap-6 items-center text-4xl tracking-tight leading-[48px] min-h-[300px] min-w-[200px] w-[600px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d56a357d7e43e7485ae4cc03db41eb5376d99fedd1f8802d50421974d1be262?apiKey=a65563d9d7d64b678f9f6025a688ee39&"
        alt="Bias detection visualization"
        className="object-contain self-stretch my-auto aspect-[1.12] min-w-[200px] w-[400px] max-md:max-w-full"
      />
      <div className="flex flex-col justify-center self-stretch my-auto min-w-[200px] w-[200px] max-md:max-w-full">
      </div>
    </div>
  );
}

export default TempMediaPlayer;
