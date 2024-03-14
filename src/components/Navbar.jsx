import '../css/Navbar.css';

const Navbar = ({ home, about, login, exit }) => {
	// props definem quais botões são exibidos

	return (
		<nav className="navbar">
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