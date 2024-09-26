'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import TileRow from "./components/TileRow"

// Testing boards
let CODE = '000000000072001030180006720700200560500000002069003007024300091030600450000000000'
let SOLUTION = '396427185472581936185936724713248569548769312269153847824375691937612458651894273'

export default function Home() {

  const [boardCode, setBoardCode] = useState('');
  const [solution, setSolution] = useState('');

  const splitCodeToRows = (code: string) => {
    const rows = [];
    const numbers = code.split('').map(e => Number(e));
    for (let i = 0; i < code.length; i += 9) {
      rows.push(numbers.slice(i, i + 9));
    }

    return rows
  }

  useEffect(() => {
    const startGame = async () => {
      // Fetch code and solution data from API
      // da da da

      setBoardCode(CODE);
      setSolution(SOLUTION);
    }

    startGame();
  }, [])

  return (
    <main className={styles.main}>
      {splitCodeToRows(boardCode).map((row, idx) => {
        return (
          <TileRow key={idx} rowNumbers={row} />
        )
      })}
    </main>
  );
}
