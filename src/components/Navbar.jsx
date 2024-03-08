import '../css/Navbar.css';

export default function Navbar({ loggedIn }) {

	return (
		<nav className="Navbar">
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