import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../css/Gallery.css';

const Gallery = ({ items, hashtag }) => {
	// configuração de responsividade do carrossel de imagens
	const responsive = {
		0: { items: 1 },
		350: { items: 2 },
		510: { items: 3 },
		670: { items: 4 },
		751: { items: 2 },
		1050: { items: 3 },
		1360: { items: 4 },
		1680: { items: 5 },
	};

	return (
		<div className="Gallery">
			<p>Exibindo os {items.length} resultados mais recentes para #{hashtag}</p>
			<div className="carouselWrapper">
				<AliceCarousel
					mouseTracking
					items={items.map((item, idx) =>
						<div className="carouselItem" data-value={idx}>
							<img src={item.image} alt={`imagem ${idx}`} />
							<p>Postado por:
								<span>NomeDoPortal</span>
							</p>
						</div>
					)}
					responsive={responsive}
					controlsStrategy='responsive'
				/>
			</div>
		</div>
	);
}

export default Gallery;