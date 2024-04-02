import '../css/MainAbout.css'
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import Ilustration from '../assets/about-illustration.svg'
import { useFetch } from '../hooks/useFetch';

function MainAbout() {
	const url = `https://api.airtable.com/v0/app18hif6rR0tVAkT/`;
	const { dataAbout: aboutProject, dataEquip: equip } = useFetch(url);

	return (
		<section className='mainAbout'>
			<section className='aboutProject'>
				<section className='description'>
					<h3>O que é</h3>
					{aboutProject.map((about) => <p key={about.id}>{about.fields.Sobre}</p>)}
				</section>

				<section className='ilustration'>
					<img src={Ilustration} alt='Ilustração' />
				</section>
			</section>

			<section className='whoWeAre'>
				<h3>Quem somos</h3>
				<section className='teamBio'>

					{equip.map((value) => {
						return (
							<div className='members' key={value.id}>
								<img src={value.fields.Imagem[0].url} />
								<p>{value.fields.Nome}</p>
								<p>
									{value.fields.Descrição}
								</p>
								<div className='socialMedia'>
									<a href={value.fields.Github} target='blank'><FaGithub /></a>
									<a href={value.fields.Email} target='blank'><MdEmail /></a>
									<a href={value.fields.LinkedIn} target='blank'><FaLinkedin /></a>
								</div>
							</div>
						)
					})}
				</section>
			</section>
		</section>
	)
}

export default MainAbout