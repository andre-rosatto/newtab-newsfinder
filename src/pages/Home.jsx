import '../css/Home.css';

import { useRef, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SearchResults from '../components/SearchResults';
import AirtableHandler from '../utils/airtableHandler';
import ReactImageGallery from 'react-image-gallery';

const SEARCH_API_URL = 'https://gnews.io/api/v4/search';
const SEARCH_API_KEY = '9327490b8ff243c91b713513fc0e6c2b';

const Home = () => {
	const [showZoomedImage, setShowZoomedImage] = useState(false);
	const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState(0);
	const zoomedImageComp = useRef();
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState();
	const [searchQuery, setSearchQuery] = useState(null);

	const handleSearchChange = e => {
		setSearchText(e.target.value.trimStart().substring(0, 20));
	}

	const handleSearchSubmit = e => {
		e.preventDefault();


		// fetch das pesquisas
		//
		// primeiro fetch
		// AirtableHandler.getSearches(null, (data) => {
		// 	console.log(data);
		// });
		// fetches subsequentes
		// AirtableHandler.getSearches(data.offset, (data) => {
		// 	console.log(data);
		// });


		// post da busca no airtable
		AirtableHandler.post(searchText, Date.now());

		// fetch na API de busca
		setSearchQuery(null);
		const abortController = new AbortController();
		fetch(`${SEARCH_API_URL}?q="${searchText.replace(/"/g, ' ').trim()}"&max=10&apikey=${SEARCH_API_KEY}`, { signal: abortController.signal })
			.then(res => res.json())
			.then(data => {
				setSearchResults(data.articles);
				setSearchQuery(searchText);
			}).catch(() => {
				abortController.abort();
			});
	}

	const handleGalleryImageClick = (e, idx) => {
		e.stopPropagation();
		setShowZoomedImage(true);
		zoomedImageComp.current.slideToIndex(idx);
	}

	const getContent = (fullContent) => {
		const ellipsis = fullContent.match(/\[(.*?)\]/g);
		return fullContent.substring(0, fullContent.indexOf(ellipsis));
	}

	return (
		<div className="home">
			{/* banner */}
			<header>
				<Navbar about login />
				<div className="banner">
					<h2>Encontre notícias<br />de maneira fácil</h2>
					<p>Digite o que deseja no campo de buscas e<br />confira os resultados</p>
				</div>
			</header>

			{/* barra de pesquisa */}
			<form onSubmit={handleSearchSubmit}>
				{/* desativa busca se estiver vazia */}
				<button disabled={!searchText || searchText.trim().length < 2}></button>
				<input
					type="text"
					placeholder="Buscar..."
					value={searchText}
					onChange={handleSearchChange}
					autoFocus
				/>
			</form>

			{/* resultados da busca */}
			{searchQuery && <SearchResults
				query={searchQuery}
				results={searchResults}
				onImageClick={handleGalleryImageClick}
			/>}

			{/* zoom de imagens */}
			{searchQuery && searchResults.length > 0 && <div className={`zoomGallery${showZoomedImage ? '' : ' hidden'}`}>
				<div className="zoomGalleryWrapper">
					<ReactImageGallery
						ref={zoomedImageComp}
						items={searchResults.map(result => {
							return {
								original: result.image,
								originalHeight: `${window.innerWidth >= 750 ? window.innerHeight / 2 : window.innerHeight / 4}px`,
								thumbnail: result.image
							}
						})}
						useBrowserFullscreen={false}
						showPlayButton={false}
						showBullets={true}
						showFullscreenButton={false}
						additionalClass="zoomGalleryImage"
						onSlide={idx => setCurrentZoomedImageIndex(idx)}
					/>
					{zoomedImageComp.current && <div className="zoomGalleryTextWrapper">
						<div className="linkWrapper">
							<p>Postado por: <a
								href={searchResults[currentZoomedImageIndex].source.url}
								rel="noreferrer"
								target="_blank"
							>{searchResults[currentZoomedImageIndex].source.name}</a>
							</p>
							<a
								href={searchResults[currentZoomedImageIndex].url}
								rel="noreferrer"
								target="_blank"
							>Ver mais</a>
						</div>
						<h2>{searchResults[currentZoomedImageIndex].title}</h2>
						<h3>{searchResults[currentZoomedImageIndex].description}</h3>
						<p>{getContent(searchResults[currentZoomedImageIndex].content)}</p>
					</div>}
				</div>
				<button
					className="closeButton"
					onClick={() => setShowZoomedImage(false)}
				>FECHAR</button>
			</div>}

			{/* rodapé */}
			<Footer />
		</div>
	);
}

export default Home;