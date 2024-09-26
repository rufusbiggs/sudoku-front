import React from 'react'
import styles from "./../page.module.css"
import Tile from './Tile'

// const TileRow = ({rowNumbers} : {rowNumbers : number[]}) => {
// //     const tiles : any[] = []

// //     rowNumbers.map((num, idx) => {
// //         tiles.push(
// //             <div className={styles.tile} key={idx}>{num}</div>
// //         )
// //     })
// //   return (
// //     <div className={styles.row}>{tiles}</div>
// //   )
// }

const TileRow = ({ rowNumbers } : { rowNumbers : number[]}) => {
    return (
      <div className={styles.tileRow}>
        {rowNumbers.map((num, idx) => (
          <Tile number={num} />
        ))}
      </div>
    );
  };

export default TileRow