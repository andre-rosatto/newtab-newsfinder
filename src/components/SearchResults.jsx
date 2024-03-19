import ReactImageGallery from 'react-image-gallery';
import Carousel from "./Carousel";
import { useEffect, useRef, useState } from "react";
import '../css/SearchResults.css';

const DESKTOP_THRESHOLD = 750;

const SearchResults = ({ query, results }) => {
	const [itemWidth, setItemWidth] = useState(0);
	const [showZoomedImage, setShowZoomedImage] = useState(false);
	const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState(0);
	const [gap, setGap] = useState(0);
	const zoomedImageComp = useRef();

	useEffect(() => {
		const handleResize = () => {
			setItemWidth(window.innerWidth >= DESKTOP_THRESHOLD ? 287 : 160);
			setGap(window.innerWidth >= DESKTOP_THRESHOLD ? 45 : 14);
		}
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

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
		<section className="searchResults">
			{/* título dos resultados */}
			<p className="searchResultsTitle">{
				results.length > 0
					? `Exibindo os ${results.length} resultados mais recentes para ${query}`
					: `Nenhum resultado encontrado para ${query}`}
			</p>

			{/* carrossel de imagens */}
			{results.length > 0 && <div className="carouselWrapper">
				<Carousel
					gap={gap}
					itemWidth={itemWidth}
					items={results.map((result, idx) =>
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
					previousButton={window.innerWidth >= DESKTOP_THRESHOLD ? <button className="previousButton"></button> : null}
					nextButton={window.innerWidth >= DESKTOP_THRESHOLD ? <button className="nextButton"></button> : null}
					pip={window.innerWidth >= DESKTOP_THRESHOLD ? <div className="pip"></div> : null}
				/>
			</div>}

			{/* lista de notícias */}
			{results.length > 0 && <div className="newsCardWrapper">
				{results.map((result, idx) => <div className="newsCard" key={idx}>
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

			{/* zoom de imagens */}
			<div className={`zoomedImage${showZoomedImage ? '' : ' hidden'}`}>
				<div className="zoomedImageWrapper">
					<div className="closeButtonWrapper">
						<button onClick={() => setShowZoomedImage(false)}>FECHAR</button>
					</div>
					<ReactImageGallery
						ref={zoomedImageComp}
						items={results.map(result => {
							return {
								original: result.image,
								originalHeight: `${window.innerWidth >= DESKTOP_THRESHOLD ? window.innerHeight / 2 : window.innerHeight / 4}px`,
								thumbnail: result.image,
							}
						})}
						useBrowserFullscreen={false}
						showPlayButton={false}
						showBullets={true}
						showFullscreenButton={false}
						additionalClass="zoomedImageGallery"
						onSlide={idx => setCurrentZoomedImageIndex(idx)}
					/>
					{zoomedImageComp.current && <div className="zoomedImageTextWrapper">
						<p>Postado por: <a
							href={results[currentZoomedImageIndex].source.url}
							rel="noreferrer"
							target="_blank"
						>{results[currentZoomedImageIndex].source.name}</a>
						</p>
						<h2>{results[currentZoomedImageIndex].title}</h2>
						<h3>{results[currentZoomedImageIndex].description}</h3>
						<p>{getContent(results[currentZoomedImageIndex].content)}</p>
						<div className="linkWrapper">
							<a
								href={results[currentZoomedImageIndex].url}
								rel="noreferrer"
								target="_blank"
							>Ver mais</a>
						</div>
					</div>}
				</div>
			</div>

		</section>
	);
}

export default SearchResults;