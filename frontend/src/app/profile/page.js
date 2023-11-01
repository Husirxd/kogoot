"use client"

import "./profile.scss"
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function ProfilePage(){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        
        const userId = localStorage.getItem('userId');
        console.log(userId);
        if(!userId || userId == undefined){
            return;
        }
        fetch(`http://localhost:8080/users/${userId}`)
        .then((res)=>res.json())
        .then((data)=>{
            setUser(data);
        })
        .catch((err)=>{
            console.log(err);
        })
        setLoading(false);
    }, []);

    useEffect(() => {
        if(!user){
            return;
        }
        fetch(`http://localhost:8080/quizzes?authorId=${user.id}`)
        .then((res)=>res.json())
        .then((data)=>{
            setQuizzes(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [user]);


    return (
        <>
        <div className="container profile">
        <h1>Your's Profile</h1>
        {loading && <div>Loading...</div>}  
            <h2>Hello: {user?.nickname}</h2>
        </div>
        <div className="container quizzes-list">
            {quizzes && quizzes.map((quiz)=>{
                return (
                    <div className="quiz-tile">
                        <div className="quiz-category pile">{quiz.categories[0]?.categoryName}</div>
                        <div className='quiz-image'></div>
                        <h2>{quiz.title}</h2>
                        <p>{quiz.description}</p>
                        <Link href={`/quiz/edit/${quiz.uid}`}>Edit</Link>
                    </div>
                )
            })}
        </div>
       
        </>
    )
}