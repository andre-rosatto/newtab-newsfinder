import '../css/Gallery.css';

export default function Gallery({ images, hashtag }) {
	return (
		<div className="Gallery">
			<p>Exibindo os {images.length} resultados mais recentes para #{hashtag}</p>
			<div className="carrousel">
				<ul>
					{images.map((image, idx) =>
						<li key={idx}>
							<img src={image} alt="" />
							<p>Postado por:
								<span>NomeDoPortal</span>
							</p>
						</li>)}
				</ul>
				<button className="previous"></button>
				<button className="next"></button>
			</div>
		</div>
	);
}