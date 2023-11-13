"use client"
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import "./results.scss"

export default function ResultQuizPage({params}) {

        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [results, setResults] = useState(null);

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
        return `${parsedDate} - ${time}`;
    }

    return (
        <>
        <div className="last-results">
            <h1>Results</h1>
            <div className="results">
                {results && results.results.map((result, index)=>{
                    return(
                        <div className="result">
                            <div className="result__score">
                                <h3>Score: {result.score}</h3>
                            </div>
                            <div className="result__date">
                                <p>{formatDate(result.participatedAt)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    
    )}