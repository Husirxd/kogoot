"use client"
import Link from 'next/link'
import styles from './QuizTile.scss'
import { useEffect, useState } from 'react';
import Image from 'next/image'; 
const QuizTile = ({ quiz }) => {

    const [category, setCategory] = useState(null);

    useEffect(() => {
        setCategory(quiz.categories[0]);
    }
    , []);

    return (
        <div className={`quiz-tile quiz--${category?.category}`}>
            <div className="quiz-category pile">{category && category?.categoryName || "Quiz"}</div>
            <div className='quiz-image'><Link href={`/quiz/${quiz.uid}`}><Image width={405} height={200} onError={(e)=>{e.target.style="display:none;"}} src={`http://localhost:8080/image/quiz/${quiz.id}`}/></Link></div>
            <h2><Link href={`/quiz/${quiz.uid}`}>{quiz.title}</Link></h2>
            <p>{quiz.description}</p>
            <Link href={`/quiz/${quiz.uid}`}><button className='cta-button'>Start</button></Link>
        </div>
    )


};

export default QuizTile;