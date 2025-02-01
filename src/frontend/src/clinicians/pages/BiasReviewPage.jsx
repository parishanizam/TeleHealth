import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import BiasDetected from "../components/BiasReview/BiasDetected";
import QuestionAnswers from "../components/BiasReview/QuestionAnswers";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import RemoveBiasButton from "../components/BiasReview/RemoveBiasButton";

function BiasReviewPage() {
  const { state } = useLocation();
  const { questionId, userAnswer, questionBankId, date, firstName, lastName, parentUsername, assessmentId } = state || {};

  const [question, setQuestion] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [biasTimestamps, setBiasTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🔹 FIXED: Explicitly check if `questionId` is `undefined` or `null` instead of relying on falsy check
    if (questionId === undefined || questionId === null || questionBankId === undefined || parentUsername === undefined || assessmentId === undefined) {
      setError("Missing necessary data for review.");
      return;
    }

    const fetchQuestionAndMedia = async () => {
      try {
        setLoading(true);

        // 🔹 Extract language & test type from `questionBankId`
        const [language, testType] = questionBankId.split("-");

        // 🔹 Fetch Question from Question Service
        const questionRes = await axios.get(
          `http://localhost:3000/questions/${language}/${testType}/${questionId}`
        );

        if (!questionRes.data) {
          setError("Question not found.");
          return;
        }

        setQuestion(questionRes.data);

        // 🔹 Fetch Video from Media Service
        const mediaRes = await axios.get(`http://localhost:3000/media/${parentUsername}/${assessmentId}`);
        setVideoUrl(mediaRes.data.presignedUrl);
        setBiasTimestamps(mediaRes.data.bias || []);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load bias review data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndMedia();
  }, [questionId, questionBankId, parentUsername, assessmentId]);

  return (
    <div className="flex flex-col items-center min-h-screen px-5 bg-white">
      <Header title={`${firstName || "Unknown"} ${lastName || ""} - ${questionBankId || "Unknown"} - ${date || "No Date"}`} />

      <div className="text-center mt-4">
        <BiasDetected biasState={biasTimestamps.length > 0} />
      </div>

      {/* Video + Answer Section */}
      <div className="flex w-full max-w-4xl items-center justify-between mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        {/* Video Section */}
        <div className="w-1/2 flex flex-col justify-center">
          {loading ? <p>Loading video...</p> : error ? <p className="text-red-500">{error}</p> : <TempMediaPlayer videoUrl={videoUrl} />}
          
          {/* 🔹 Bias Info Below Video */}
          <div className="mt-4 text-center text-lg">
            {biasTimestamps.length > 0 ? (
              <div className="text-red-500">
                <strong>Bias Detected at:</strong> {biasTimestamps.map(bias => `${bias.timestamp}ms`).join(", ")}
              </div>
            ) : (
              <p className="text-green-600">No Bias Detected</p>
            )}
          </div>
        </div>

        {/* Answer Section */}
        <div className="w-1/2 flex flex-col items-center space-y-4">
          {loading ? <p>Loading answers...</p> : error ? <p className="text-red-500">{error}</p> : <QuestionAnswers question={question} userAnswer={userAnswer} />}
        </div>
      </div>

      {/* Remove Bias Button */}
      <div className="w-full flex justify-end pr-10 pb-10">
        <RemoveBiasButton
          onClick={() => console.log("Bias removed")}
          buttonText="Remove Bias"
          isBiasDetected={biasTimestamps.length > 0}
        />
      </div>
    </div>
  );
}

export default BiasReviewPage;
