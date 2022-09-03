import Die from './components/Die'
import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App(){

    function generateNewDice(){
        return{
            id:nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld:false
        }
    }
    const allNewDice = ()=>{
        const newDice = []
        for(let i = 0; i < 10; i++){
            newDice.push(generateNewDice())
        }
        return newDice
    }


    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    useEffect(()=>{
       const allHeld = dice.every(die => die.isHeld)
       const firstValue = dice[0].value
       const allSameValue = dice.every(die => die.value === firstValue)
       if (allHeld && allSameValue){
           setTenzies(true)
           console.log("You won!")
       }
    },[dice])
    function rollDice(){
        if(!tenzies){
            setDice(oldDice => oldDice.map(die =>{
                return die.isHeld ?
                    die: generateNewDice()
            }
        ))
        }
        else{
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    function holdDice(id){
        setDice(oldDice => oldDice.map(die =>{
            return die.id === id ? { ...die, isHeld: !die.isHeld}:
            die
        }))
    }
    const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)
    return(
        <main>
            {tenzies && <Confetti/>}
            <h1 className='title'>{tenzies ? "YOU WON!!": "Tenzies"}</h1>
            <p className='instructions'>Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className='dice-container'>
                {diceElements}
            </div>
            <button className='roll-btn' onClick={rollDice}> {tenzies ? "New Game" : "Roll"} </button>
        </main>
    ) 
}

/**
 * Real Dots on the dice : CSS
 * Track the no. of rolls
 * Track the time it took to win
 * Save your best time to localStorage
 */

/**
 * Quizzical Trivia
 * Two screens
 * Pull 5 questions from the OTDB API
 * Tally Correct ansers after 'Check answers' is clicked
 */