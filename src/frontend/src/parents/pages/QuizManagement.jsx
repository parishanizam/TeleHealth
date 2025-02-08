import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MatchingQuestion from "./MatchingQuestionPage";
import RepetitionQuestion from "./RepetitionQuestionPage";
import { RecordingManagerContext } from "../helpers/RecordingManagerContext";

export default function QuizManagement() {
  const navigate = useNavigate();
  const { stopRecording } = useContext(RecordingManagerContext);

  // 🔹 Get selected language & test type from Redux
  const { language, testType } = useSelector((state) => state.testSelection);
  const parentInfo = useSelector((state) => state.parent.parentInfo);

  // Local state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const { getElapsedRecordingTime } = useContext(RecordingManagerContext);
  const [loading, setLoading] = useState(true);
  const [assessmentId, setAssessmentId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [timestamps, setTimestamps] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]); 
  const [submitting, setSubmitting] = useState(false); // New loading state

  const startRecording = () => {
    setRecordingStartTime(new Date().getTime()); 
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let questionIds = new Set();
        while (questionIds.size < 5) {
          const randomId = Math.floor(Math.random() * 6);
          questionIds.add(randomId);
        }

        const fetchedQuestions = await Promise.all(
          [...questionIds].map(async (id) => {
            const res = await axios.get(
              `http://localhost:3000/questions/${language}/${testType}/${id}`
            );
            return res.data;
          })
        );

        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    const fetchAssessmentId = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/resultstorage/assessment-history/${parentInfo.username}`
        );

        const assessments = res.data.assessments;

        if (assessments.length > 0) {
          const latestAssessment = assessments[assessments.length - 1];
          setAssessmentId(latestAssessment.assessment_id + 1);
        } else {
          setAssessmentId(1);
        }
      } catch (error) {
        console.error("Error fetching assessment history:", error);
      }
    };

    fetchQuestions();
    fetchAssessmentId();
  }, [language, testType, parentInfo.username]);

  useEffect(() => {
    if (sessionStorage.getItem("redirectAfterRefresh") === "true") {
      sessionStorage.removeItem("redirectAfterRefresh");
      navigate(`/parents/${language.charAt(0).toUpperCase() + language.slice(1)}${testType.charAt(0).toUpperCase() + testType.slice(1)}Instructions`);
      // navigate("/parents/EnglishMatchingInstructions");
    }
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "You are currently being recorded. Are you sure you want to leave?";
      sessionStorage.setItem("redirectAfterRefresh", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
  
    // Format to `HH:MM:SS` or `MM:SS`
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    } else {
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  const handleAnswerSelected = (questionId, selectedOption, audioFile) => {
    console.log("Audio file received in handleAnswerSelected:", audioFile); // test

    const elapsedTime = getElapsedRecordingTime() / 1000; // Get elapsed time from the context
    const formattedTimestamp = formatTime(elapsedTime);

    console.log(`Time since recording started: ${formattedTimestamp}`);

    const newResponse = { question_id: questionId, user_answer: selectedOption };
    const newTimestamp = { question_id: questionId, timestamp: formattedTimestamp };

    setResponses((prev) => [...prev, newResponse]);
    setTimestamps((prev) => [...prev, newTimestamp]);

    sessionStorage.setItem('quizResponses', JSON.stringify([...responses, newResponse]));
    sessionStorage.setItem('timestamps', JSON.stringify([...timestamps, { question_id: questionId, timestamp: formattedTimestamp }]));

    if (audioFile) {
      console.log("Audio file received in handleAnswerSelected:", audioFile);
      setAudioFiles((prev) => [...prev, audioFile]);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    console.log("Stopping recording...");
    setSubmitting(true); // Show "Submitting Answers..." message
    stopRecording((finalBlob) => {
      if (finalBlob) {
        console.log("Final recordedBlob:", finalBlob);
        console.log("Recording blob size:", finalBlob.size);
        uploadRecording(finalBlob)
          .then(() => submitResults()) // Ensures submission happens only after upload
          .catch((error) => console.error("Error during processing:", error));
      } else {
        console.warn("No recordedBlob found! onstop may not have completed yet.");
        submitResults();
      }
    });
  };

  const uploadRecording = async (blob) => {
    if (!blob) return;
  
    console.log("Uploading recording to backend...");
  
    const formData = new FormData();
    formData.append("videoFile", blob, "recording.mp4");
    formData.append("parentUsername", parentInfo.username);
    formData.append("firstName", parentInfo.firstName);
    formData.append("lastName", parentInfo.lastName);
    formData.append("childUsername", parentInfo.username);
    formData.append("assessmentId", assessmentId);
    formData.append("timestamps", JSON.stringify(timestamps));
  
    console.log("Adding audio files to form data...");
    audioFiles.forEach((file, index) => {
      formData.append("audioFiles", file, `question_${index + 1}.mp4`);  // Must match "audioFiles"
      console.log(`Audio file ${index + 1}:`, file);
    });
  
    console.log("🚀 Sending Upload Request with form data...");
  
    try {
      const response = await axios.post("http://localhost:3000/media/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error occurred while uploading form data:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        console.error("Server response status:", error.response.status);
        console.error("Server response headers:", error.response.headers);
      }
      throw error;
    }
  };

  const submitResults = async () => {
    if (!assessmentId) {
      console.error("No assessment ID found! Cannot submit results.");
      return;
    }

    const payload = {
      username: parentInfo.username,
      name: `${parentInfo.firstName} ${parentInfo.lastName}`,
      assessment_id: assessmentId,
      questionBankId: `${language}-${testType}`,
      results: responses
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/resultstorage/submit-assessment",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Test results submitted successfully:", res.data);
      navigate("/parents/testcomplete");
    } catch (error) {
      console.error("Error submitting test results:", error);
    } finally {
      setSubmitting(false); // Hide "Submitting Answers..." message
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {testType === "matching" && (
      <MatchingQuestion
        question={currentQuestion}
        onAnswerSelected={handleAnswerSelected}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
    )}

      {testType === "repetition" && (
      <RepetitionQuestion
        question={currentQuestion}
        onAnswerSelected={handleAnswerSelected}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
    )}

      {/* Submitting Answers Message */}
      {submitting && (
        <div className="text-center text-lg font-semibold mt-4">
          Submitting Answers...
        </div>
      )}
    </div>
  );
}
