// App.js

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import qBank from "./Components/QuestionBank";
import Questions from './Components/Questions';
import Score from './Components/Score';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState(qBank);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10); 
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLastq, setIsLastq] = useState(false)

  useEffect(() => {
    if (quizStarted) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setCurrentQuestion(prevQuestion => prevQuestion + 1);
            return 10; // Reset timer for next question
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuestion, quizStarted]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 2 === questions.length) {
      setIsLastq(true);
    }
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setTimer(10);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="quiz-container">
      <h1 className="text-primary quiz-title">Quiz App</h1>
      <div className="card quiz-card">
        {!quizStarted ? (
          <div className="card-body start-card">
            <h2 className="card-title start-title">Are you ready to test your knowledge?</h2>
            <button className="btn start-btn" onClick={startQuiz}>
              Start Quiz
            </button>
          </div>
        ) : currentQuestion < questions.length ? (
          <Questions
            questions={questions}
            handleNextQuestion={handleNextQuestion}
            currentQuestion={currentQuestion}
            handleAnswerClick={handleAnswerClick}
            timer={timer}
            isLastq={isLastq}
          />
        ) : (
          <Score
            score={score}
            setScore={setScore}
            setCurrentQuestion={setCurrentQuestion}
            setQuizStarted={setQuizStarted}
            setIsLastq={setIsLastq}
            setTimer={setTimer}
          />
        )}
      </div>
    </div>
  );
};

export default App;
