
export default function Die(props){
    const styles ={
        backgroundColor: props.isHeld ? "#59e391" : "#F5F5F5"
    }
    return(
        <div className="die-face" style={styles} onClick={props.holdDice}>
            <h2 className="die-number">{props.value}</h2>
        </div>
    )
}