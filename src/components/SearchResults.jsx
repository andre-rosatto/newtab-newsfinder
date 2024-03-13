import '../css/SearchResults.css';
import Carousel from "./Carousel";
import { useEffect, useState } from "react";

const SearchResults = ({ query, results }) => {
	const [itemWidth, setItemWidth] = useState(0);
	const [gap, setGap] = useState(0);

	const handleResize = () => {
		setItemWidth(window.innerWidth >= 750 ? 287 : 160);
		setGap(window.innerWidth >= 750 ? 45 : 14);
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
	}, []);

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
						<div className="carouselItem" data-value={idx}>
							<img src={result.image} alt={`imagem ${idx}`} />
							<p>Postado por:
								<span>{result.author}</span>
							</p>
						</div>
					)}
					previousButton={window.innerWidth >= 750 ? <button className="previousButton"></button> : null}
					nextButton={window.innerWidth >= 750 ? <button className="nextButton"></button> : null}
					pip={window.innerWidth >= 750 ? <div className="pip"></div> : null}
				/>
			</div>}

			{/* lista de notícias */}
			{results.length > 0 && <div className="newsCardWrapper">
				{results.map((result, idx) => <div className="newsCard" key={idx}>
					<h2>{result.title}</h2>
					<p>{result.text}</p>
					<div>
						<a href="/">Ver mais</a>
					</div>
				</div>)}
			</div>
			}
		</section>
	);
}

export default SearchResults;