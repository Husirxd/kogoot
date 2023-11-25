"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./score.scss";
const Page = ({params}) => {
    const searchParams = useSearchParams();
    const [quiz, setQuiz] = useState(null);
    const [result, setResult] = useState(null);
    const [answers, setAnswers] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8080/result/${params.id}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setQuiz(data.quiz);
            setResult(data.result);
        })
    },[]);

    useEffect(() => {
        if(result === null) return;
        const answersArray = JSON.parse(result.answers); 
        setAnswers(answersArray);
    },[result]);

    const handleAnwsersCheck = () => {
 

        //this sort is for optimalization find method below
        answers.sort((a,b)=>{
            return a.questionId - b.questionId;
        })
        const questionList = quiz.questions.map((question, index)=>{
            const answer = answers.find((answer)=>{
                return answer.questionId == question.id;
            })
            const chosenAnswerId = answer.chosenAnswerId;
            const chosenAnswer = question.answers.find((answer)=>{
                return answer.id == chosenAnswerId;
            })
            return(
                <div className='question'>
                    <h4>Question: {question.question}</h4>
                    <div className='answer'>
                        <p className={chosenAnswer.isCorrect ? 'correct' : 'incorrect'}>Chosen: {chosenAnswer.answer}</p>
                    </div>
                    {chosenAnswer && !chosenAnswer.isCorrect && <p>Correct answer: {question.answers.find((answer)=>{return answer.isCorrect})?.answer}</p>}
                </div>
            )
        })
        return questionList;
    }



    return(
        <div className="page container page-score">
        {quiz === null && <p>Loading...</p>}
        {result !== null && (
            <>
                <h1>{quiz?.title}</h1>
                <h3>Score: {result?.score}/{quiz.questions.length}</h3>
            </>
        )}
            <div className="answers question-list">
            {answers && handleAnwsersCheck(result.answers).map((question)=>{
                    return <div key={question.id}>{question}</div>
            })}
            </div>
        </div>
    )
}

export default Page;