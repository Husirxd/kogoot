"use client"

import "./profile.scss"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            console.log(data);
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

    const handleDelete = (uid) =>{
        fetch(`http://localhost:8080/quizzes/${uid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <>
        <div className="container profile">
        <h1>Your's Profile</h1>
        <div className="profile-image">
            <Image width={100} height={100} src={`http://localhost:8080/users/avatar/${user?.id}`} />
        </div>
        {loading && <div>Loading...</div>}  
            <h2>Hello: {user?.nickname}</h2>
        </div>
        <div className="container quizzes-list">
           <button><Link href={`/create`}>Create New!</Link></button>
            {quizzes && quizzes.map((quiz)=>{
                return (
                    <div className="quiz-tile">
                        <div className="quiz-category pile">{quiz.categories[0]?.categoryName}</div>
                        <div className='quiz-image'></div>
                        <h2>{quiz.title}</h2>
                        <p>{quiz.description}</p>
                        <Link href={`/quiz/edit/${quiz.uid}`}>Edit</Link>
                        <Link href={`/quiz/${quiz.uid}`}>Start</Link>
                        <button onClick={(e)=>handleDelete(quiz.uid)}>Delete</button>
                    </div>
                )
            })}
        </div>
       
        </>
    )
}