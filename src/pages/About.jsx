import HeaderAbout from "../components/HeaderAbout"
import MainAbout from "../components/MainAbout"
import FooterAbout from "../components/FooterAbout"
import Navbar from "../components/NavBar"

export default function About() {
	return (
		<div>
			<HeaderAbout/>
			<Navbar home login />
			<MainAbout/>
			<FooterAbout/>
		</div>
	)
}