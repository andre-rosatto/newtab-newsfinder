import '../css/Navbar.css';

export default function Navbar({ loggedIn }) {

	return (
		<nav className="Navbar">
			<h1>newsFinder</h1>
			<ul>
				<li>
					<a className="about" href="https://google.com.br">SOBRE</a>
				</li>
				{!loggedIn && <li>
					<a className="login" href="https://google.com.br">LOGIN</a>
				</li>}
			</ul>
		</nav>
	);
}