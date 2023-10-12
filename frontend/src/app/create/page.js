"use client"
import { useState } from 'react';

export default function CreateQuiz() {
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        status: 'published',
        userId: 2, // You can retrieve this value from local storage or a cookie
        categoriesIds: [],
        questions: [
            {
                question: '',
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
        const accessToken = localStorage.getItem('token');
        // Send the JSON data to the '/quizzes' endpoint using fetch
        try {
            const response = await fetch('http://localhost:3000/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(quizData),
            });
            // Handle the response as needed
        } catch (error) {
            // Handle errors
        }
    };

    return (
        <div>
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
                    Categories:
                    <select
                        multiple
                        value={quizData.categoriesIds}
                        onChange={(e) => setQuizData({ ...quizData, categoriesIds: Array.from(e.target.selectedOptions, (option) => option.value) })}
                    >
                        {/* Populate categories from a prefetch list */}
                        <option value="1">Category 1</option>
                        {/* Add more category options here */}
                    </select>
                </label>

                {quizData.questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
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

                        {question.answers.map((answer, answerIndex) => (
                            <div key={answerIndex}>
                                <label>
                                    Answer:
                                    <input
                                        type="text"
                                        value={answer.answer}
                                        onChange={(e) => {
                                            const updatedQuestions = [...quizData.questions];
                                            updatedQuestions[questionIndex].answers[answerIndex].answer = e.target.value;
                                            setQuizData({ ...quizData, questions: updatedQuestions });
                                        }}
                                    />
                                </label>

                                <label>
                                    Correct:
                                    <input
                                        type="checkbox"
                                        checked={answer.isCorrect}
                                        onChange={(e) => {
                                            const updatedQuestions = [...quizData.questions];
                                            updatedQuestions[questionIndex].answers[answerIndex].isCorrect = e.target.checked;
                                            setQuizData({ ...quizData, questions: updatedQuestions });
                                        }}
                                    />
                                </label>
                            </div>
                        ))}

                        <button type="button" onClick={() => handleAnswerAdd(questionIndex)}>
                            Add New Answer
                        </button>
                    </div>
                ))}

                <button type="button" onClick={handleQuestionAdd}>
                    Add New Question
                </button>

                <button type="button" onClick={handleSubmit}>
                    Create Quiz
                </button>
            </form>
        </div>
    );
}