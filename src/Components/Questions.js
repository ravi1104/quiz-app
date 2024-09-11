// Questions.js

import React, { useState } from 'react';

const Questions = ({ questions, handleNextQuestion, currentQuestion, handleAnswerClick }) => {
  const optionIds = ['A', 'B', 'C', 'D'];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleAnswerClick(option);
  };

  return (
    <div className="container mt-3 bg-light">
      <div>
        <div className="card-body">
          <h4 className="card-text">
            {questions[currentQuestion].id}{') '}
            {questions[currentQuestion].question}
          </h4>
          <div className="list-group">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`list-group-item 
                  list-group-item-action 
                  mt-2 ${selectedOption === option ? 'active' : ''}`}
                onClick={() => handleOptionClick(option)}
                style={{
                  backgroundColor: selectedOption === option ? 'lightgreen' : 'white',
                  border: '1px solid gray'
                }}
              >
                {optionIds[index]}) {option}
              </button>
            ))}
          </div>
          <br />
          <div className="row">
            <div className="col">
              <button className="btn btn-primary btn-sm" onClick={handleNextQuestion}>
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
