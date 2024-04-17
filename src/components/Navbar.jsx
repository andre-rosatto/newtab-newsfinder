import { useEffect, useState } from 'react';
import '../css/Navbar.css';

const Navbar = ({ home, about, login, exit, onExitClick }) => {
	// home, about, login, exit -> definem quais botões são exibidos
	// onExitClick -> callback para o botão SAIR

	// define se a navbar está fixa e com transparência
	const [fixed, setFixed] = useState(false);

	useEffect(() => {
		//scroll acima de 130px define fixed = true
		const handleScroll = () => {
			setFixed(window.scrollY > 130);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className={`navbar${fixed ? ' fixed' : ''}`}>
			<h1><a href="/">newsFinder</a></h1>
			<ul>
				{home && <li>
					<a className="navbarHome" href="/">HOME</a>
				</li>}
				{about && <li>
					<a className="navbarAbout" href="/about">SOBRE</a>
				</li>}
				{login && <li>
					<a className="navbarLogin" href="/login">LOGIN</a>
				</li>}
				{exit && <li>
					<a className="navbarExit" href="/" onClick={e => {
						if (typeof onExitClick === 'function') onExitClick(e);
					}}>SAIR</a>
				</li>}
			</ul>
		</nav>
	);
}

export default Navbar;