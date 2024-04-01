import React from 'react'
import '../css/Layout.css'
import Navbar from './Navbar';

function HeaderAbout() {
	return (
		<header className='header'>
			<div className='menu'>
				<section className='navbar'>
					<Navbar />
				</section>
			</div>

			<div className='title'>
				<p>Sobre o projeto</p>
			</div>
		</header>
	)
}

export default HeaderAbout