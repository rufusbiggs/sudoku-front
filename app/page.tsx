'use client';
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import TileRow from "./components/TileRow";
import Buttons from "./components/Buttons";

// Testing boards
let CODE = '000000000072001030180006720700200560500000002069003007024300091030600450000000000'
let SOLUTION = '396427185472581936185936724713248569548769312269153847824375691937612458651894273'

export default function Home() {

  const [startCode, setStartCode] = useState('')
  const [currentCode, setCurrentCode] = useState('');
  const [solution, setSolution] = useState('');
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [falseAnswers, setFalseAnswers] = useState(0);
  const [cellError, setCellError] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const splitCodeToRows = (code: string) => {
    const rows = [];
    const numbers = code.split('').map(e => Number(e));
    for (let i = 0; i < code.length; i += 9) {
      rows.push(numbers.slice(i, i + 9));
    }

    return rows
  }

  const handleCellClick = (rowIdx : number, tileIdx : number) => {
    const idx : number = (rowIdx * 9) + tileIdx;
    setSelectedCell(idx);
  }

  const endGame = () => {
    setGameOver(true);
    // show solution
  }

  const handleIncorrectNum = () => {
    if (selectedCell !== null) {
      setCellError(selectedCell);
      setTimeout(() => {
        setCellError(null);
      }, 1000);
    }
    if (falseAnswers === 2) { // 3 incorrect guesses and you loose
      endGame()  
    }
    const falseGuesses = falseAnswers;
    setFalseAnswers(falseGuesses + 1);
  }

  useEffect(() => {
    const fetchSudoku = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/generate?difficulty=2');
        const { board, solution } = await response.json();
        setStartCode(board);
        setCurrentCode(board);
        setSolution(solution);
        console.log(board);
      } catch (error) {
        console.error("Error fetching Sudoku data:", error);
      }
    };

    fetchSudoku();
    console.log('hello world')
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedCell === null || isNaN(Number(e.key)) || e.key === ' ') return
      const codeCopy = currentCode;
      const updatedCode = codeCopy.slice(0, selectedCell) + e.key + codeCopy.slice(selectedCell + 1);
      if (solution[selectedCell] !== updatedCode[selectedCell]) {
        handleIncorrectNum()
      } else {
        setCurrentCode(updatedCode);
      }
      setSelectedCell(null);
    };

    window.addEventListener('keydown', handleKeyPress);
    return (() => {
      window.removeEventListener('keydown', handleKeyPress);
    });
  }, [selectedCell, currentCode, solution])


  return (
    <main className={styles.main}>
      <div>
        {splitCodeToRows(currentCode).map((row, idx) => {
          return (
            <TileRow 
              idx={idx} 
              rowNumbers={row} 
              rowIdx={idx} 
              cellError={cellError}
              handleCellClick={handleCellClick} 
              selectedCell={selectedCell}
            />
          )
        })}
      </div>
      <div>
        <Buttons falseAnswers={falseAnswers} cellError={cellError} />
      </div>
    </main>
  );
}
