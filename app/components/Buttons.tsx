import React from 'react'
import styles from "./../page.module.css"

const Buttons = ({ falseAnswers, cellError } : { falseAnswers : number , cellError : number | null}) => {

    const errorColor = cellError ? '#FF6961' : '#171717';
    const errorStyle = {
        color: errorColor
    }

  return (
    <div className={styles.buttons}>
        <h1>
            Sudoku Game    
        </h1>
        <div>
            New Game?
            <ul>
                <button>Easy</button>
                <button>Medium</button>
                <button>Hard</button>
            </ul>
        </div>
        <div style={errorStyle}>
            {falseAnswers === 3 ? 'Game Over!' : falseAnswers < 2 ? `You have ${3 - falseAnswers} errors left!` : `This is your last chance!`}
        </div>
        
    </div>
  )
}

export default Buttons