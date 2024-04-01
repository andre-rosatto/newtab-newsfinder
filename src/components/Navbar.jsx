import { useEffect, useState } from 'react';
import '../css/Navbar.css';

const Navbar = ({ home, about}) => {
	// home, about, login, exit -> definem quais botões são exibidos
	// onExitClick -> callback para o botão SAIR

	// define se a navbar está fixa e com transparência
	const [fixed, setFixed] = useState(false);

	useEffect(() => {
		//scroll acima de 250px define fixed = true
		const handleScroll = () => {
			setFixed(window.scrollY > 250);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className={`navbar${fixed ? ' fixed' : ''}`}>
			<h1><a href="/">newsFinder</a></h1>
			<ul>
				{<li>
					<a className="navbarHome" href="/">HOME</a>
				</li>}
				{<li>
					<a className="navbarAbout" href="/about">SOBRE</a>
				</li>}
			</ul>
		</nav>
	);
}

export default Navbar;