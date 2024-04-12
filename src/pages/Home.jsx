import '../css/Home.css';
import "react-image-gallery/styles/css/image-gallery.css";

import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AirtableHandler from '../utils/airtableHandler';
import ReactImageGallery from 'react-image-gallery';
import Carousel from '../components/Carousel';
import axios from 'axios';

const SEARCH_API_URL = 'https://gnews.io/api/v4/search';
const SEARCH_API_KEY = '9327490b8ff243c91b713513fc0e6c2b';
const PORTRAIT_THRESHOLD = 750;

const Home = () => {
	const [showZoomedImage, setShowZoomedImage] = useState(false);
	const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState(0);
	const zoomedImageComp = useRef();
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState();
	const [searchQuery, setSearchQuery] = useState(null);
	const [itemWidth, setItemWidth] = useState(0);
	const [gap, setGap] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setItemWidth(window.innerWidth >= PORTRAIT_THRESHOLD ? 287 : 160);
			setGap(window.innerWidth >= PORTRAIT_THRESHOLD ? 45 : 14);
		}
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleSearchChange = e => {
		setSearchText(e.target.value.trimStart().substring(0, 20));
	}

	const handleSearchSubmit = e => {
		e.preventDefault();

		// post da busca no airtable
		AirtableHandler.post(searchText, Date.now(), err => console.error(err));

		// fetch na API de busca
		setSearchQuery(null);
		axios.get(`${SEARCH_API_URL}?q="${searchText.replace(/"/g, ' ').trim()}"&max=10&apikey=${SEARCH_API_KEY}`)
			.then(response => {
				console.log(response.data);
				setSearchResults(response.data.articles);
				setSearchQuery(searchText);
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
			{searchText.length > 0 && searchText.length < 2 && <p className="searchError">Busca deve conter de 2 a 20 caracteres.</p>}

			{/* resultados da busca */}
			{searchQuery && <section className="searchResults">
				{/* título dos resultados */}
				<p className="searchResultsTitle">{
					searchResults.length > 0
						? `Exibindo os ${searchResults.length} resultados mais recentes para ${searchQuery}`
						: `Nenhum resultado encontrado para ${searchQuery}`}
				</p>

				{/* carrossel de imagens */}
				{searchResults.length > 0 && <div className="carouselWrapper">
					<Carousel
						gap={gap}
						itemWidth={itemWidth}
						items={searchResults.map((result, idx) =>
							<div
								className="carouselItem"
								onClick={e => handleGalleryImageClick(e, idx)}
								style={{ backgroundImage: `url("${result.image}")` }}
							>
								<p>Postado por:
									<a
										href={result.source.url}
										rel="noreferrer"
										target="_blank"
										onClick={e => e.stopPropagation()}
									>
										{result.source.name}
									</a>
								</p>
							</div>
						)}
						previousButton={window.innerWidth >= PORTRAIT_THRESHOLD ? <button className="previousButton"></button> : null}
						nextButton={window.innerWidth >= PORTRAIT_THRESHOLD ? <button className="nextButton"></button> : null}
						pip={window.innerWidth >= PORTRAIT_THRESHOLD ? <div className="pip"></div> : null}
					/>
				</div>}

				{/* lista de notícias */}
				{searchResults.length > 0 && <div className="newsCardWrapper">
					{searchResults.map((result, idx) => <div className="newsCard" key={idx}>
						<h2>{result.title}</h2>
						<p>{result.description}</p>
						<div>
							<a
								href={result.url}
								rel="noreferrer"
								target="_blank"
							>
								Ver mais
							</a>
						</div>
					</div>)}
				</div>
				}
			</section>}

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