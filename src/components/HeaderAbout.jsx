import React from 'react'
import { GoDotFill } from "react-icons/go";
import '../css/Layout.css'

function HeaderAbout() {
  return (
    <header className='header'>
        <div className='menu'>
            <p>News finder</p>
            <nav className='nav'>
                <a href='#'><GoDotFill/>SOBRE</a>
                <a href='#'><GoDotFill/>LOGIN</a>
            </nav>
        </div>

        <div className='title'>
            <h2>Sobre o projeto</h2>
        </div>
    </header>
  )
}

export default HeaderAbout