import '../css/NewsCard.css';

export default function NewsCard({ title, text }) {
	return (
		<div className="NewsCard">
			<h2>{title}</h2>
			<p>{text}</p>
			<a href="">Ver mais</a>
		</div>
	);
}