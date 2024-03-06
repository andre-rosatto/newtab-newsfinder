import '../css/Home.css';
import Footer from './Footer';
import Header from './Header';

export default function Home() {
	return (
		<div className="Home">
			<Header />
			<form>
				<button></button>
				<input type="text" placeholder="Buscar..." />
			</form>
			<Footer />
		</div>
	);
}