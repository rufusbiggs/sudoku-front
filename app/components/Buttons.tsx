import React from 'react'
import styles from "./../page.module.css"

const Buttons = ({ onNewGame, falseAnswers, cellError } : { onNewGame : Function, falseAnswers : number , cellError : number | null}) => {

    const errorColor = cellError ? '#FF6961' : '#171717';
    const errorStyle = {
        color: errorColor
    }

  return (
    <div className={styles.buttons}>
        <div>
            New Game?
            <ul>
                <button onClick={() => onNewGame(1)}>Easy</button>
                <button onClick={() => onNewGame(2)}>Medium</button>
                <button onClick={() => onNewGame(3)}>Hard</button>
            </ul>
        </div>
        <div style={errorStyle}>
            {falseAnswers === 3 ? 'Game Over!' : falseAnswers < 2 ? `You have ${3 - falseAnswers} errors left!` : `This is your last chance!`}
        </div>
    </div>
  )
}

export default Buttons