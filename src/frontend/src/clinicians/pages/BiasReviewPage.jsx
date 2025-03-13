import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import BiasDetected from "../components/BiasReview/BiasDetected";
import QuestionAnswers from "../components/BiasReview/QuestionAnswers";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import RemoveBiasButton from "../components/BiasReview/RemoveBiasButton";
import VolumeButton from "../../assets/volumebutton.svg";
import { formatDate } from "../../utils/dateUtils";
import { formatTestTitle } from "../../utils/testTitleUtils";

function BiasReviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

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
    bias_state,
    mark_state,
    results = [],
    questionIds = [],
    currentIndex = 0,
    totalQuestions = 1
  } = state || {};

  console.log("Page state:", state);

  const [question, setQuestion] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState(""); // for repetition question audio answers
  const [biasTimestamps, setBiasTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [biasState, setBiasState] = useState(bias_state || false);
  const [markState, setMarkState] = useState(mark_state || "Undetermined");
  const [isBiasDropdownOpen, setIsBiasDropdownOpen] = useState(false);

  // check for missing data
  useEffect(() => {
    if (!questionId || !questionBankId || !parentUsername || !assessmentId) {
      setError("Missing necessary data for review.");
      return;
    }

    const fetchQuestionAndMedia = async () => {
      try {
        setLoading(true);
        console.log("Fetching question and media...");

        // 1) Parse language/test type
        const [language, testType] = questionBankId.split("-");

        // 2) Fetch the question data
        const questionRes = await axios.get(
          `http://localhost:3000/questions/${language}/${testType}/${questionId}`
        );
        if (!questionRes.data) {
          setError("Question not found.");
          return;
        }
        setQuestion(questionRes.data);

        // 3) Fetch the result data (bias_state, mark_state, etc.)
        const resultRes = await axios.get(
          `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}`
        );
        console.log("Result response:", resultRes.data);

        const initialMarkState = resultRes.data?.mark_state || "Undetermined";
        const initialBiasState = !!resultRes.data?.bias_state;
        setMarkState(initialMarkState);
        setBiasState(initialBiasState);

        // 4) Fetch the presigned video URL & raw ML bias from /media
        const dateObj = date ? new Date(date) : new Date();
        const dateStr = dateObj.toISOString().slice(2, 10).replace(/-/g, "");
        const folderName = `${dateStr}_${language.toLowerCase()}_${testType.toLowerCase()}_${assessmentId}`;

        const mediaRes = await axios.get(
          `http://localhost:3000/media/${parentUsername}/${folderName}/${assessmentId}`
        );
        setVideoUrl(mediaRes.data.presignedUrl);
        setBiasTimestamps(mediaRes.data.bias || []);

        // Fetch repetition audio file URL if test type is repetition
        if (testType.toLowerCase() === "repetition") {
          try {
            const audioRes = await axios.get(
              `http://localhost:3000/media/${parentUsername}/${folderName}/question_${questionNumber}.mp4`
            );
            setAudioUrl(audioRes.data.presignedUrl);
          } catch (audioError) {
            console.error("Error fetching audio file:", audioError);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load bias review data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndMedia();
  }, [questionId, questionBankId, parentUsername, assessmentId, date, questionNumber]);

  // ─────────────────────────────────────────────────────────
  //   BIAS TOGGLE
  // ─────────────────────────────────────────────────────────
  const toggleBiasState = async () => {
    const newState = !biasState;
    console.log("Toggling bias state:", newState);
    setBiasState(newState);

    const payload = {
      question_id: questionId,
      user_answer: userAnswer,
      bias_state: newState,
      mark_state: markState,
    };

    try {
      const saveResponse = await axios.post(
        `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}/bias`,
        payload
      );
      console.log("✅ Bias state updated successfully! Response:", saveResponse.data);
    } catch (error) {
      console.error("❌ Error saving bias modification:", error);
    }
  };

  const changeMarkState = async (newMarkState) => {
    console.log("Changing mark state to:", newMarkState);
    setMarkState(newMarkState);

    const payload = {
      question_id: questionId,
      user_answer: userAnswer,
      bias_state: biasState,
      mark_state: newMarkState,
    };

    try {
      const saveResponse = await axios.post(
        `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}/mark`,
        payload
      );
      console.log("✅ Mark state updated successfully! Response:", saveResponse.data);
    } catch (error) {
      console.error("❌ Error saving mark state:", error);
    }
  };

  // adjust timestamp format
  const formattedBias = biasTimestamps.map((bias) => ({
    ...bias,
    timestamp: (bias.timestamp / 1000).toFixed(2),
  }));

  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // navigation between questions (previous, next, back to overall results)
  const goToPreviousQuestion = () => {
    if (!isFirstQuestion) {
      const prevIndex = currentIndex - 1;
      const prevQuestion = results[prevIndex];

      navigate("/clinicians/BiasReviewPage", {
        state: {
          ...state,
          questionId: questionIds[prevIndex],
          questionNumber: prevIndex + 1,
          currentIndex: prevIndex,
          userAnswer: prevQuestion.user_answer,
          bias_state: prevQuestion.bias_state,
          mark_state: prevQuestion.mark_state
        },
      });
    }
  };

  const goToNextQuestion = () => {
    if (!isLastQuestion) {
      const nextIndex = currentIndex + 1;
      const nextQuestion = results[nextIndex];

      navigate("/clinicians/BiasReviewPage", {
        state: {
          ...state,
          questionId: questionIds[nextIndex],
          questionNumber: nextIndex + 1,
          currentIndex: nextIndex,
          userAnswer: nextQuestion.user_answer,
          bias_state: nextQuestion.bias_state,
          mark_state: nextQuestion.mark_state
        },
      });
    }
  };

  const goBackToResults = () => {
    navigate("/clinicians/ResultsAnalysisPage", {
      state: {
        parentUsername,
        assessmentId,
        date,
        firstName,
        lastName
      },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-5 bg-white">
      <Header
        title={`${firstName || "Unknown"} ${lastName || ""} - ${formatDate(date) || "No Date"}`}
      />
      <div className="flex items-center justify-center space-x-4 mt-4">
        <span className="text-4xl tracking-tight text-center text-black leading-[64px]">
          Question {questionNumber}
        </span>
      </div>

      <div className="flex items-center space-x-3 text-2xl mt-2">
        <span>{formatTestTitle(questionBankId) || "Unknown"}</span>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={goBackToResults}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          Return to Results
        </button>

        <button
          onClick={goToPreviousQuestion}
          disabled={isFirstQuestion}
          className={`px-4 py-2 rounded ${
            isFirstQuestion ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold`}
        >
          Back
        </button>
        <button
          onClick={goToNextQuestion}
          disabled={isLastQuestion}
          className={`px-4 py-2 rounded ${
            isLastQuestion ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold`}
        >
          Next
        </button>
      </div>

      <div className="flex w-full max-w-4xl items-center justify-between mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="w-1/2 flex flex-col justify-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <BiasDetected biasState={biasState} />
          </div>

          {/* Video Recording Display */}
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

          {/* Bias Dropdown */}
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
                    <div className="overflow-auto max-h-40">
                      <ul className="list-disc list-inside">
                        {formattedBias.map((bias, index) => (
                          <li key={index} className="py-1">
                            <strong>⏳ {bias.timestamp}s</strong> - {bias.keyword}
                            <span className="text-gray-500">
                              {" "} (Faces Detected: {bias.faceCount})
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

        {/* Question Id and Audio */}
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
                className="object-contain w-8 h-8 cursor-pointer"
              />
            )}
          </div>

          {/* Answer Audio */}
          {questionBankId.toLowerCase().includes("repetition") && audioUrl && (
            <div className="mt-4 text-center inline-block p-2 bg-white rounded-xl">
              <p className="mb-2 text-lg font-medium">Submitted answer</p>
              <div className="p-2 flex justify-center">
                <audio
                  controls
                  preload="auto"
                  crossOrigin="anonymous"
                  onLoadedMetadata={(e) =>
                    console.log("Loaded metadata, duration:", e.target.duration)
                  }
                  onError={(e) => console.error("Audio playback error:", e.target.error)}
                >
                  <source src={audioUrl} type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}

          {/* Question Marking Options */}
          {loading ? (
            <p>Loading answers...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <QuestionAnswers
              question={question}
              userAnswer={userAnswer}
              markState={markState}
              changeMarkState={changeMarkState}
            />
          )}
        </div>
      </div>

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
