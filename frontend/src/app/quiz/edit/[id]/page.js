"use client"
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import CheckAuthStatus from '@/service/auth';
import "./edit.scss"

export default function EditQuizPage({params}) {

        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [quizData, setQuizData] = useState(null);

        useEffect(() => {

                const accessToken = localStorage.getItem('token');
                if(!accessToken) {
                    router.push('/account');
                }
                setUser(localStorage.getItem('userId'));
        }, []);

        useEffect(() => {

            fetch(`http://localhost:8080/quizzes/uid/${params.id}`)
            .then((res)=>res.json())
            .then((data)=>{
                setQuizData(data);
            })
            .catch((err)=>{
                console.log(err);
            })
            setLoading(false);

        }, [user]);


        const handleSubmit = async () => {
            const accessToken = localStorage.getItem('token');
            // Send the JSON data to the '/quizzes' endpoint using fetch
            try {
                const response = await fetch('http://localhost:8080/quizzes', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(quizData),
                });
                // Handle the response, get quizId and redirect to /quiz/[quizId]
                if (response.ok) {
                    const data = await response.json();
                    router.push(`/quiz/${data.id}`);
                }else{
                    // Handle errors
                }
            } catch (error) {
                // Handle errors
            }
        };

    return (
        <div className="container page">
            <CheckAuthStatus redirect={true}/>
            <div className='page-edit'>
                <form>
                    <div className="quiz-banner">
                        <label>Title:
                            <input type="text" value={quizData?.title} onChange={(e)=>setQuizData({...quizData, title: e.target.value})}/>
                        </label>
                        <label>Description:
                            <input type="text" value={quizData?.description} onChange={(e)=>setQuizData({...quizData, description: e.target.value})}/>
                        </label>
                    </div>
                    {quizData && quizData.questions.map((question, questionIndex)=>{
                    
                        return(
                            <div className="question" key={questionIndex}>
                                <label>Question:
                                    <input type="text" value={question.question} onChange={(e)=>{
                                        const updatedQuestions = [...quizData.questions];
                                        updatedQuestions[questionIndex].question = e.target.value;
                                        setQuizData({...quizData, questions: updatedQuestions});
                                    }}/>
                                </label>
                                {question.answers.map((answer, answerIndex)=>{
                                    return(
                                        <div className="answer" key={answerIndex}>
                                            <label>
                                                <input type="text" value={answer.answer} onChange={(e)=>{
                                                    const updatedQuestions = [...quizData.questions];
                                                    updatedQuestions[questionIndex].answers[answerIndex].answer = e.target.value;
                                                    setQuizData({...quizData, questions: updatedQuestions});
                                                }}/>
                                            </label>
                                            <label className='checkbox-type'>Correct:
                                                <input type="checkbox" checked={answer.isCorrect ? "checked" : ""} onChange={(e)=>{
                                                    const updatedQuestions = [...quizData.questions];
                                                    updatedQuestions[questionIndex].answers[answerIndex].isCorrect = e.target.checked;
                                                    setQuizData({...quizData, questions: updatedQuestions});
                                                }}/>
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        )


                    })}
                    <h3>Hey you. Nice quiz. Update it?</h3>
                    <button type="button" className="cta-button" onClick={handleSubmit}>Yea, why not</button>
                
                </form>
            </div>
        </div>
    
    
    )}