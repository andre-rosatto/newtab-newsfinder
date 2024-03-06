import '../css/Header.css';

export default function Header() {
	return (
		<header className='Header'>
			<div className="text-container">
				<h1>newsFinder</h1>
				<h2>Encontre notícias de maneira fácil</h2>
				<p>Digite o que deseja no campo de buscas e<br />confira os resultados</p>
			</div>
			<nav>
				<ul>
					<li>
						<a className="about" href="https://google.com.br">SOBRE</a>
					</li>
					<li>
						<a className="login" href="https://google.com.br">LOGIN</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}