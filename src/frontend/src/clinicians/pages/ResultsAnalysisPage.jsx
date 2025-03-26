import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../parents/components/Header";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import ResultsList from "../components/ResultsAnalysis/ResultsList";
import { formatDate } from "../../utils/dateUtils";
import { formatTestTitle } from "../../utils/testTitleUtils";
import PreviousPageButton from "../components/ResultsAnalysis/PreviousPageButton";

function ResultsAnalysisPage() {
  const location = useLocation();
  const {
    date,
    firstName,
    lastName,
    assessmentId,
    parentUsername,
    score: initialScore = null, 
    clientId,
    securityCode,
  } = location.state || {};

  const [videoUrl, setVideoUrl] = useState("");
  const [results, setResults] = useState([]);
  const [questionBankId, setQuestionBankId] = useState("");
  const [score, setScore] = useState(initialScore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [biaslength, setBiaslength] = useState();


  const [videoExists, setVideoExists] = useState(false);

  useEffect(() => {
    if (!videoUrl) {
      setVideoExists(false);
      return;
    }
  
    const video = document.createElement('video');
    video.src = videoUrl;
    video.preload = 'metadata';
  
    video.onloadedmetadata = () => {
      if (video.duration > 0 && !isNaN(video.duration)) {
        setVideoExists(true);
      } else {
        setVideoExists(false);
      }
    };
  
    video.onerror = () => {
      setVideoExists(false);
    };
  }, [videoUrl]);

  useEffect(() => {
    if (!firstName || !lastName || !assessmentId || !parentUsername) return;
    setFormattedDate(formatDate(date));

    const fetchResultsAndVideo = async () => {
      try {
        setLoading(true);

        // 1) Fetch assessment results
        const resultsApiUrl = `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}`;
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
        const totalQuestions = rawResults.length;
        let updatedResults = [];

        if (testType === "repetition") {
          // Check if test is still being marked
          const isStillBeingMarked = rawResults.some(
            (q) => q.mark_state === "Undetermined"
          );
          if (isStillBeingMarked) {
            setScore("Test is being evaluated...");
          } else {
            correctAnswers = rawResults.filter(
              (q) => q.mark_state === "Correct"
            ).length;
            setScore(
              totalQuestions > 0
                ? Math.round((correctAnswers / totalQuestions) * 100)
                : 0
            );
          }
          updatedResults = rawResults;
        } else {
          // For other test types
          const questionPromises = rawResults.map(async (result) => {
            const questionRes = await axios.get(
              `http://localhost:3000/questions/${language}/${testType}/${result.question_id}`
            );
            return {
              ...result,
              correctAnswer: questionRes.data.correctAnswer,
              status:
                result.user_answer === questionRes.data.correctAnswer
                  ? "correct"
                  : "incorrect",
            };
          });
          updatedResults = await Promise.all(questionPromises);
          correctAnswers = updatedResults.filter(
            (q) => q.status === "correct"
          ).length;

          // ALWAYS recalc the score, ignoring initialScore
          setScore(
            totalQuestions > 0
              ? Math.round((correctAnswers / totalQuestions) * 100)
              : 0
          );
        }

        setResults(updatedResults);

        // 2) Fetch the video
        const dateObj = date ? new Date(date) : new Date();
        const dateStr = dateObj.toISOString().slice(2, 10).replace(/-/g, "");
        const folderName = `${dateStr}_${language.toLowerCase()}_${testType.toLowerCase()}_${assessmentId}`;

        const videoApiUrl = `http://localhost:3000/media/${parentUsername}/${folderName}/${assessmentId}`;
        const videoResponse = await axios.get(videoApiUrl);
        setBiaslength(videoResponse.data.length);

        let videoFile = videoResponse.data.videoFile;
        if (videoFile.endsWith(".mp4.mp4")) {
          videoFile = videoFile.replace(".mp4.mp4", ".mp4");
        }
        setVideoUrl(videoResponse.data.presignedUrl);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch assessment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchResultsAndVideo();
  }, [
    firstName,
    lastName,
    assessmentId,
    parentUsername,
    date,
  ]);

  return (
    <div className="bg-white">
      <Header
        title={`${firstName} ${lastName} - Results`}
        role="clinician"
      />

      {/* Info + Back Button */}
      <div className="flex justify-between items-center px-6 mt-4">
        <div>
          <h2 className="text-3xl font-bold">
            {formatTestTitle(questionBankId)}
          </h2>
          <p className="text-2xl font-medium">
            {formatDate(date)}
          </p>
          <p className="text-2xl font-medium">
            Score: {typeof score === "number" ? `${score}%` : score}
          </p>
        </div>

        <PreviousPageButton
          clientId={clientId}
          parentUsername={parentUsername}
          firstName={firstName}
          lastName={lastName}
          securityCode={securityCode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to ClientOverview
        </PreviousPageButton>
      </div>

      {/* Main content row: video + question list */}
      <div className="flex w-full justify-center items-start gap-6 px-6 mt-6">
        {/* Left side: video */}
        <div className="flex-1">
          {loading ? (
            <p>Loading video...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            videoExists ? (
              <TempMediaPlayer videoUrl={videoUrl} />
            ) : (
              <div className="flex justify-center items-center h-[500px]">
                <p className="text-gray-500 text-center text-xl">Video not available due to consent decline.</p>
              </div>
            )
          )}
        </div>

        {/* Right side: question list */}
        <div className="flex-1 border border-gray-200 rounded-lg p-4 flex flex-col">
          <div className="flex-1 overflow-auto flex flex-col items-center">
            <ResultsList
              results={results}
              questionBankId={questionBankId}
              parentUsername={parentUsername}
              assessmentId={assessmentId}
              firstName={firstName}
              lastName={lastName}
              clientId={clientId}
              securityCode={securityCode}
              date={date}
              score={score}
              bias_length={biaslength}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsAnalysisPage;
