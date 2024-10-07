'use client';
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import TileRow from "./components/TileRow";
import Buttons from "./components/Buttons";

export default function Home() {

  const [currentCode, setCurrentCode] = useState('');
  const [solution, setSolution] = useState('');
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [falseAnswers, setFalseAnswers] = useState(0);
  const [cellError, setCellError] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false); // For solution fade-in

  const splitCodeToRows = (code: string) => {
    const rows = [];
    const numbers = code.split('').map(e => Number(e));
    for (let i = 0; i < code.length; i += 9) {
      rows.push(numbers.slice(i, i + 9));
    }

    return rows
  }

  const handleCellClick = (rowIdx : number, tileIdx : number) => {
    if (gameOver) return;
    const idx : number = (rowIdx * 9) + tileIdx;
    setSelectedCell(idx);
  }

  
  const endGame = () => {
    // Show a transition before revealing the solution
    setTimeout(() => {
      console.log('show solution')
      setGameOver(true);
      setShowSolution(true); // Trigger fade-in of the solution
    }, 1000); // Delay of 1 second after last wrong answer
  };

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

  const fetchSudoku = async (difficulty : number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://rufusbiggs.pythonanywhere.com/generate?${difficulty}=2`);
      const { board, solution } = await response.json();
      setCurrentCode(board);
      setSolution(solution);
    } catch (error) {
      console.error("Error fetching Sudoku data:", error);
    } finally {
      await new Promise(resolve => setTimeout(resolve, 1000)); // pause for spinner
      setLoading(false);
    }
  };

  // starts game on component mount
  useEffect(() => {
    fetchSudoku(1);
  }, [])

  const newGame = (difficulty : number) => {
    setGameOver(false);
    setShowSolution(false);
    setFalseAnswers(0);
    fetchSudoku(difficulty);
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
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
  }, [selectedCell, currentCode, solution, gameOver, handleIncorrectNum])


  return (
    <main className={styles.main}>
      <h1>Sudoku Game</h1>
      <div>
        {loading ? (
          <div>Generating new board...</div>  // Spinner shows during loading
        ) : gameOver ? (
          <div>
            <h2>Game Over! Here is the solution:</h2>
            <div className={`${styles.solution} ${showSolution ? styles.fadeIn : ''}`}> {/* Apply fade-in */}
              {splitCodeToRows(solution).map((row, idx) => (
                <TileRow
                  key={idx}
                  idx={idx}
                  rowNumbers={row} // Use solution instead of current code
                  rowIdx={idx}
                  cellError={cellError}
                  handleCellClick={handleCellClick}
                  selectedCell={selectedCell}
                />
              ))}
            </div>
            <Buttons 
              onNewGame={newGame} 
              falseAnswers={falseAnswers} 
              cellError={cellError} />
          </div>
        ) : (
          <div>
            {/* Render game grid */}
            {splitCodeToRows(currentCode).map((row, idx) => (
              <TileRow
                key={idx}
                idx={idx}
                rowNumbers={row}   // Regular current code grid
                rowIdx={idx}
                cellError={cellError}
                handleCellClick={handleCellClick}
                selectedCell={selectedCell}
              />
            ))}
            <Buttons 
              onNewGame={newGame} 
              falseAnswers={falseAnswers} 
              cellError={cellError} />
          </div>
        )}
      </div>
    </main>
  );
}