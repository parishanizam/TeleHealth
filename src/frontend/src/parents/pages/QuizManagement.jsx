import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MatchingQuestion from "./QuestionPage";
import sampleSound from '../../assets/desk-bell-dry_D.wav';
import { RecordingManagerContext } from '../helpers/RecordingManagerContext';

export default function QuizManagement() {
  //Set up your placeholders
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

  //Local state
  const [questions] = useState(placeholderQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  //Access recording context
  const { stopRecording, recordedBlob } = useContext(RecordingManagerContext);

  //This is triggered when user picks an answer and clicks Next/Submit
  const handleAnswerSelected = (questionId, selectedOption) => {
    //Save user’s response
    setResponses((prev) => [...prev, { questionId, selectedOption }]);

    //If NOT the last question, move on
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      //If it IS the last question:
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
  
      //Navigate to "Test Complete" after recording is finalized
      navigate("/parents/testcomplete");
    });
  };

  const uploadRecording = async (blob) => {
    if (!blob) return;
    console.log("Recording blob size:", blob.size);
  //Create a download link
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

  //Retrieve current question
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  //Render the question
  return (
    <MatchingQuestion
      question={currentQuestion}
      onAnswerSelected={handleAnswerSelected}
      isLastQuestion={currentQuestionIndex === questions.length - 1}
    />
  );
}
