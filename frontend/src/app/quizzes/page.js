"use client";

import { useState, useEffect } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import QuizTile from '@/components/QuizTile/QuizTile';

import "./quizzes.scss";
const Page = () =>{
    const [quizzes, setQuizzes] = useState([]);
    const [limit, setLimit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);




    const handleSearch = (e) => {
        e.preventDefault();
        let searchQuery = e.target.value;
        if(searchQuery === ''){
            setLimit(3);
            setOffset(0);
            getQuizzes(limit,offset).then((quizzes) => {
                setQuizzes(quizzes);
            });
        }
        if( searchQuery.length < 4) return;

        fetch(`http://localhost:8080/quizzes/search/?search=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            setQuizzes(data);
        });
    }
    
    const handleChangeCategory = (e) => {
        e.preventDefault();
        let categoryId = e.target.value;
        if(categoryId === 'all'){
            setLimit(3);
            setOffset(0);
            getQuizzes(limit,offset).then((quizzes) => {
                setQuizzes(quizzes);
            });
            return;
        }

        fetch(`http://localhost:8080/quizzes/category/${categoryId}`)
        .then(response => response.json())
        .then(data => {


            //check if data is empty
            if(data.length === 0) return;
            console.log(data);
            setQuizzes(data);
        });

    }
    
    const getQuizzes = async (limit,offset)  => {
        const data = await fetch(`http://localhost:8080/quizzes?limit=${limit}&offset=${offset}`);
        const posts = await data.json();
        return posts;
      };
    
    const handleLoadMore = () => {
        setOffset(offset + limit);
        getQuizzes(limit,offset).then((quizzes) => {
            setQuizzes((prevQuizzes) => {
                return [...new Set([...prevQuizzes, ...quizzes])].filter((quiz, index, self) =>
                index === self.findIndex((t) => (
                t.id === quiz.id
                ))
            );
            });
            setHasMore(quizzes.length > 0);
            setLoading(false);
        });
    } 
    

    useEffect(() => {
        setLoading(true);
        getQuizzes(limit,offset).then((quizzes) => {
            setQuizzes((prevQuizzes) => {
                return [...new Set([...prevQuizzes, ...quizzes])].filter((quiz, index, self) =>
                index === self.findIndex((t) => (
                t.id === quiz.id
                ))
            );
            });
            setHasMore(quizzes.length > 0);
            setLoading(false);
        });
    }, [limit, offset]);

    return (
    <div className="page container page--quizzes">
        <SearchBar handleChangeCategory={handleChangeCategory} handleSearch={handleSearch}/>
        <div className='quizzes-grid'>
        {quizzes && quizzes.map((post) => (
            <QuizTile key={post.id} quiz={post} />
        ))}
      
        </div>
        <div className='flex flex--center'><button className="cta-button" onClick={handleLoadMore} disabled={!hasMore || loading}>Load More</button></div>
    </div>
    );
}

export default Page;