"use client"

import "./profile.scss"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CheckAuthStatus from "@/service/auth";
export default function ProfilePage(){
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {        
        const userId = localStorage.getItem('userId');
        if(!userId || userId == undefined){
            return;
        }
        fetch(`http://localhost:8080/users/${userId}`)
        .then((res)=>res.json())
        .then((data)=>{
            setUser(data);
        })
        setLoading(false);
    }, []);

    useEffect(() => {
        if(!user){
            return;
        }
        fetch(`http://localhost:8080/quizzes/user/${user.id}`)
        .then((res)=>res.json())
        .then((data)=>{
            
            setQuizzes(data);
        })
        .catch((err)=>{
            //console.log(err);
        })
    }, [user]);

    const handleDeleteConfirm = (uid) =>{
        const confirmation = confirm('Are you sure you want to delete this quiz?');
        if(confirmation){
            handleDelete(uid);
        }
    }

    const handleDelete = (uid) =>{
        fetch(`http://localhost:8080/quizzes/${uid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setQuizzes((prevQuizzes)=>{
                return prevQuizzes.filter((quiz)=>quiz.uid !== uid);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="page">
        <CheckAuthStatus redirect={true}/>
        <div className="container profile">
            <div className="profile__header">
                <div className="profile-image">
                    { user && <Image priority={1} alt={user?.nickname} onError={(e)=>{e.target.style = "display:none;"}} width={200} height={200} src={`http://localhost:8080/image/user/${user?.id}`} />}
                </div>
                {loading && <div>Loading...</div>}  
                    <h2>{user?.nickname}</h2>
                </div>
            </div>
            <div className="flex flex--center"><button className="cta-button"><Link href={`/create`}>Create New!</Link></button></div>
        <div className="container quizzes-list--profile">
            {quizzes && quizzes?.map((quiz)=>{
                return (
                    <div className="quiz-tile" key={quiz.id}>
                        <div className='quiz-tile__info'>
                            <div className='quiz-image'><Image width={400} height={200} onError={(e)=>{e.target.style = "display:none;"}} src={`http://localhost:8080/image/quiz/${ quiz && quiz.id}`}/></div>
                            <h2>{quiz.title}</h2>
                        </div>
                        <div className="quiz-tile__options">
                        <Link className="option" href={`/quiz/${quiz.uid}`}>Solve</Link>
                        <Link className="option" href={`/quiz/edit/${quiz.uid}`}>Edit</Link>
                        <Link className="option" href={`/quiz/results/${quiz.uid}`}>Results</Link>
                        <button onClick={(e)=>handleDeleteConfirm(quiz.uid)}>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
       
        </div>
    )
}