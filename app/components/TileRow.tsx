import React from 'react'
import styles from "./../page.module.css"
import Tile from './Tile'

interface TileRowProps {
    rowNumbers: number[],
    idx: number,
    rowIdx : number, 
    cellError : number | null,
    handleCellClick : (rowIdx : number, tileIdx : number) => void, 
    selectedCell : number | null
}

const TileRow: React.FC<TileRowProps> = ({ rowNumbers, idx, rowIdx, cellError, handleCellClick, selectedCell }) => {
    const topBorderWidth = (idx % 3 == 0) ? '2px' : '0px';
    const topBorderColor = (idx % 3 == 0) ? 'black' : 'white';
    const BorderColor = (idx == 8) ? 'black' : 'white';
    const BorderWidth = (idx == 8) ? '2px' : '0px';

    const rowStyle = {      
      borderTopColor: topBorderColor,
      borderBottomColor: BorderColor,
      borderTopWidth: topBorderWidth,
      borderBottomWidth: BorderWidth,
      borderStyle: 'solid',
    }

    return (
      <div className={styles.tileRow} style={rowStyle}>
        {rowNumbers.map((num, idx) => (
          <Tile 
            number={num} 
            tileIdx={idx} 
            rowIdx={rowIdx} 
            cellError={cellError}
            handleCellClick={handleCellClick}
            selectedCell={selectedCell}
        />
        ))}
      </div>
    );
  };

export default TileRow