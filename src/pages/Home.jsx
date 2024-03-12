import '../css/Home.css';

import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SearchResults from '../components/SearchResults';

// mock de resultados de busca para teste
const SEARCH_RESULTS = {
	query: 'natureza',
	results: [{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/400x400/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/500x400/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/400x500/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/600x400/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/400x600/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/800x500/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/500x800/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/765x334/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/445x982/333/888',
		author: 'NomeDoPortal',
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/1000x2345/333/888',
		author: 'NomeDoPortal',
	}]
};

const Home = () => {
	const [searchText, setSearchText] = useState('');
	const [searchResults] = useState(SEARCH_RESULTS);

	return (
		<div className="home">
			{/* banner */}
			<header>
				<Navbar loggedIn={false} />
				<div className="textContainer">
					<h2>Encontre notícias<br />de maneira fácil</h2>
					<p>Digite o que deseja no campo de buscas e<br />confira os resultados</p>
				</div>
			</header>

			{/* barra de pesquisa */}
			<form>
				{/* desativa busca se a busca estiver vazia */}
				<button disabled={!searchText.trim()}></button>
				<input type="text" placeholder="Buscar..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
			</form>

			{/* resultados da busca */}
			{searchResults?.query && <SearchResults query={searchResults.query} results={searchResults.results} />}

			{/* rodapé */}
			<Footer />
		</div>
	);
}

export default Home;