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
  const parentInfo = useSelector((state) => state.parent.parentInfo); // 🔹 Get parent info from Redux

  // Local state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assessmentId, setAssessmentId] = useState(1); // 🔹 Start at 1 if no assessments exist

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let questionIds = new Set();
        while (questionIds.size < 5) {
          const randomId = Math.floor(Math.random() * 6); // Generate unique IDs (0-5)
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
          // 🔹 Set the next assessment ID (latest + 1)
          const latestAssessment = assessments[assessments.length - 1];
          setAssessmentId(latestAssessment.assessment_id + 1);
        } else {
          // 🔹 If no assessments exist, set ID to 1
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

    // 🔹 Save responses to session storage
    sessionStorage.setItem("quizResponses", JSON.stringify([...responses, newResponse]));

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      finishQuiz(); // 🔹 Calls finishQuiz() when done
    }
  };

  const finishQuiz = () => {
    console.log("Stopping recording...");
    stopRecording((finalBlob) => {
      if (finalBlob) {
        console.log("Final recordedBlob:", finalBlob);
        console.log("Recording blob size:", finalBlob.size);
        uploadRecording(finalBlob); // 🔹 Downloads the recorded video
      } else {
        console.warn("No recordedBlob found! onstop may not have completed yet.");
      }

      submitResults(); // 🔹 Submit results after stopping recording
    });
  };

  const uploadRecording = async (blob) => {
    if (!blob) return;
    console.log("Recording blob size:", blob.size);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recording.mp4"; // 🔹 Downloads the recorded video
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log("Recording saved as a local file.");
  };

  const submitResults = async () => {
    if (!assessmentId) {
      console.error("No assessment ID found! Cannot submit results.");
      return;
    }

    const payload = {
      username: parentInfo.username,
      name: `${parentInfo.firstName} ${parentInfo.lastName}`,
      assessment_id: assessmentId, // 🔹 Now correctly assigned
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
      navigate("/parents/testcomplete"); // 🔹 Redirect after submission
    } catch (error) {
      console.error("Error submitting test results:", error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <MatchingQuestion
      question={currentQuestion}
      onAnswerSelected={handleAnswerSelected}
      isLastQuestion={currentQuestionIndex === questions.length - 1}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={questions.length}
    />
  );
}
