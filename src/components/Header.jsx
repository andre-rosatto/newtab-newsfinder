import '../css/Header.css';

export default function Header({ children, logButton }) {

	return (
		<header className='Header'>
			<nav>
				<h1>newsFinder</h1>
				<ul>
					<li>
						<a className="about" href="https://google.com.br">SOBRE</a>
					</li>
					{logButton && <li>
						<a className="login" href="https://google.com.br">LOGIN</a>
					</li>}
				</ul>
			</nav>
			<div className="text-container">
				{children}
			</div>

		</header>
	);
}