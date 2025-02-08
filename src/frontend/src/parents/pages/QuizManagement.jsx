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
        let questionIds = new Set();
        while (questionIds.size < 6) {
          // Fetch one extra for practice
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

        setPracticeQuestion(fetchedQuestions[0]); // First fetched question is practice
        setQuestions(fetchedQuestions.slice(1)); // Use the rest for real questions
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [language, testType]);

  const handleAnswerSelected = (questionId, selectedOption) => {
    if (currentQuestionIndex === 0) {
      // If answering the practice question, just move to the first real question
      setCurrentQuestionIndex(1);
      return;
    }

    const newResponse = {
      question_id: questionId,
      user_answer: selectedOption,
    };
    setResponses((prev) => [...prev, newResponse]);

    sessionStorage.setItem(
      "quizResponses",
      JSON.stringify([...responses, newResponse])
    );

    setProgress(((currentQuestionIndex) / questions.length) * 100);

    if (currentQuestionIndex < questions.length) {
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

  if (loading || !practiceQuestion) {
    return <div>Loading...</div>;
  }

  const totalQuestions = questions.length;

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
              totalQuestions={totalQuestions}
              isPractice={true} // Pass isPractice to display instructions
            />
          )}
          {testType === "repetition" && (
            <RepetitionQuestion
              question={practiceQuestion}
              onAnswerSelected={() => setCurrentQuestionIndex(1)}
              isLastQuestion={false}
              questionNumber={0}
              totalQuestions={totalQuestions}
              isPractice={true} // Pass isPractice to display instructions
            />
          )}
          {testType === "quantifier" && (
            <QuantifierQuestion
              question={practiceQuestion}
              onAnswerSelected={() => setCurrentQuestionIndex(1)}
              isLastQuestion={false}
              questionNumber={0}
              totalQuestions={totalQuestions}
              isPractice={true} // Pass isPractice to display instructions
            />
          )}
        </div>
      ) : (
        <>
          {testType === "matching" && (
            <MatchingQuestion
              question={questions[currentQuestionIndex - 1]}
              onAnswerSelected={handleAnswerSelected}
              isLastQuestion={currentQuestionIndex === totalQuestions}
              questionNumber={currentQuestionIndex}
              totalQuestions={totalQuestions}
            />
          )}
          {testType === "repetition" && (
            <RepetitionQuestion
              question={questions[currentQuestionIndex - 1]}
              onAnswerSelected={handleAnswerSelected}
              isLastQuestion={currentQuestionIndex === totalQuestions}
              questionNumber={currentQuestionIndex}
              totalQuestions={totalQuestions}
            />
          )}
          {testType === "quantifier" && (
            <QuantifierQuestion
              question={questions[currentQuestionIndex - 1]}
              onAnswerSelected={handleAnswerSelected}
              isLastQuestion={currentQuestionIndex === totalQuestions}
              questionNumber={currentQuestionIndex}
              totalQuestions={totalQuestions}
            />
          )}
        </>
      )}

      {submitting && (
        <div className="text-center text-lg font-semibold mt-4">
          Submitting Answers...
        </div>
      )}
    </div>
  );
}
