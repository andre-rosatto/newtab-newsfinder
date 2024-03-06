import '../css/Home.css';

export default function Home() {
	return (
		<div className="Home">
			<header>
				<div>
					<h1>newsFinder</h1>
					<h2>Encontre notícias de maneira fácil</h2>
					<p>Digite o que deseja no campo de buscas e confira os resultados</p>
				</div>
				<nav>
					<ul>
						<li>
							<a className="about" href="">SOBRE</a>
						</li>
						<li>
							<a className="login" href="">LOGIN</a>
						</li>
					</ul>
				</nav>
			</header>
			<form>
				<button></button>
				<input type="text" placeholder="Buscar" />
			</form>
		</div>
	);
}