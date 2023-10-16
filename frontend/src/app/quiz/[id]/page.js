"use client"
import { useEffect, useState } from "react";
import "./quiz.scss"

export default function Page({ params }) {
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);


  useEffect(() => {
    console.log(params.id)
    fetch("http://localhost:3000/quizzes/single/"+params.id)
    .then((res)=>res.json())
    .then((data)=>{
      setQuizData(data)
    })
  }, []);

  const handleAnswerSelection = (questionId, chosenAnswerId) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId, chosenAnswerId },
    ]);
  };

  const handleSubmit = () => {
    // Create a JSON object with user's answers
    const userAnswersJSON = {
      quizId: quizData.id,
      questions: userAnswers,
    };
    // Send the JSON object to the server for scoring (you'll need to implement this part on the server)
    // Example AJAX request
    fetch('http://localhost:3000/quizzes/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAnswersJSON),
    })
      .then((response) => response.json())
      .then((score) => {
        alert(`Your score is: ${score.score}`);
      })
      .catch((error) => {
        console.error('Error scoring quiz:', error);
      });
  };



  return(
    <div className="page container page-resolve">
      {quizData === null && <p>Loading...</p>}

      {quizData !== null && (
        <>
      <h1>{quizData.title}</h1>
      <p>{quizData.description}</p>
      <div>
        {quizData.questions.map((question) => (
          <div key={question.id} className="question">
            <p>{question.question}</p>
            <div className="answers">
            {question.answers.map((answer) => (
              <div key={answer.id} className="answer">
                <label >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={answer.id}
                  onChange={() =>
                    handleAnswerSelection(question.id, answer.id)
                  }
                />
                {answer.answer}</label>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
      </>
      )}
      </div>

  )

}

