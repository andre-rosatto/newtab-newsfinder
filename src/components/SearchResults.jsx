import '../css/SearchResults.css';
import Carousel from "./Carousel";
import { useEffect, useState } from "react";

const DESKTOP_THRESHOLD = 750;

const SearchResults = ({ query, results }) => {
	const [itemWidth, setItemWidth] = useState(0);
	const [gap, setGap] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setItemWidth(window.innerWidth >= DESKTOP_THRESHOLD ? 287 : 160);
			setGap(window.innerWidth >= DESKTOP_THRESHOLD ? 45 : 14);
		}
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleImageClick = (idx) => {
		console.log('image click', idx);
	}

	return (
		<section className="searchResults">
			{/* título dos resultados */}
			{results.length > 0 && <p className="searchResultsTitle">Exibindo os {results.length} resultados mais recentes para {query}</p>}
			{results.length === 0 && <p className="searchResultsTitle">Nenhum resultado encontrado para {query}</p>}

			{/* carrossel de imagens */}
			{results.length > 0 && <div className="carouselWrapper">
				<Carousel
					gap={gap}
					itemWidth={itemWidth}
					items={results.map((result, idx) =>
						<div
							className="carouselItem"
							onClick={() => handleImageClick(idx)}
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
					<p>{result.content}</p>
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
		</section>
	);
}

export default SearchResults;