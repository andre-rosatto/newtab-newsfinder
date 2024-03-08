import '../css/Home.css';

import { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import NewsCard from './NewsCard';
import Gallery from './Gallery';

const SEARCH_RESULTS = [
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/400x400/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/500x400/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/400x500/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/600x400/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/400x600/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/800x500/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/500x800/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/765x334/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/445x982/333/888',
		hashtag: 'natureza'
	},
	{
		title: 'Título',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
		image: 'https://placehold.co/1000x2345/333/888',
		hashtag: 'natureza'
	},
];

export default function Home() {
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState(SEARCH_RESULTS);
	// const [searchResults, setSearchResults] = useState([]);

	return (
		<div className="Home">
			<header>
				<Navbar loggedIn={false} />
				<div className="text-container">
					<h2>Encontre notícias<br />de maneira fácil</h2>
					<p>Digite o que deseja no campo de buscas e<br />confira os resultados</p>
				</div>
			</header>
			<form>
				<button disabled={!search.trim()}></button>
				<input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
			</form>
			{searchResults.length > 0 && <Gallery images={searchResults.map(item => item.image)} hashtag="natureza" />}
			{searchResults.length > 0 && <div className="cards-container">
				{searchResults.map((result, idx) => <NewsCard title={result.title} text={result.text} key={idx} />)}
			</div>}
			<Footer />
		</div>
	);
}