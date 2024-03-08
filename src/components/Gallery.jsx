import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../css/Gallery.css';

export default function Gallery({ images, hashtag }) {
	const responsive = {
		0: { items: 1 },
		100: { items: 1.5 },
		360: { items: 2.15 },
		450: { items: 2.5 },
		525: { items: 3 },
		600: { items: 3.5 },
		690: { items: 4 },
		751: { items: 2 },
		800: { items: 2.25 },
		890: { items: 2.5 },
		980: { items: 2.75 },
		1130: { items: 3.25 },
		1300: { items: 3.75 },
		1430: { items: 4.15 },
		1550: { items: 4.5 },
		1700: { items: 4.875 }
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