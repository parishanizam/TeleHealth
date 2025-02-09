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
        // Fetch the practice question (always ID 0)
        const practiceRes = await axios.get(`http://localhost:3000/questions/${language}/${testType}/0`);
        setPracticeQuestion(practiceRes.data);
        
        let questionIds = new Set();
        while (questionIds.size < 5) { // Fetch five random test questions
          const randomId = Math.floor(Math.random() * 6) + 1; // Avoid 0
          questionIds.add(randomId);
        }

        const fetchedQuestions = await Promise.all(
          [...questionIds].map(async (id) => {
            const res = await axios.get(`http://localhost:3000/questions/${language}/${testType}/${id}`);
            return res.data;
          })
        );

        setQuestions(fetchedQuestions); // Use fetched random questions for the test
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
      setCurrentQuestionIndex(1);
      return;
    }

    const newResponse = {
      question_id: questionId,
      user_answer: selectedOption,
    };
    setResponses((prev) => [...prev, newResponse]);

    sessionStorage.setItem("quizResponses", JSON.stringify([...responses, newResponse]));

    setProgress(((currentQuestionIndex) / questions.length) * 100);

    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      finishQuiz();
    }
  };

  if (loading || !practiceQuestion || !questions.length) {
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
              isPractice={true}
            />
          )}
          {testType === "repetition" && (
            <RepetitionQuestion
              question={practiceQuestion}
              onAnswerSelected={() => setCurrentQuestionIndex(1)}
              isLastQuestion={false}
              questionNumber={0}
              totalQuestions={totalQuestions}
              isPractice={true}
            />
          )}
          {testType === "quantifier" && (
            <QuantifierQuestion
              question={practiceQuestion}
              onAnswerSelected={() => setCurrentQuestionIndex(1)}
              isLastQuestion={false}
              questionNumber={0}
              totalQuestions={totalQuestions}
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
    </div>
  );
}
