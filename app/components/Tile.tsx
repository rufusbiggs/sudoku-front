import React from 'react'
import styles from "./../page.module.css"

const Tile = ({number} : {number : number}) => {
  return (
    <div className={styles.tile} >{number == 0 ? '' : number}</div>
  )
}

export default Tile