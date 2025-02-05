import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import ResultsList from "../components/ResultsAnalysis/ResultsList";
import { formatDate } from "../../utils/dateUtils";

function ResultsAnalysisPage() {
  const location = useLocation();
  const { date, firstName, lastName, assessmentId, parentUsername } = location.state || {}; 
  const [videoUrl, setVideoUrl] = useState("");
  const [results, setResults] = useState([]);
  const [questionBankId, setQuestionBankId] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!firstName || !lastName || !assessmentId || !parentUsername) return;
  
    setFormattedDate(formatDate(date));

    const fetchResultsAndVideo = async () => {
      try {
        setLoading(true);
  
        // 🔹 Fetch assessment results from Results Service
        const resultsApiUrl = `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}`;
        const resultsResponse = await axios.get(resultsApiUrl);
        
        if (!resultsResponse.data || !resultsResponse.data.results) {
          setError("No results found for this assessment.");
          return;
        }

        const rawResults = resultsResponse.data.results;
        const fetchedQuestionBankId = resultsResponse.data.questionBankId;
        setQuestionBankId(fetchedQuestionBankId);

        // 🔹 Extract language & test type from `questionBankId`
        const [language, testType] = fetchedQuestionBankId.split("-");

        // 🔹 Fetch correct answers for each question
        const questionPromises = rawResults.map(async (result) => {
          const questionRes = await axios.get(
            `http://localhost:3000/questions/${language}/${testType}/${result.question_id}`
          );
          return { 
            ...result, 
            correctAnswer: questionRes.data.correctAnswer,  // Add correct answer to object
            status: result.user_answer === questionRes.data.correctAnswer ? "correct" : "incorrect" 
          };
        });

        const updatedResults = await Promise.all(questionPromises);
        setResults(updatedResults);
  
        // 🔹 Fetch video URL from Media Service
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
      <Header title={`${firstName} ${lastName} - ${formattedDate}`} />

      <div className="flex flex-row w-full items-center justify-between gap-4 mt-16 ">

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
          {/* 🔹 Pass updated results with correct statuses */}
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
