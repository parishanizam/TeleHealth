import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchingQuestion from "./QuestionPage";
import sampleSound from '../../assets/desk-bell-dry_D.wav';

export default function QuizManagement() {
  // Temporary placeholder questions array with a 3rd "temp" question
  const placeholderQuestions = [
    {
      id: 1,
      title: "Question 1: Select the matching image",
      sound: sampleSound,
      options: [
        { id: "a", image: "../../assets/volumebutton.svg" },
        { id: "b", image: "../../assets/volumebutton.svg" },
        { id: "c", image: "../../assets/volumebutton.svg" },
        { id: "d", image: "../../assets/volumebutton.svg" }
      ]
    },
    {
      id: 2,
      title: "Question 2: Select the matching image",
      sound: sampleSound,
      options: [
        { id: "a", image: "../../assets/volumebutton.svg" },
        { id: "b", image: "../../assets/volumebutton.svg" },
        { id: "c", image: "../../assets/volumebutton.svg" },
        { id: "d", image: "../../assets/volumebutton.svg" }
      ]
    },
    {
        id: 3,
        title: "Question 3: Select the matching image",
        sound: sampleSound,
        options: [
          { id: "a", image: "../../assets/volumebutton.svg" },
          { id: "b", image: "../../assets/volumebutton.svg" },
          { id: "c", image: "../../assets/volumebutton.svg" },
          { id: "d", image: "../../assets/volumebutton.svg" }
        ]
      },
  ];

  const [questions] = useState(placeholderQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  const handleAnswerSelected = (questionId, selectedOption) => {
    // Save the user’s response
    setResponses((prev) => [...prev, { questionId, selectedOption }]);
    
    // Go to next question if not the last one; otherwise go to “test complete” route
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/parents/testcomplete");
    }
  };

  // Safely retrieve the current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // If, for some reason, the question is unavailable, render nothing or a fallback
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <MatchingQuestion
      question={currentQuestion}
      onAnswerSelected={handleAnswerSelected}
      isLastQuestion={currentQuestionIndex === questions.length - 1}
    />
  );
}
