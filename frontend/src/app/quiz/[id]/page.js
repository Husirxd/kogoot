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

    const userAnswersJSON = {
      quizId: quizData.id,
      questions: userAnswers,
      participantId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
    };
    fetch('http://localhost:8080/quizzes/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAnswersJSON),
    })
      .then((response) => response.json())
      .then((data) => {
		console.log(data);
        //reroute to /quiz/score page with score as a parameter
        router.push(`/quiz/score/${data.uid}`);
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
        <div className="quiz-banner">
        <div className="quiz-title">
			<h1>{quizData.title}</h1>
			<p>{quizData.description}</p>
        </div>
        <div>
			<Image src={`http://localhost:8080/image/quiz/${quizData.id}`}
      onError = {e => e.target.style.display = 'none'}  
			width={1440} 
			height={0}
			sizes="100vw"
			style={{ width: '100%', height: '100%' }} // optional
			/>
        </div>
    </div>
    <div>
        {quizData.questions.map((question) => (
          <div key={question.id} className="question">
            <h2>{question.question}</h2>
            <div className="image-container"><Image 
			alt={question.question} 
			onError = {e => e.target.style.display = 'none'} 
			src={`http://localhost:8080/image/question/${question.id}`}  
			width={0}
			height={0}
			sizes="100vw"
			style={{ width: '100%', height: '100%' }} // optional
			/></div>
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
      <div className="flex flex--center"><button className="cta-button" onClick={handleSubmit}>Submit</button></div>
      </>
      )}
      </div>

  )

}

