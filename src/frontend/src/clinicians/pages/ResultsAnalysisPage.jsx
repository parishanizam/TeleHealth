import { Header } from "../components/Header";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import ResultsList from "../components/ResultsAnalysis/ResultsList";

function ResultsAnalysisPage() {
  return (
    <div>
      <Header title="Mitchell Weingust - January 3, 2025" />
      
      <div className="flex space-x-4"> 
        <div className="flex-1">
          <TempMediaPlayer />
        </div>

        <div className="flex-1">
          <ResultsList />
        </div>
      </div>
    </div>
  );
}

export default ResultsAnalysisPage;
