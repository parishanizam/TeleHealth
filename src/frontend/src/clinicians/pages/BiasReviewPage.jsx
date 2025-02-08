import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import BiasDetected from "../components/BiasReview/BiasDetected";
import QuestionAnswers from "../components/BiasReview/QuestionAnswers";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import RemoveBiasButton from "../components/BiasReview/RemoveBiasButton";
import VolumeButton from "../../assets/volumebutton.svg"; // 🔹 Speaker Icon
import { formatDate } from "../../utils/dateUtils";
import { formatTestTitle } from "../../utils/testTitleUtils";

function BiasReviewPage() {
  const { state } = useLocation();
  const {
    questionId,
    questionNumber,
    userAnswer,
    questionBankId,
    date,
    firstName,
    lastName,
    parentUsername,
    assessmentId,
  } = state || {};

  const [question, setQuestion] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [biasTimestamps, setBiasTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [biasState, setBiasState] = useState(false);
  const [isBiasDropdownOpen, setIsBiasDropdownOpen] = useState(false);

  useEffect(() => {
    if (
      questionId === undefined ||
      questionId === null ||
      questionBankId === undefined ||
      parentUsername === undefined ||
      assessmentId === undefined
    ) {
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
        const mediaRes = await axios.get(
          `http://localhost:3000/media/${parentUsername}/${assessmentId}`
        );

        console.log("📌 Media API Response:", mediaRes.data); // 🔹 Debugging log

        setVideoUrl(mediaRes.data.presignedUrl);
        setBiasTimestamps(mediaRes.data.bias || []);
        setBiasState(mediaRes.data.bias.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load bias review data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndMedia();
  }, [questionId, questionBankId, parentUsername, assessmentId]);

  const toggleBiasState = () => {
    setBiasState((prev) => !prev);
  };

  // Convert bias timestamps to seconds
  const formattedBias = biasTimestamps.map((bias) => ({
    ...bias,
    timestamp: (bias.timestamp / 1000).toFixed(2), // Convert to seconds
  }));

  return (
    <div className="flex flex-col items-center min-h-screen px-5 bg-white">
      <Header
        title={`${firstName || "Unknown"} ${lastName || ""} - ${
          formatDate(date) || "No Date"
        }`}
      />

      <div className="flex items-center justify-center space-x-4 mt-4">
        {/* Question Number */}
        <span className="text-4xl tracking-tight text-center text-black leading-[64px] max-md:max-w-full max-md:text-4xl">
          Question {questionNumber}
        </span>
      </div>

      {/* Language - Test Type */}
      <div className="flex items-center space-x-3 text-2xl mt-2">
        <span>{formatTestTitle(questionBankId) || "Unknown"}</span>
      </div>

      {/* Video + Answer Section */}
      <div className="flex w-full max-w-4xl items-center justify-between mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        {/* Video Section */}
        <div className="w-1/2 flex flex-col justify-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <BiasDetected biasState={biasState} />
          </div>

          {loading ? (
            <p>Loading video...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <TempMediaPlayer
              videoUrl={videoUrl}
              biasTimestamps={biasTimestamps}
            />
          )}

          {/* 🔹 Bias Dropdown */}
          <div className="mt-4 text-center text-lg">
            {biasState ? (
              <div className="text-red-500">
                <button
                  className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsBiasDropdownOpen(!isBiasDropdownOpen)}
                >
                  {isBiasDropdownOpen ? "Hide Bias List ⬆" : "Show Bias List ⬇"}
                </button>

                {isBiasDropdownOpen && (
                  <div className="mt-2 border border-gray-300 rounded-lg p-3 bg-white shadow-md">
                    <p className="font-bold mb-2">Bias Detected:</p>

                    {/* Scrollable List (Max 4 items at a time) */}
                    <div className="overflow-auto max-h-40">
                      <ul className="list-disc list-inside">
                        {formattedBias.map((bias, index) => (
                          <li key={index} className="py-1">
                            <strong>⏳ {bias.timestamp}s</strong> -{" "}
                            {bias.keyword}
                            <span className="text-gray-500">
                              {" "}
                              (Faces Detected: {bias.faceCount})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-green-600">No Bias Detected</p>
            )}
          </div>
        </div>

        {/* Answer Section */}
        <div className="w-1/2 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white border border-black rounded-xl">
            <div className="text-xl font-semibold text-gray-700">
              <p>Question ID: {questionId}</p>
            </div>

            {question?.sound && (
              <img
                src={VolumeButton}
                alt="Play Sound"
                onClick={() => new Audio(question.sound).play()}
                className="object-contain w-8 h-8 cursor-pointer hover:shadow-md"
              />
            )}
          </div>

          {loading ? (
            <p>Loading answers...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <QuestionAnswers question={question} userAnswer={userAnswer} />
          )}
        </div>
      </div>

      {/* Remove Bias Button */}
      <div className="w-full flex justify-end pr-10 pb-10">
        <RemoveBiasButton
          onClick={toggleBiasState}
          isBiasDetected={biasState}
        />
      </div>
    </div>
  );
}

export default BiasReviewPage;
