import '../css/Home.css';

import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import NewsCard from './NewsCard';

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

export default function Home() {
	const [search, setSearch] = useState('');

	return (
		<div className="Home">
			<Header
				logButton={true}
			>
				<h2>Encontre notícias<br />de maneira fácil</h2>
				<p>Digite o que deseja no campo de buscas e<br />confira os resultados</p>
			</Header>
			<form>
				<button disabled={!search.trim()}></button>
				<input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
			</form>
			<div className="gallery">
				<p>Exibindo os 10 resultados mais recentes para #natureza</p>

			</div>
			<div className="cards-container">
				{CARDS.map((card, idx) => <NewsCard title={card.title} text={card.text} key={idx} />)}
			</div>
			<Footer />
		</div>
	);
}