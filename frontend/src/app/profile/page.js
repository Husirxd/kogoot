"use client"

import "./profile.scss"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function ProfilePage(){
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        
        const accessToken = localStorage.getItem('token');
        if(!accessToken) {
            router.push('/account');
        }
        console.log(accessToken);
        console.log(localStorage.getItem('userId'));

        fetch('http://localhost:8080/auth/validate',{
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.statusCode == 401){
                //router.push('/account');
            }
        })
        .catch((err)=>{
           
            if(err.statusCode == 401){
                console.log(err);
                //router.push('/account');
            }
        })


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
        fetch(`http://localhost:8080/quizzes?authorId=${user.id}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setQuizzes(data);
        })
        .catch((err)=>{
            console.log(err);
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
        <div className="container profile">
            <div className="profile__header">
                <div className="profile-image">
                    { user && <Image priority={1} alt={user?.nickname} onError={(e)=>{e.target.style = "display:none;"}} width={200} height={200} src={`http://localhost:8080/image/user/${user && user?.id}`} />}
                </div>
                {loading && <div>Loading...</div>}  
                    <h2>{user?.nickname}</h2>
                </div>
            </div>
        <div className="container quizzes-list">
           <div className="flex flex--center"><button className="cta-button"><Link href={`/create`}>Create New!</Link></button></div>
            {quizzes && quizzes.map((quiz)=>{
                return (
                    <div className="quiz-tile" key={quiz.id}>
                        <div className='quiz-tile__info'>
                        <div className='quiz-image'><Image width={80} height={80} onError={(e)=>{e.target.style = "display:none;"}} src={`http://localhost:8080/image/quiz/${ quiz && quiz.id}`}/></div>
                        <h2>{quiz.title}</h2>
                        </div>
                        <div class="quiz-tile__options">
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