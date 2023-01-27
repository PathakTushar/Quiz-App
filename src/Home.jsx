import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionSet from './components/QuizModule/QuestionSet';
import Reload from './components/QuizModule/Reload';
import Timer from './components/QuizModule/Timer';
import Card from './components/UI/Card';
import classes from './Home.module.css'
const prizePool = [
    {
        id: 1,
        amount: "$ 1000"
    },
    {
        id: 2,
        amount: "$ 2000"
    },
    {
        id: 3,
        amount: "$ 5000"
    },
    {
        id: 4,
        amount: "$ 10000"
    },
    {
        id: 5,
        amount: "$ 20000"
    },
    {
        id: 6,
        amount: "$ 40000"
    },
    {
        id: 7,
        amount: "$ 80000"
    },
    {
        id: 8,
        amount: "$ 160000"
    },
    {
        id: 9,
        amount: "$ 320000"
    },
    {
        id: 10,
        amount: "$ 640000"
    },
].reverse();

//v9Zv8lEeMWf7T2Kjha5c9kRW6Zo6jZ8eZUmOk37P
//https://quizapi.io/api/v1/questions?apiKey=v9Zv8lEeMWf7T2Kjha5c9kRW6Zo6jZ8eZUmOk37P&category=linux&difficulty=Easy&limit=15

const Home = ({ name }) => {
    const [activeQuestion, setActiveQuestion] = useState(1);
    const [stop, setStop] = useState(false);
    const [moneyEarned, setMoneyEarned] = useState("$ 0");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        activeQuestion > 1 && setMoneyEarned(prizePool.find(money => money.id === activeQuestion - 1).amount)
        if (activeQuestion > 10) {
            setStop(true)
        }
    }, [activeQuestion]);

    const loadingHandler = (loadingTag) => {
        setLoading(loadingTag);
    };
    return <div className={classes.home}>
        <div className={classes.main}>
            {stop ? <>
                <Link to='/'><button className={classes.backButton}>Home</button></Link>
                <div className={classes.finalScreen}>
                    <h1 className={classes.score}>You win {moneyEarned}</h1>
                    <Reload />
                </div></> : (
                <>
                    {!loading && <div className={classes.upperHalf}>
                        <span className={classes.timerLogo}>
                            <Timer setStop={setStop} activeQuestion={activeQuestion} />
                        </span>
                    </div>}
                    <QuestionSet activeQuestion={activeQuestion} setStop={setStop} setActiveQuestion={setActiveQuestion} onSetLoading={loadingHandler} />
                </>
            )}
        </div>
        {activeQuestion <= 10 && <div className={classes.pyramid}>
            <h1 className={classes.userName}>{name}</h1>
            <ul className={classes.prizePool}>
                {prizePool.map(prize => (
                    <Card key={prize.id}>
                        <li className={`${classes.prizePoolItem} ${activeQuestion === prize.id ? classes.active : ""}`} >
                            <span className={classes.prizePoolNumber} >{prize.id}</span>
                            <span className={classes.prizePoolAmount} >{prize.amount}</span>
                        </li>
                    </Card>
                ))}
            </ul>
        </div>}
    </div>
}
export default Home;