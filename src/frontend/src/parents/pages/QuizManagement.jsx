import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MatchingQuestion from "./MatchingQuestionPage";
import RepetitionQuestion from "./RepetitionQuestionPage";
import QuantifierQuestion from "./QuantifierQuestionPage";
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
  const [timestamps, setTimestamps] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]); 
  const [submitting, setSubmitting] = useState(false); // New loading state

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
      navigate(
        `/parents/${
          testType.charAt(0).toUpperCase() + testType.slice(1)
        }Instructions`
      );
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
  
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    } else {
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  const handleAnswerSelected = (questionId, selectedOption, audioFile) => {
    const elapsedTime = getElapsedRecordingTime() / 1000; // Get elapsed time from the context
    const formattedTimestamp = formatTime(elapsedTime);

    console.log(`Time since recording started: ${formattedTimestamp}`);

    const newResponse = {
      question_id: questionId,
      user_answer: selectedOption,
      bias_state: false,
    };
    const newTimestamp = { question_id: questionId, timestamp: formattedTimestamp };

    setResponses((prev) => [...prev, newResponse]);
    setTimestamps((prev) => [...prev, newTimestamp]);

    sessionStorage.setItem('quizResponses', JSON.stringify([...responses, newResponse]));
    sessionStorage.setItem('timestamps', JSON.stringify([...timestamps, { question_id: questionId, timestamp: formattedTimestamp }]));

    if (testType === "repetition" && audioFile) {
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
    setSubmitting(true); 
    stopRecording((finalBlob) => {
      if (finalBlob) {
        console.log("Final recordedBlob:", finalBlob);
        uploadRecording(finalBlob)
          .then(() => submitResults())
          .catch((error) => console.error("Error during processing:", error));
      } else {
        console.warn("No recordedBlob found! onstop may not have completed yet.");
        submitResults();
      }
    });
  };

  const uploadRecording = async (blob) => {
    const formData = new FormData();
  
    let hasFiles = false;
  
    if (blob) {
      formData.append("videoFile", blob, "recording.mp4");
      hasFiles = true;
    }
  
    formData.append("parentUsername", parentInfo.username);
    formData.append("firstName", parentInfo.firstName);
    formData.append("lastName", parentInfo.lastName);
    formData.append("childUsername", parentInfo.username);
    formData.append("assessmentId", assessmentId);
    formData.append("timestamps", JSON.stringify(timestamps));
    formData.append("language", language);
    formData.append("testType", testType);
  
    if (testType === "repetition" && audioFiles.length > 0) {
      audioFiles.forEach((file, index) => {
        formData.append("audioFiles", file, `question_${index + 1}.mp4`);
        hasFiles = true;
      });
    }
  
    if (!hasFiles) {
      console.error("No video or audio files to upload.");
      return;  // Exit early if no files to upload
    }
  
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
      results: responses,
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
      setSubmitting(false);
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

      {testType === "quantifier" && (
        <QuantifierQuestion
          question={currentQuestion}
          onAnswerSelected={handleAnswerSelected}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      )}

      {submitting && (
        <div className="text-center text-lg font-semibold mt-4">
          Submitting Answers...
        </div>
      )}
    </div>
  );
}
