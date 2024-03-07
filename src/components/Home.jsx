import '../css/Home.css';

import { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import NewsCard from './NewsCard';
import Gallery from './Gallery';

const CARDS = [
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' },
	{ title: 'Título', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...' }
];

const IMAGES = [
	'https://placehold.co/400x400/333/888',
	'https://placehold.co/500x400/333/888',
	'https://placehold.co/400x500/333/888',
	'https://placehold.co/600x400/333/888',
	'https://placehold.co/400x600/333/888',
	'https://placehold.co/800x500/333/888',
	'https://placehold.co/500x800/333/888',
	'https://placehold.co/765x334/333/888',
	'https://placehold.co/445x982/333/888',
	'https://placehold.co/1000x2345/333/888',
];

export default function Home() {
	const [search, setSearch] = useState('');

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
			<Gallery images={IMAGES} hashtag="natureza" />
			<div className="cards-container">
				{CARDS.map((card, idx) => <NewsCard title={card.title} text={card.text} key={idx} />)}
			</div>
			<Footer />
		</div>
	);
}