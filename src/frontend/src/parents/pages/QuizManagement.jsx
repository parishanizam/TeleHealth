import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MatchingQuestion from "./QuestionPage";
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
  const [loading, setLoading] = useState(true);
  const [assessmentId, setAssessmentId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const practiceRes = await axios.get(`http://localhost:3000/questions/${language}/${testType}/0`);
        setPracticeQuestion(practiceRes.data);

        let questionIds = new Set();
        while (questionIds.size < 5) {
          const randomId = Math.floor(Math.random() * 6) + 1;
          questionIds.add(randomId);
        }

        const fetchedQuestions = await Promise.all(
          [...questionIds].map(async (id) => {
            const res = await axios.get(`http://localhost:3000/questions/${language}/${testType}/${id}`);
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
        const res = await axios.get(`http://localhost:3000/resultstorage/assessment-history/${parentInfo.username}`);
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
      navigate(`/parents/${testType.charAt(0).toUpperCase() + testType.slice(1)}Instructions`);
    }
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "You are currently being recorded. Are you sure you want to leave?";
      sessionStorage.setItem("redirectAfterRefresh", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleAnswerSelected = (questionId, selectedOption) => {
    if (currentQuestionIndex === 0) {
      setCurrentQuestionIndex(1);
      return;
    }

    const newResponse = {
      question_id: questionId,
      user_answer: selectedOption,
    };
    setResponses((prev) => [...prev, newResponse]);

    sessionStorage.setItem("quizResponses", JSON.stringify([...responses, newResponse]));

    setProgress((currentQuestionIndex / questions.length) * 100);

    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setSubmitting(true);
    stopRecording((finalBlob) => {
      if (finalBlob) {
        uploadRecording(finalBlob)
          .then(() => submitResults())
          .catch((error) => console.error("Error during processing:", error));
      } else {
        submitResults();
      }
    });
  };

  const uploadRecording = async (blob) => {
    if (!blob) return;

    const formData = new FormData();
    formData.append("videoFile", blob, "recording.mp4");
    formData.append("parentUsername", parentInfo.username);
    formData.append("firstName", parentInfo.firstName);
    formData.append("lastName", parentInfo.lastName);
    formData.append("childUsername", parentInfo.username);
    formData.append("assessmentId", assessmentId);

    try {
      await axios.post("http://localhost:3000/media/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      results: responses,
    };

    try {
      await axios.post(
        "http://localhost:3000/resultstorage/submit-assessment",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/parents/testcomplete");
    } catch (error) {
      console.error("Error submitting test results:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !practiceQuestion || !questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      {submitting && <div className="text-center text-lg font-semibold mt-4">Submitting Answers...</div>}
    </div>
  );
}
