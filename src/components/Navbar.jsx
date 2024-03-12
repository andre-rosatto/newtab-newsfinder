import '../css/Navbar.css';

const Navbar = ({ loggedIn }) => {
	// loggedIn -> esconde o botão LOGIN se prop estiver presente ou for true

	return (
		<nav className="navbar">
			<h1>newsFinder</h1>
			<ul>
				<li>
					<a className="about" href="/">SOBRE</a>
				</li>
				{!loggedIn && <li>
					<a className="login" href="/">LOGIN</a>
				</li>}
			</ul>
		</nav>
	);
}

export default Navbar;