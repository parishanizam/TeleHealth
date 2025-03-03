import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import ResultsList from "../components/ResultsAnalysis/ResultsList";
import { formatDate } from "../../utils/dateUtils";

function ResultsAnalysisPage() {
  const location = useLocation();
  const { date, firstName, lastName, assessmentId, parentUsername, score: initialScore = null } = location.state || {}; 

  const [videoUrl, setVideoUrl] = useState("");
  const [results, setResults] = useState([]);
  const [questionBankId, setQuestionBankId] = useState(""); 
  const [score, setScore] = useState(initialScore); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [biaslength, setBiaslenght] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!firstName || !lastName || !assessmentId || !parentUsername) return;
  
    setFormattedDate(formatDate(date));

    const fetchResultsAndVideo = async () => {
      try {
        setLoading(true);
  
        // 🔹 Fetch assessment results from Results Service
        const resultsApiUrl = `https://telehealth-insights.onrender.com/resultstorage/results/${parentUsername}/${assessmentId}`;
        const resultsResponse = await axios.get(resultsApiUrl);
        
        if (!resultsResponse.data || !resultsResponse.data.results) {
          setError("No results found for this assessment.");
          return;
        }

        const rawResults = resultsResponse.data.results;
        const fetchedQuestionBankId = resultsResponse.data.questionBankId;
        setQuestionBankId(fetchedQuestionBankId);

        const [language, testType] = fetchedQuestionBankId.split("-");

        let correctAnswers = 0;
        let totalQuestions = rawResults.length;
        let updatedResults = [];

        if (testType === "repetition") {
          // For "repetition" tests, check mark_state
          const isStillBeingMarked = rawResults.some(q => q.mark_state === "Undetermined");

          if (isStillBeingMarked) {
            setScore("Test is being evaluated...");
          } else {
            correctAnswers = rawResults.filter((q) => q.mark_state === "Correct").length;
            setScore(totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0);
          }

          updatedResults = rawResults; // Keep results for UI display
        } else {
          // Fetch correct answers for other test types
          const questionPromises = rawResults.map(async (result) => {
            const questionRes = await axios.get(
              `https://telehealth-insights.onrender.com/questions/${language}/${testType}/${result.question_id}`
            );
            return { 
              ...result, 
              correctAnswer: questionRes.data.correctAnswer,  
              status: result.user_answer === questionRes.data.correctAnswer ? "correct" : "incorrect" 
            };
          });

          updatedResults = await Promise.all(questionPromises);
          correctAnswers = updatedResults.filter((q) => q.status === "correct").length;

          if (initialScore === null) {
            setScore(totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0);
          }
        }

        setResults(updatedResults); // ✅ Ensures UI gets updated with results

        const dateObj = date ? new Date(date) : new Date();
        const dateStr = dateObj.toISOString().slice(2, 10).replace(/-/g, "");
        const folderName = `${dateStr}_${language.toLowerCase()}_${testType.toLowerCase()}_${assessmentId}`;

        // 🔹 Fetch video URL from Media Service.
        const videoApiUrl = `https://telehealth-insights.onrender.com/media/${parentUsername}/${folderName}/${assessmentId}`;
        const videoResponse = await axios.get(videoApiUrl);
        setBiaslenght(videoResponse.data.length)
  
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
  }, [firstName, lastName, assessmentId, parentUsername, initialScore]);

  return (
    <div className="flex flex-col justify-center items-center px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title={`${firstName} ${lastName} - ${formattedDate}`} />

      <div className="flex flex-row w-full items-center justify-between gap-4 mt-16 ">
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
          <ResultsList 
            results={results} 
            questionBankId={questionBankId} 
            parentUsername={parentUsername} 
            assessmentId={assessmentId} 
            firstName={firstName} 
            lastName={lastName} 
            date={date} 
            score={score}
            bias_length={biaslength}
          />
        </div>

      </div>
    </div>
  );
}

export default ResultsAnalysisPage;
