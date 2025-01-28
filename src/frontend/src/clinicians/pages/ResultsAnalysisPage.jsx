import { Header } from "../components/Header";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import ResultsList from "../components/ResultsAnalysis/ResultsList";

function ResultsAnalysisPage() {
  return (
    <div className="flex flex-col justify-center items-center  px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title="Mitchell Weingust - January 3, 2025" />

      {/* Main container to align both sections properly */}
      <div className="flex flex-row w-full items-center justify-between gap-4 mt-36 ">
        
        {/* Video Player Section - slightly increased size */}
        <div className="w-2/3 flex justify-center mt-44">
          <TempMediaPlayer />
        </div>

        {/* Results Section - now properly aligned */}
        <div className="w-2/3 flex justify-center ">
          <ResultsList />
        </div>

      </div>
    </div>
  );
}

export default ResultsAnalysisPage;
