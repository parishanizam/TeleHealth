import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MatchingQuestion from "./MatchingQuestionPage";
import RepetitionQuestion from "./RepetitionQuestionPage";
import QuantifierQuestion from "./QuantifierQuestion";
import { RecordingManagerContext } from "../helpers/RecordingManagerContext";

export default function QuizManagement() {
  const navigate = useNavigate();
  const { stopRecording } = useContext(RecordingManagerContext);

  const { language, testType } = useSelector((state) => state.testSelection);
  const parentInfo = useSelector((state) => state.parent.parentInfo);

  const [questions, setQuestions] = useState([]);
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const { getElapsedRecordingTime } = useContext(RecordingManagerContext);
  const [loading, setLoading] = useState(true);
  const [assessmentId, setAssessmentId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [timestamps, setTimestamps] = useState([]);
  const audioFilesRef = useRef([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const practiceRes = await axios.get(
          `https://telehealth-insights.onrender.com/questions/${language}/${testType}/0`,
        );
        setPracticeQuestion(practiceRes.data);

        let questionIds = new Set();
        while (questionIds.size < 5) {
          const randomId = Math.floor(Math.random() * 15) + 1;
          questionIds.add(randomId);
        }

        const fetchedQuestions = await Promise.all(
          [...questionIds].map(async (id) => {
            const res = await axios.get(
              `https://telehealth-insights.onrender.com/questions/${language}/${testType}/${id}`,
            );
            return res.data;
          }),
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
          `https://telehealth-insights.onrender.com/resultstorage/assessment-history/${parentInfo.username}`,
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
        `/parents/${testType.charAt(0).toUpperCase() + testType.slice(1)}Instructions`,
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
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    } else {
      return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
  }

  const handleAnswerSelected = (questionId, selectedOption, audioFile) => {
    const elapsedTime = getElapsedRecordingTime() / 1000;
    const formattedTimestamp = formatTime(elapsedTime);

    console.log(`Time since recording started: ${formattedTimestamp}`);

    if (currentQuestionIndex === 0) {
      setCurrentQuestionIndex(1);
      return;
    }

    const newResponse = {
      question_id: questionId,
      user_answer: selectedOption,
      bias_state: false,
      mark_state: "Undetermined",
    };
    const newTimestamp = {
      question_id: questionId,
      timestamp: formattedTimestamp,
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    setTimestamps((prev) => [...prev, newTimestamp]);

    sessionStorage.setItem("quizResponses", JSON.stringify(updatedResponses));
    sessionStorage.setItem(
      "timestamps",
      JSON.stringify([...timestamps, newTimestamp]),
    );

    setProgress((currentQuestionIndex / questions.length) * 100);

    if (testType === "repetition" && audioFile) {
      const renamedFile = new File(
        [audioFile],
        `${parentInfo.username}_question_${currentQuestionIndex}.mp4`,
        {
          type: audioFile.type,
        },
      );
      audioFilesRef.current.push(renamedFile);
    }

    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz(updatedResponses);
    }
  };

  const finishQuiz = (updatedResponses) => {
    console.log("Stopping recording...");
    setSubmitting(true);

    stopRecording(async (finalBlob) => {
      await uploadRecording(finalBlob);
      try {
        await submitResults(updatedResponses);
      } catch (err) {
        console.error("Error submitting quiz answers:", err);
      } finally {
        setSubmitting(false);
      }
      navigate("/parents/testcomplete");
    });
  };

  const uploadRecording = async (blob) => {
    if (!blob && audioFilesRef.current.length === 0) return;

    const formData = new FormData();
    let hasFiles = false;

    if (blob && sessionStorage.getItem("videoConsent") !== "declined") {
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

    if (testType === "repetition" && audioFilesRef.current.length > 0) {
      audioFilesRef.current.forEach((file, index) => {
        formData.append(
          "audioFiles",
          file,
          `${parentInfo.username}_question_${index + 1}.mp4`,
        );
      });
      hasFiles = true;
    }

    if (!hasFiles) {
      console.error("No video or audio files to upload.");
      return;
    }

    console.log("🚀 Sending Upload Request with form data...");
    try {
      await axios.post("https://telehealth-insights.onrender.com/media/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error uploading recording:", error);
      throw error;
    }
  };

  const submitResults = async (responsesToSubmit) => {
    if (!assessmentId) {
      console.error("No assessment ID found! Cannot submit results.");
      return;
    }

    const payload = {
      username: parentInfo.username,
      name: `${parentInfo.firstName} ${parentInfo.lastName}`,
      assessment_id: assessmentId,
      questionBankId: `${language}-${testType}`,
      results: responsesToSubmit,
    };

    try {
      await axios.post(
        "https://telehealth-insights.onrender.com/resultstorage/submit-assessment",
        payload,
        { headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      console.error("Error submitting test results:", error);
    }
  };

  if (loading || !practiceQuestion || !questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-l px-4 scale-100">
      {currentQuestionIndex === 0 ? (
        <div className="text-center">
          {testType === "matching" && (
            <MatchingQuestion
              question={practiceQuestion}
              onAnswerSelected={() => setCurrentQuestionIndex(1)}
              isLastQuestion={false}
              questionNumber={0}
              totalQuestions={questions.length}
              isPractice={true}
            />
          )}
          {testType === "repetition" && (
            <RepetitionQuestion
              question={practiceQuestion}
              onAnswerSelected={() => setCurrentQuestionIndex(1)}
              isLastQuestion={false}
              questionNumber={0}
              totalQuestions={questions.length}
              isPractice={true}
            />
          )}
          {testType === "quantifier" && (
            <QuantifierQuestion
              question={practiceQuestion}
              onAnswerSelected={() => setCurrentQuestionIndex(1)}
              isLastQuestion={false}
              questionNumber={0}
              totalQuestions={questions.length}
              isPractice={true}
            />
          )}
        </div>
      ) : (
        <>
          {testType === "matching" && (
            <MatchingQuestion
              question={questions[currentQuestionIndex - 1]}
              onAnswerSelected={handleAnswerSelected}
              isLastQuestion={currentQuestionIndex === questions.length}
              questionNumber={currentQuestionIndex}
              totalQuestions={questions.length}
            />
          )}
          {testType === "repetition" && (
            <RepetitionQuestion
              question={questions[currentQuestionIndex - 1]}
              onAnswerSelected={handleAnswerSelected}
              isLastQuestion={currentQuestionIndex === questions.length}
              questionNumber={currentQuestionIndex}
              totalQuestions={questions.length}
            />
          )}
          {testType === "quantifier" && (
            <QuantifierQuestion
              question={questions[currentQuestionIndex - 1]}
              onAnswerSelected={handleAnswerSelected}
              isLastQuestion={currentQuestionIndex === questions.length}
              questionNumber={currentQuestionIndex}
              totalQuestions={questions.length}
            />
          )}
        </>
      )}
      {submitting && (
        <div className="flex justify-center items-center mt-3">
          <div
            className="w-10 h-10 border-8 border-solid border-t-transparent border-r-transparent border-b-blue-500 border-l-blue-500 rounded-full"
            style={{ animation: "spin 1s linear infinite" }}
          ></div>
          <span className="ml-4 text-lg font-semibold">
            Submitting Answers...
          </span>
        </div>
      )}
    </div>
  );
}
