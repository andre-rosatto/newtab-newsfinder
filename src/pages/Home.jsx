import '../css/Home.css';

import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import Gallery from '../components/Gallery';

// mock de resultados de busca para teste da galeria e dos cards de notícias
const SEARCH_RESULTS = {
	hashtag: 'natureza',
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
		<div className="Home">
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

			{/* exibe a galeria de fotos e notícias se houver resultados de busca */}
			{searchResults.results?.length > 0 && <Gallery items={searchResults.results} hashtag={searchResults.hashtag} />}
			{searchResults.results?.length > 0 && <div className="cardsContainer">
				{searchResults.results.map((result, idx) => <NewsCard title={result.title} text={result.text} key={idx} />)}
			</div>}

			{/* rodapé */}
			<Footer />
		</div>
	);
}

export default Home;