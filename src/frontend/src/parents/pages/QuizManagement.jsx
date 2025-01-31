import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MatchingQuestion from "./QuestionPage";
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
  const [loading, setLoading] = useState(true);
  const [assessmentId, setAssessmentId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false); // 🔹 New loading state

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
      navigate("/parents/EnglishMatchingInstructions");
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

  const handleAnswerSelected = (questionId, selectedOption) => {
    const newResponse = { question_id: questionId, user_answer: selectedOption };
    setResponses((prev) => [...prev, newResponse]);

    sessionStorage.setItem("quizResponses", JSON.stringify([...responses, newResponse]));

    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    console.log("Stopping recording...");
    setSubmitting(true); // 🔹 Show "Submitting Answers..." message
    stopRecording((finalBlob) => {
      if (finalBlob) {
        console.log("Final recordedBlob:", finalBlob);
        console.log("Recording blob size:", finalBlob.size);
        uploadRecording(finalBlob)
          .then(() => submitResults()) // 🔹 Ensures submission happens only after upload
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
  
    try {
      const response = await axios.post("http://localhost:3000/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Recording uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading recording:", error);
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
      setSubmitting(false); // 🔹 Hide "Submitting Answers..." message
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* 🔹 Progress Bar */}
      <div className="w-full bg-gray-300 h-2 rounded">
        <div
          className="bg-blue-600 h-2 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <MatchingQuestion
        question={currentQuestion}
        onAnswerSelected={handleAnswerSelected}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      {/* 🔹 Submitting Answers Message */}
      {submitting && (
        <div className="text-center text-lg font-semibold mt-4">
          Submitting Answers...
        </div>
      )}
    </div>
  );
}
