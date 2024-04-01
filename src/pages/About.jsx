import HeaderAbout from "../components/HeaderAbout"
import MainAbout from "../components/MainAbout"
import Footer from "../components/FooterAbout"
import Navbar from "../components/Navbar"

export default function About() {
	return (
		<div>
			<Navbar home login />
			<HeaderAbout />
			<MainAbout />
			<Footer />
		</div>
	)
}