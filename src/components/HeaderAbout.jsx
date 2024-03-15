import React from 'react'
import styles from './Header.module.css'
import { GoDotFill } from "react-icons/go";

function HeaderAbout() {
  return (
    <header className={styles.header}>
        <div className={styles.menu}>
            <p>News finder</p>
            <nav className={styles.nav}>
                <a href='#'><GoDotFill/>SOBRE</a>
                <a href='#'><GoDotFill/>LOGIN</a>
            </nav>
        </div>

        <div className={styles.title}>
            <h2>Sobre o projeto</h2>
        </div>
    </header>
  )
}

export default HeaderAbout