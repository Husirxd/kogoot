"use client"
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import "./results.scss"

export default function ResultQuizPage({params}) {

        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [results, setResults] = useState(null);
        const [quiz, setQuiz] = useState(null);
        useEffect(() => {

                const accessToken = localStorage.getItem('token');
                if(!accessToken) {
                    router.push('/account');
                }
                setUser(localStorage.getItem('userId'));
                fetch(`http://localhost:8080/auth/validate`,{
                    headers: {
                        'authorization': `Bearer ${accessToken}`,
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    if(data.statusCode == 401){
                        router.push('/account');
                    }
                })

                setUser(localStorage.getItem('userId'));
        }, []);

        useEffect(() => {
            //append get parameter to url
            if(!user){
                return;
            }
            fetch(`http://localhost:8080/result?userId=${user}&result=${params.id}`,{
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                setResults(data);
                setQuiz(data.quiz);

            })
            .catch((err)=>{
                console.log(err);
            })
            setLoading(false);
        }, [user]);


    const formatDate = (date) => {
        const newDate = new Date(date);
        const parsedDate = newDate.toLocaleDateString();
        const time = newDate.toLocaleTimeString();
        return `${parsedDate} at ${time}`;
    }

    const questionList = [];

    const handleAnwsersCheck = (answers) => {
        const answersArray = JSON.parse(answers); 

        //this sort is for optimalization find method below
        answersArray.sort((a,b)=>{
            return a.questionId - b.questionId;
        })
        const questionList = quiz.questions.map((question, index)=>{
            const answer = answersArray.find((answer)=>{
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
                </div>
            )
        })
        return questionList;
    }
    
    const generateHistogram = (results) => {
    
        const maxScore = quiz.questions.length;
        const histogram = [];
        for(let i = 0; i <= maxScore; i++){
            histogram.push(0);
        }
        results.results.forEach((result)=>{
            histogram[result.score]++;
        })
        return(
            <div className='hist'>
                {histogram.map((score, index)=>{
                    return(
                        <div key={index} className='hist__bar' style={{height: `${score*100/results.results.length}%`, backgroundColor: `hsl(${(score*100/maxScore)%256},100%,50%)`}}>
                            <p>{index}pkt.</p>
                        </div>
                    )
                })}
            </div>
        )

    }

    return (
        <>
        <div className="last-results page container">
            <h1>Results</h1>
            <div className='quiz-info'>
                <h2>Quiz: {quiz?.title}</h2>
                <p>{quiz?.description}</p>
            </div>
            <div className="result-info">
                <h3>Histogram</h3>
                {results && generateHistogram(results)}

            </div>
            <div className="results">
                {results && results.results.map((result, index)=>{
                    return(
                        <div className="result" key={result.id}>
                            <div className="result__date">
                                <p>Participated: {formatDate(result.participatedAt)}</p>
                            </div>
                            {result.participant && <div className="result__participant">
                                <h3>Participant: {result.participant.nickname}</h3>
                            </div>}

                            <div className="result__score">
                                <h3>Score: {result.score}</h3>
                            </div>

                            <div className='question-list'>
                                {result.answers && handleAnwsersCheck(result.answers).map((question)=>{
                                return <div key={question.id}>{question}</div>
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    
    )}