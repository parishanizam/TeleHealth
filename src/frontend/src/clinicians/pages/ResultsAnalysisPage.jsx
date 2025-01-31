import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import ResultsList from "../components/ResultsAnalysis/ResultsList";

function ResultsAnalysisPage() {
  const location = useLocation();
  const { date, firstName, lastName, assessmentId, questionBankId, parentUsername } = location.state || {}; 
  const [videoUrl, setVideoUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!firstName || !lastName || !assessmentId || !parentUsername) return;
  
    const fetchResultsAndVideo = async () => {
      try {
        setLoading(true);
  
        // 🔹 Fetch assessment results from the results service
        const resultsApiUrl = `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}`;
        const resultsResponse = await axios.get(resultsApiUrl);
        if (!resultsResponse.data || !resultsResponse.data.results) {
          setError("No results found for this assessment.");
          return;
        }
        setResults(resultsResponse.data.results);
  
        // 🔹 Fetch video URL from media service
        const videoApiUrl = `http://localhost:3000/media/${parentUsername}/${assessmentId}`;
        const videoResponse = await axios.get(videoApiUrl);
  
        let videoFile = videoResponse.data.videoFile;
  
        // 🔹 Fix filename if it has an extra ".mp4"
        if (videoFile.endsWith(".mp4.mp4")) {
          videoFile = videoFile.replace(".mp4.mp4", ".mp4");
        }
  
        // 🔹 Set correct video URL
        setVideoUrl(videoResponse.data.presignedUrl);
        console.log("Corrected Video URL:", videoResponse.data.presignedUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch assessment details.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchResultsAndVideo();
  }, [firstName, lastName, assessmentId, parentUsername]);

  return (
    <div className="flex flex-col justify-center items-center px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title={`${firstName} ${lastName} - ${date}`} />

      <div className="flex flex-row w-full items-center justify-between gap-4 mt-36 ">
        
        {/* 🔹 Video Player Section - Debugging added */}
        <div className="w-2/3 flex justify-center mt-44">
          {loading ? (
            <p>Loading video...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <TempMediaPlayer videoUrl={videoUrl} />
          )}
        </div>

        <div className="w-2/3 flex justify-center ">
        <ResultsList results={results} questionBankId={questionBankId} />
        </div>

      </div>
    </div>
  );
}

export default ResultsAnalysisPage;
