"use client"
import Link from 'next/link'
import styles from './QuizTile.scss'
import { useEffect, useState } from 'react';
const QuizTile = ({ quiz }) => {

    const [category, setCategory] = useState(null);

    useEffect(() => {
        console.log(quiz);
        setCategory(quiz.categories[0]);
    }
    , []);

    return (
        <div className={`quiz-tile quiz--${category?.category}`}>
            <dic class="quiz-category pile">{category && category?.categoryName || "Quiz"}</dic>
            <div className='quiz-image'></div>
            <h2><Link href={`/quiz/${quiz.id}`}>{quiz.title}</Link></h2>
            <p>{quiz.description}</p>
            <Link href={`/quiz/${quiz.id}`}><button>Start</button></Link>
        </div>
    )


};

export default QuizTile;