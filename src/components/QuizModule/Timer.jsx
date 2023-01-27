import { useState, useEffect } from "react";

const Timer = ({ setStop, activeQuestion }) => {
    const [timer, setTimer] = useState(30);
    useEffect(() => {
        if (timer <= 0) {
            setStop(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        return () => { clearInterval(interval) }
    }, [timer, setStop]);

    useEffect(() => {
        setTimer(30);
    }, [activeQuestion]);

    return timer;
};
export default Timer;