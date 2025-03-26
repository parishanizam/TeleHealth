// BiasReviewPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../../parents/components/Header";
import BiasDetected from "../components/BiasReview/BiasDetected";
import QuestionAnswers from "../components/BiasReview/QuestionAnswers";
import TempMediaPlayer from "../components/BiasReview/TempMediaPlayer";
import RemoveBiasButton from "../components/BiasReview/RemoveBiasButton";
import VolumeButton from "../../assets/volumebutton.svg";
import { formatDate } from "../../utils/dateUtils";
import { formatTestTitle } from "../../utils/testTitleUtils";
import ReturnToResultsButton from "../components/BiasReview/ReturnToResultsButton";

function BiasReviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Destructure everything you might need from location.state
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
    totalQuestions = 1,
    notes = "",
    clientId,
    securityCode,
  } = state || {};

  const [question, setQuestion] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [biasTimestamps, setBiasTimestamps] = useState([]);
  const [historyTimestamps, setHistoryTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [biasState, setBiasState] = useState("Undetermined");
  const [markState, setMarkState] = useState(mark_state || "Undetermined");
  const [notesText, setNotesText] = useState(notes || "");

  // 1) Fetch assessment history file (optional)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/media/history/${parentUsername}`
        );
        const historyData = res.data;
        if (historyData && historyData.assessmentVideos) {
          const currentAssessment = historyData.assessmentVideos.find(
            (a) => a.assessmentId.toString() === assessmentId.toString()
          );
          if (currentAssessment && currentAssessment.timestamps) {
            setHistoryTimestamps(currentAssessment.timestamps);
          }
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, [parentUsername, assessmentId]);

  // 2) Derive the displayed timestamp for this question
  const displayTimestamp =
    questionNumber === 1
      ? "00:00"
      : historyTimestamps && historyTimestamps.length >= questionNumber - 1
        ? historyTimestamps[questionNumber - 2].timestamp
        : "00:00";

  // 3) If necessary data is missing, show error
  useEffect(() => {
    if (!questionId || !questionBankId || !parentUsername || !assessmentId) {
      setError("Missing necessary data for review.");
      return;
    }

    const fetchQuestionAndMedia = async () => {
      try {
        setLoading(true);

        const [language, testType] = questionBankId.split("-");

        // Fetch question data
        const questionRes = await axios.get(
          `http://localhost:3000/questions/${language}/${testType}/${questionId}`
        );
        if (!questionRes.data) {
          setError("Question not found.");
          return;
        }
        setQuestion(questionRes.data);

        // Fetch result data
        const resultRes = await axios.get(
          `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}`
        );
        const initialMarkState = resultRes.data?.mark_state || "Undetermined";
        const initialBiasState =
          resultRes.data?.bias_state ??
          (mediaRes.data?.bias?.length > 0 ? true : "Undetermined");
        const initialNotes = resultRes.data?.notes || "";
        setMarkState(initialMarkState);
        setBiasState(initialBiasState);
        setNotesText(initialNotes);

        // Fetch media (video + bias timestamps)
        const dateObj = date ? new Date(date) : new Date();
        const dateStr = dateObj.toISOString().slice(2, 10).replace(/-/g, "");
        const folderName = `${dateStr}_${language.toLowerCase()}_${testType.toLowerCase()}_${assessmentId}`;

        const mediaRes = await axios.get(
          `http://localhost:3000/media/${parentUsername}/${folderName}/${assessmentId}`
        );
        setVideoUrl(mediaRes.data.presignedUrl);
        setBiasTimestamps(mediaRes.data.bias || []);

        // If repetition, fetch the user's audio for this question
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
  }, [
    questionId,
    questionBankId,
    parentUsername,
    assessmentId,
    date,
    questionNumber,
  ]);

  // Toggling bias
  const toggleBiasState = async () => {
    let newState;
    if (biasState === "Undetermined") {
      newState = true;
    } else if (biasState === true) {
      newState = false;
    } else {
      newState = true;
    }
    setBiasState(newState);

    const payload = {
      question_id: questionId,
      user_answer: userAnswer,
      bias_state: newState,
      mark_state: markState,
      notes: notesText,
    };

    try {
      await axios.post(
        `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}/bias`,
        payload
      );
    } catch (error) {
      console.error("Error saving bias modification:", error);
    }
  };

  const changeMarkState = async (newMarkState) => {
    setMarkState(newMarkState);

    const payload = {
      question_id: questionId,
      user_answer: userAnswer,
      bias_state: biasState,
      mark_state: newMarkState,
      notes: notesText,
    };

    try {
      await axios.post(
        `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}/mark`,
        payload
      );
    } catch (error) {
      console.error("Error saving mark state:", error);
    }
  };

  const changeNotes = async (newNotes) => {
    setNotesText(newNotes);

    const payload = {
      question_id: questionId,
      user_answer: userAnswer,
      bias_state: biasState,
      mark_state: markState,
      notes: newNotes,
    };

    try {
      await axios.post(
        `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}/notes`,
        payload
      );
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  // change bias timestamp formatting to HH:MM:SS
  const formattedBias = biasTimestamps.map((b) => {
    const totalSeconds = Math.floor(b.timestamp / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    const timestamp =
      hours > 0
        ? `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`
        : `${minutes}:${seconds}`;

    return {
      ...b,
      timestamp,
    };
  });

  const prevTimestamp =
    questionNumber === 1
      ? "00:00:00"
      : historyTimestamps?.[questionNumber - 2]?.timestamp || null;
  const currTimestamp =
    historyTimestamps?.[questionNumber - 1]?.timestamp || null;

  const filteredBias = formattedBias.filter((b) => {
    if (!prevTimestamp) return true;
    if (!currTimestamp) return b.timestamp >= prevTimestamp; // Handle final question case
    return b.timestamp >= prevTimestamp && b.timestamp <= currTimestamp;
  });


  // Navigation among questions
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const goToPreviousQuestion = () => {
    if (!isFirstQuestion) {
      const prevIndex = currentIndex - 1;
      const prevQ = results[prevIndex];

      navigate("/clinicians/BiasReviewPage", {
        replace: true,
        state: {
          ...state,
          questionId: questionIds[prevIndex],
          questionNumber: prevIndex + 1,
          currentIndex: prevIndex,
          userAnswer: prevQ.user_answer,
          bias_state: prevQ.bias_state,
          mark_state: prevQ.mark_state,
          notes: prevQ.notes,
        },
      });
    }
  };

  const goToNextQuestion = () => {
    if (!isLastQuestion) {
      const nextIndex = currentIndex + 1;
      const nextQ = results[nextIndex];

      navigate("/clinicians/BiasReviewPage", {
        replace: true,
        state: {
          ...state,
          questionId: questionIds[nextIndex],
          questionNumber: nextIndex + 1,
          currentIndex: nextIndex,
          userAnswer: nextQ.user_answer,
          bias_state: nextQ.bias_state,
          mark_state: nextQ.mark_state,
          notes: nextQ.notes,
        },
      });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* ---- Header ---- */}
      <Header
        title={`${firstName || "Unknown"} ${lastName || ""} - Question ${questionNumber}`}
        role="clinician"
      />

      <div className="flex flex-col md:flex-row items-center justify-between px-6 mt-4 flex-none">
        <div className="flex flex-col items-left text-left mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold">
            {formatTestTitle(questionBankId)}
          </h2>
          <p className="text-lg md:text-2xl font-medium">{formatDate(date)}</p>
        </div>

        <div className="flex items-center space-x-4 p-4 border-2 border-gray-300 rounded-lg">
          <ReturnToResultsButton
            parentUsername={parentUsername}
            assessmentId={assessmentId}
            date={date}
            firstName={firstName}
            lastName={lastName}
            securityCode={securityCode}
            clientId={clientId}
            destination="/clinicians/ResultsAnalysisPage"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          />

          <button
            onClick={goToPreviousQuestion}
            disabled={isFirstQuestion}
            className={`px-4 py-2 rounded ${isFirstQuestion
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold`}
          >
            Back
          </button>
          <button
            onClick={goToNextQuestion}
            disabled={isLastQuestion}
            className={`px-4 py-2 rounded ${isLastQuestion
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-row space-x-6 items-start px-6 py-6">
        <div className="flex-[0.7] flex flex-col space-y-6">
          <div className="flex flex-col w-full h-full bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <p className="text-lg font-bold">Question Start: {displayTimestamp}</p>
              )}
            </div>

            <div className="flex flex-col lg:flex-row w-full h-full space-y-4 lg:space-y-0 lg:space-x-6">
              {/* ---- Video Container ---- */}
              <div className="flex-1 flex items-center justify-center">
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
              </div>

              <div className="justify-center flex-1 flex flex-col items-center space-y-4">
                <div className="w-full flex items-center justify-center space-x-3 p-3 bg-white border border-gray-300 rounded-xl">
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

                {questionBankId.toLowerCase().includes("repetition") && audioUrl && (
                  <div className="flex flex-col items-center justify-center w-full p-2 bg-white rounded-xl border border-gray-300 text-center">
                    <p className="mb-2 mb-2 text-lg font-medium">Submitted Answer</p>
                    <div className="flex justify-center w-full">

                      <audio key={audioUrl} controls preload="auto" crossOrigin="anonymous">
                        <source src={audioUrl} type="audio/mp4" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                )}

                {/* Answers + Mark State */}
                <div className="w-full">
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
            </div>
          </div>
        </div>

        {/* Right Column (Bias Info) */}
        <div className="flex-[0.3] flex flex-col space-y-6">
          <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md flex flex-col justify-between h-full">
            {/* Bias Status */}
            <BiasDetected biasState={biasState !== false} />
            {/* Timestamps of Bias */}
            <div className="mt-4 text-center text-lg">
              {biasState ? (
                <div className="text-red-500">
                  <div className="mt-2 border border-gray-300 rounded-lg p-3 bg-white shadow-md">
                    <div className="overflow-auto max-h-40 flex justify-center">
                      <div className="text-left w-full">
                        {filteredBias.map((bias, index) => (
                          <div key={index} className="py-1">
                            <strong>{bias.timestamp}</strong> - {bias.keyword}
                            <span className="text-gray-500">
                              {" "}
                              (Faces Detected: {bias.faceCount})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <p className="text-green-600">No Bias Detected</p>
              )}
            </div>

            {/* Clinician Notes */}
            <div className="mt-4 w-full">
              <div className="flex items-center space-x-2">
                <label className="text-lg font-semibold">Clinician Notes</label>
                <span className="text-sm text-gray-500">(All Notes Autosaved)</span>
              </div>
              <textarea
                className="w-full h-32 p-2 border border-gray-300 rounded-md mt-2 resize-none overflow-auto"
                placeholder="Enter notes here..."
                value={notesText}
                onChange={(e) => changeNotes(e.target.value)}
              />
            </div>

            {/* Remove Bias Button */}
            <div className="w-full mt-4 flex justify-center">
              <RemoveBiasButton
                onClick={toggleBiasState}
                isBiasDetected={biasState === true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BiasReviewPage;
