import React from 'react'
import styles from "./../page.module.css"

interface TileProps {
  number: number;
  tileIdx: number;
  rowIdx: number;
  handleCellClick: (rowIdx: number, tileIdx: number) => void;
  selectedCell: number | null;
}

const Tile: React.FC<TileProps> = ({ number, tileIdx, rowIdx, handleCellClick, selectedCell }) => {
  const leftBorderWidth = (tileIdx % 3 == 0) ? '2px' : '1px';
  const leftBorderColor = (tileIdx % 3 == 0) ? 'black' : 'white';
  const rightBorderWidth = (tileIdx == 8) ? '2px' : 'px';
  const rightBorderColor = (tileIdx == 8) ? 'black' : 'white';
  
  const cellIdx : number = (rowIdx * 9) + tileIdx;
  const isSelected = cellIdx === selectedCell;
  const backgroundColor = isSelected ? 'lightblue' : undefined;

  const tileStyle = {
    borderLeftColor: leftBorderColor,
    borderLeftWidth: leftBorderWidth,
    borderRightColor: rightBorderColor,
    borderRightWidth: rightBorderWidth,
    borderStyle: 'solid',
    fontSize: '20px',
    backgroundColor: backgroundColor,
  }
  
  return (
    <div 
      className={styles.tile} 
      style={tileStyle} 
      key={tileIdx} 
      onClick={() => handleCellClick(rowIdx, tileIdx)}
    >
        {number == 0 ? '' : number}
    </div>
  )
}

export default Tile