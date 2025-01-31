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

  // Local state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 Loading state

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
              `http://localhost:3000/questions/${language}/${testType}/${id}` // 🔹 Now dynamic
            );
            return res.data;
          })
        );

        setQuestions(fetchedQuestions);
        setLoading(false); // 🔹 Stop loading when questions are ready
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [language, testType]); // 🔹 Fetch based on Redux state

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
    const newResponse = { questionId, selectedOption };

    setResponses((prev) => [...prev, newResponse]);

    // 🔹 Save responses to session storage
    sessionStorage.setItem("quizResponses", JSON.stringify([...responses, newResponse]));

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    console.log("Stopping recording...");
    stopRecording((finalBlob) => {
      if (finalBlob) {
        console.log("Final recordedBlob:", finalBlob);
        console.log("Recording blob size:", finalBlob.size);
        uploadRecording(finalBlob);
      } else {
        console.warn("No recordedBlob found! onstop may not have completed yet.");
      }
      
      // 🔹 Navigate to the existing test complete page
      navigate("/parents/testcomplete");
    });
  };

  const uploadRecording = async (blob) => {
    if (!blob) return;
    console.log("Recording blob size:", blob.size);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recording.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log("Recording saved as a local file.");
  };

  // 🔹 Show loading screen while fetching questions
  if (loading) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <MatchingQuestion
      question={currentQuestion}
      onAnswerSelected={handleAnswerSelected}
      isLastQuestion={currentQuestionIndex === questions.length - 1}
      questionNumber={currentQuestionIndex + 1} // 🔹 Sequential question number
      totalQuestions={questions.length} // 🔹 Total questions for progress bar
    />
  );
}
