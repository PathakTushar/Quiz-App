import classes from './Reload.module.css'
const Reload = () => {
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <button className={classes.reload} onClick={refreshPage}>Replay</button>
    );
};
export default Reload;