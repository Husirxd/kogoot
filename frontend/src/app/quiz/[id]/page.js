"use client"
import "./quiz.scss"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Page({ params }) {
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/quizzes/uid/"+params.id)
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
      participantId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
    };
    // Send the JSON object to the server for scoring (you'll need to implement this part on the server)
    // Example AJAX request
    fetch('http://localhost:8080/quizzes/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAnswersJSON),
    })
      .then((response) => response.json())
      .then((data) => {
        //reroute to /quiz/score page with score as a parameter
        router.push(`/quiz/score/?s=${data.score}`);
      })
      .catch((error) => {
        console.error('Error scoring quiz:', error);
      });
  };



  return(
    <div className="page page-resolve container">
      {quizData === null && <p>Loading...</p>}

      {quizData !== null && (
        <>
      <h1>{quizData.title}</h1>
      <p>{quizData.description}</p>

      <div>
        {quizData.questions.map((question) => (
          <div key={question.id} className="question">
            <p>{question.question}</p>
            <Image src={`http://localhost:8080/image/question/${question.id}`} width={500} height={500} />
            <div className="answers">
            {question.answers.map((answer) => (
              <div key={answer.id} className="answer">
                <label>
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

