import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import '../css/SearchResults.css';

const SearchResults = ({ query, results }) => {
	// configuração de responsividade do AliceCarousel
	const responsive = {
		0: { items: 1 },
		350: { items: 2 },
		510: { items: 3 },
		670: { items: 4 },
		751: { item: 1 },
		890: { items: 2 },
		1180: { items: 3 },
		1470: { items: 4 },
		1760: { items: 5 },
	};

	return (
		<section className="searchResults">
			{/* título dos resultados */}
			{results.length > 0 && <p className="searchResultsTitle">Exibindo os {results.length} resultados mais recentes para {query}</p>}
			{results.length === 0 && <p className="searchResultsTitle">Nenhum resultado encontrado para {query}</p>}

			{/* carrossel de imagens */}
			{results.length > 0 && <div className="carouselWrapper">
				<AliceCarousel
					mouseTracking
					items={results.map((result, idx) =>
						<div className="carouselItem" data-value={idx}>
							<img src={result.image} alt={`imagem ${idx}`} />
							<p>Postado por:
								<span>{result.author}</span>
							</p>
						</div>
					)}
					responsive={responsive}
					controlsStrategy='responsive'
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