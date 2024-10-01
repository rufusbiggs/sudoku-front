'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import TileRow from "./components/TileRow"

// Testing boards
let CODE = '000000000072001030180006720700200560500000002069003007024300091030600450000000000'
let SOLUTION = '396427185472581936185936724713248569548769312269153847824375691937612458651894273'

export default function Home() {

  const [startCode, setStartCode] = useState('')
  const [currentCode, setCurrentCode] = useState('');
  const [solution, setSolution] = useState('');
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

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

  const handleIncorrectNum = () => {
    console.log('idiot!')
  }

  useEffect(() => {
    const startGame = async () => {
      // Fetch code and solution data from API
      // da da da

      setStartCode(CODE)
      setCurrentCode(CODE);
      setSolution(SOLUTION);
    }

    startGame();
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedCell === null || isNaN(Number(e.key)) || e.key === ' ') return

      const codeCopy = currentCode;
      const updatedCode = codeCopy.slice(0, selectedCell) + e.key + codeCopy.slice(selectedCell + 1);
      setCurrentCode(updatedCode);

      if (solution[selectedCell] !== updatedCode[selectedCell]) {
        handleIncorrectNum()
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
      {splitCodeToRows(currentCode).map((row, idx) => {
        return (
          <TileRow 
            idx={idx} 
            rowNumbers={row} 
            rowIdx={idx} 
            handleCellClick={handleCellClick} 
            selectedCell={selectedCell}
          />
        )
      })}
    </main>
  );
}
