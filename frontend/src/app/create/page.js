"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./create.scss"
export default function CreateQuiz() {
    const router = useRouter()
    const [user, setUser] = useState();
    useEffect(() => {

        const accessToken = localStorage.getItem('token');
        if(!accessToken) {
            router.push('/account');
        }
        setUser(localStorage.getItem('userId'));  

        if(!user){
            return;
        }

    }, []);

    useEffect(() => {
        if(!user){
            return;
        }
        quizData.userId = user?.id;
        console.log(user?.id);
    }, [user]);


    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        status: 'published',
        userId: user?.id,
        thumbnail: '',
        categoriesIds: [],
        questions: [
            {
                question: '',
                image: '',
                answers: [
                    {
                        answer: '',
                        isCorrect: false,
                    },
                ],
            },
        ],
    });

    const handleQuestionAdd = () => {
        setQuizData({
            ...quizData,
            questions: [
                ...quizData.questions,
                {
                    question: '',
                    image: '',
                    answers: [
                        {
                            answer: '',
                            isCorrect: false,
                        },
                    ],
                },
            ],

        });
    };

    const handleAnswerAdd = (questionIndex) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[questionIndex].answers.push({
            answer: '',
            isCorrect: false,
        });
        setQuizData({
            ...quizData,
            questions: updatedQuestions,
        });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        let userId = localStorage.getItem('userId');
        formData.append('title', quizData.title);
        formData.append('description', quizData.description);
        formData.append('status', quizData.status);
        formData.append('userId', userId);
        formData.append('thumbnail', quizData.thumbnail);
        formData.append('categoriesIds', quizData.categoriesIds);
        quizData.questions.forEach((question, index) => {
            formData.append(`questions[${index}][question]`, question.question);
            formData.append(`questionsImage-${index}`, question.image);
            question.answers.forEach((answer, answerIndex) => {

                formData.append(`questions[${index}][answers][${answerIndex}][answer]`, answer.answer);
                formData.append(`questions[${index}][answers][${answerIndex}][isCorrect]`, answer.isCorrect);
            });
        });

        // Create a new FormData object and append the quizData to it

        const accessToken = localStorage.getItem('token');
        // Send the JSON data to the '/quizzes' endpoint using fetch
        try {
            const response = await fetch('http://localhost:8080/quizzes', {
                method: 'POST',
                body: formData,
                headers: {
                    //send files with form data
                    // 'Content-Type': 'multipart/form-data',
            
                    'Authorization': `Bearer ${accessToken}`,
                },
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
        <div className='container page'>
            <div className='page-create'>
            <h1>Create Quiz</h1>
            <form>
                <label>
                    Title:
                    <input
                        type="text"
                        value={quizData.title}
                        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        value={quizData.description}
                        onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                    />
                </label>
                <label>
                    Thumbnail:
                    <input
                        type="file"
                        name='thumbnail'
                        onChange={(e) => setQuizData({ ...quizData, thumbnail: e.target.files[0] })}
                    />
                </label>
                <label>
                    Categories:
                    <select
                        multiple
                        value={quizData.categoriesIds}
                        onChange={(e) => setQuizData({ ...quizData, categoriesIds: Array.from(e.target.selectedOptions, (option) => option.value) })}
                    >
                        {/* Populate categories from a prefetch list */}
                        <option value="1">Cuisine</option>
                        {/* Add more category options here */}
                    </select>
                </label>

                <div className='questions'>
                <h2>Questions</h2>
                {quizData.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className='question'>
                        <label>
                            Question:
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => {
                                    const updatedQuestions = [...quizData.questions];
                                    updatedQuestions[questionIndex].question = e.target.value;
                                    setQuizData({ ...quizData, questions: updatedQuestions });
                                }}
                            />
                        </label>
                        <label>
                            Image:
                            <input
                                type="file"
                                name='file'
                                onChange={(e) => {
                                    //add image to images array
                                    // const updatedImages = [...quizData.images];
                                    // updatedImages[questionIndex] = e.target.files[0];
                                    // setQuizData({ ...quizData, images: updatedImages });

                                    const updatedQuestions = [...quizData.questions];
                                    updatedQuestions[questionIndex].image = e.target.files[0];
                                    setQuizData({ ...quizData, questions: updatedQuestions });

                                }}
                            />
                        </label>
                        <div className='answers'>
                        {question.answers.map((answer, answerIndex) => (
                            <div key={answerIndex}>
                                Answer:
                                <div className='answer'>
                                    <input
                                        type="text"
                                        value={answer.answer}
                                        onChange={(e) => {
                                            const updatedQuestions = [...quizData.questions];
                                            updatedQuestions[questionIndex].answers[answerIndex].answer = e.target.value;
                                            setQuizData({ ...quizData, questions: updatedQuestions });
                                        }}
                                    />
                                    <span>
                                    <input
                                        type="checkbox"
                                        checked={answer.isCorrect}
                                        onChange={(e) => {
                                            const updatedQuestions = [...quizData.questions];
                                            updatedQuestions[questionIndex].answers[answerIndex].isCorrect = e.target.checked;
                                            setQuizData({ ...quizData, questions: updatedQuestions });
                                        }}
                                    /> Is correct
                                    </span>
                                </div>
                            </div>
                        ))}
                        </div>
                        <button type="button" onClick={() => handleAnswerAdd(questionIndex)}>
                            Add New Answer
                        </button>
                    </div>
                ))}
                </div>
                <button type="button" onClick={handleQuestionAdd}>
                    Add New Question
                </button>
                <div className='flex flex--center flex--column'>
                <h3>Hey you. Nice quiz. Create it?</h3>
                <button type="button" onClick={handleSubmit}>Yea, why not</button>
                </div>
            </form>
            </div>
        </div>
    );
}