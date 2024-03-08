import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../css/Gallery.css';

export default function Gallery({ images, hashtag }) {
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
			<p>Exibindo os {images.length} resultados mais recentes para #{hashtag}</p>
			<div className="carousel-wrapper">
				<AliceCarousel
					mouseTracking
					items={images.map((image, idx) =>
						<div className="carousel-item" data-value={idx}>
							<img src={image} alt={`imagem ${idx}`} />
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