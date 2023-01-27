import { useLocation } from "react-router-dom";
import Home from "../Home";

const Quiz = () => {
    const location = useLocation();
    return <Home name={location.state.enteredName} />
};
export default Quiz;