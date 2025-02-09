import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  } = state || {};

  console.log("Page state:", state); // Log the initial state

  const [question, setQuestion] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [biasTimestamps, setBiasTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [biasState, setBiasState] = useState(bias_state);
  const [markState, setMarkState] = useState(mark_state);
  const [isBiasDropdownOpen, setIsBiasDropdownOpen] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
  
    if (!questionId || !questionBankId || !parentUsername || !assessmentId) {
      setError("Missing necessary data for review.");
      return;
    }
  
    const fetchQuestionAndMedia = async () => {
      try {
        setLoading(true);
        console.log("Fetching question and media...");
  
        // Fetch the question data (for question details)
        const [language, testType] = questionBankId.split("-");
        const questionRes = await axios.get(
          `http://localhost:3000/questions/${language}/${testType}/${questionId}`
        );
        console.log("Question response:", questionRes.data);
  
        if (!questionRes.data) {
          setError("Question not found.");
          return;
        }
  
        setQuestion(questionRes.data);
  
        // Now fetch the result data to get the mark_state
        const resultRes = await axios.get(
          `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}`
        );
        console.log("Result response:", resultRes.data);
  
        // Set the initial mark state based on the result data
        const initialMarkState = resultRes.data?.mark_state || "Undetermined";
        setMarkState(initialMarkState);
  
        const mediaRes = await axios.get(
          `http://localhost:3000/media/${parentUsername}/${assessmentId}`
        );
        console.log("Media response:", mediaRes.data);
  
        setVideoUrl(mediaRes.data.presignedUrl);
        setBiasTimestamps(mediaRes.data.bias || []);
        setBiasState((prevState) => prevState || mediaRes.data.bias.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load bias review data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestionAndMedia();
  }, [questionId, questionBankId, parentUsername, assessmentId]);
  
  

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
      console.log("✅ Bias state updated successfully! Save Response:", saveResponse.data);
    } catch (error) {
      console.error("❌ Error saving bias modification:", error);
    }
  };

  const changeMarkState = async (newMarkState) => {
    console.log("Changing mark state:", newMarkState);
    setMarkState(newMarkState); // This should update the markState
    
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
      console.log("✅ Mark state updated successfully! Save Response:", saveResponse.data);
    } catch (error) {
      console.error("❌ Error saving mark state:", error);
    }
  };
  
  

  const saveChanges = async () => {
    const payload = {
      question_id: questionId,
      user_answer: userAnswer,
      bias_state: biasState,
      mark_state: markState,
    };
  
    console.log("📤 Saving final changes:", payload);
  
    try {
      // Save bias state
      await axios.post(
        `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}/bias`,
        { bias_state: biasState }
      );
  
      // Save mark state
      await axios.post(
        `http://localhost:3000/resultstorage/results/${parentUsername}/${assessmentId}/${questionId}/mark`,
        { mark_state: markState }
      );
  
      console.log("✅ Bias state and mark state updated successfully!");
    } catch (error) {
      console.error("❌ Error saving changes:", error);
    }
  };
  

  const formattedBias = biasTimestamps.map((bias) => ({
    ...bias,
    timestamp: (bias.timestamp / 1000).toFixed(2),
  }));

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

      <div className="flex w-full max-w-4xl items-center justify-between mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
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
            <QuestionAnswers question={question} userAnswer={userAnswer} markState={markState} changeMarkState={changeMarkState}/>
          )}
        </div>
      </div>

      <div className="w-full flex justify-end pr-10 pb-10">
        <RemoveBiasButton
          onClick={toggleBiasState}
          isBiasDetected={biasState}
        />
      </div>

      <div className="w-full flex justify-center mt-4">
        <button
          onClick={saveChanges}
          className="w-1/3 bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default BiasReviewPage;
