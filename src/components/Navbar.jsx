import { useEffect, useState } from 'react';
import '../css/Navbar.css';

const Navbar = ({ home, about, login, exit }) => {
	// home, about, login, exit -> definem quais botões são exibidos

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
				{home && <li>
					<a className="navbarHome" href="/">HOME</a>
				</li>}
				{about && <li>
					<a className="navbarAbout" href="/">SOBRE</a>
				</li>}
				{login && <li>
					<a className="navbarLogin" href="/">LOGIN</a>
				</li>}
				{exit && <li>
					<a className="navbarExit" href="/">EXIT</a>
				</li>}
			</ul>
		</nav>
	);
}

export default Navbar;