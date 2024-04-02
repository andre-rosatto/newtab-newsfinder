import React from 'react';
import '../css/Layout.css';
import Navbar from './Navbar';

function HeaderAbout() {
	return (
		<>
			<Navbar home login />
			<header className='header'>
				<div className='title'>
					<p>Sobre o projeto</p>
				</div>
			</header>
		</>
	)
}

export default HeaderAbout;