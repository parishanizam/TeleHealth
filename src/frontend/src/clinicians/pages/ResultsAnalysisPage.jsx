import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import ResultsList from "../components/ResultsAnalysis/ResultsList";

function ResultsAnalysisPage() {
  const location = useLocation();
  const { date, firstName, lastName, assessmentId, parentUsername } = location.state || {}; 
  const [videoUrl, setVideoUrl] = useState("");
  const [results, setResults] = useState([]);
  const [questionBankId, setQuestionBankId] = useState(""); // 🔹 Ensure questionBankId is stored
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 🔹 Needed for navigation to BiasReviewPage

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
        setQuestionBankId(resultsResponse.data.questionBankId); // 🔹 Save questionBankId from API response
  
        // 🔹 Fetch video URL from media service
        const videoApiUrl = `http://localhost:3000/media/${parentUsername}/${assessmentId}`;
        const videoResponse = await axios.get(videoApiUrl);
  
        let videoFile = videoResponse.data.videoFile;
        if (videoFile.endsWith(".mp4.mp4")) {
          videoFile = videoFile.replace(".mp4.mp4", ".mp4");
        }
  
        setVideoUrl(videoResponse.data.presignedUrl);
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
      <Header title={`${firstName} ${lastName} - ${date}-assignment-${assessmentId}`} />

      <div className="flex flex-row w-full items-center justify-between gap-4 mt-36 ">
        
        {/* 🔹 Video Player Section */}
        <div className="w-2/3 flex justify-center mt-44">
          {loading ? (
            <p>Loading video...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <TempMediaPlayer videoUrl={videoUrl} />
          )}
        </div>

        <div className="w-2/3 flex justify-center">
          {/* 🔹 Ensure questionBankId is passed to ResultsList */}
          <ResultsList 
            results={results} 
            questionBankId={questionBankId} 
            parentUsername={parentUsername} 
            assessmentId={assessmentId} 
            firstName={firstName} 
            lastName={lastName} 
            date={date} 
          />
        </div>

      </div>
    </div>
  );
}

export default ResultsAnalysisPage;
