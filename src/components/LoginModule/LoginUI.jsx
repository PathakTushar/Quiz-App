import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import classes from './LoginUI.module.css'
const LoginUI = () => {
    const [enteredName, setEnteredName] = useState("");
    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        if (enteredName.trim().length !== 0) {
            setDisableButton(false)
        }
        else {
            setDisableButton(true);
        }
    }, [enteredName]);
    const nameHandler = (event) => {
        setEnteredName(event.target.value)
    }
    return <div className={classes.login}>
        <Card>
            <h1 className={classes.header}>REACT QUIZ</h1>
            <form className={classes.formContainer} >
                <input className={classes.input} type='text' placeholder="Your Name" onChange={nameHandler} value={enteredName} />
                <Link to={{ pathname: '/quiz', state: { enteredName } }}><button className={classes.button} type="submit" disabled={disableButton}>Enter</button></Link>
            </form>
        </Card>
    </div>
};
export default LoginUI;