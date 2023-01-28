import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuestionSet.module.css'

const QuestionSet = ({ activeQuestion, setStop, setActiveQuestion, onSetLoading }) => {
    const [quizData, setQizData] = useState([]);
    const [question, setQuestion] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [requiredClasses, setRequiredClasses] = useState();

    useEffect(() => {
        fetch('https://quizapi.io/api/v1/questions?apiKey=v9Zv8lEeMWf7T2Kjha5c9kRW6Zo6jZ8eZUmOk37P&category=linux&difficulty=Easy&limit=10')
            .then((response) => { return response.json() })
            .then(data => {
                setQizData(data);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, []);
    useEffect(() => {
        if (!loading && activeQuestion <= 10) {
            setQuestion(quizData[activeQuestion - 1].question);
            setOptions(Object.values(quizData[activeQuestion - 1].answers).filter(ele => ele !== null));
            setCorrectAnswer(Object.values(quizData[activeQuestion - 1].answers)[Object.values(quizData[activeQuestion - 1].correct_answers).indexOf("true")]);
            onSetLoading(loading);
        }
    }, [loading, activeQuestion, quizData, onSetLoading]);

    const clickHandler = (event) => {
        event.preventDefault();
        setSelectedAnswer(event.target.innerText);
        setRequiredClasses(event.target.innerText === correctAnswer ? `${classes.answer} ${classes.correct}` : `${classes.answer} ${classes.wrong}`);
        setTimeout(() => {
            if (event.target.innerText === correctAnswer && activeQuestion <= 10) {
                setActiveQuestion((previous) => previous + 1);
            }
            else {
                setStop(true);
            }
        }, 2000);
    }
    return <>
        {loading && <div className={classes.loader}><LoadingSpinner /></div>}
        {(!loading && activeQuestion <= 10) &&
            <div key={quizData[activeQuestion - 1].id} className={classes.questionContainer}>
                <div className={classes.question} >{question}</div>
                <div className={classes.options} >
                    {options.map((opt) => (
                        <div className={selectedAnswer === opt ? requiredClasses : classes.answer} key={Math.random().toString()} onClick={clickHandler}>{opt}</div>
                    ))}
                </div>
            </div>}
    </>
};

export default React.memo(QuestionSet);