import styles from './Main.module.css'
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import Ilustration from '../imgs/about-illustration.svg'
import MemberPhoto3 from '../imgs/img-projeto.jpeg'
import {useFetch}  from '../hooks/useFetch';

function MainAbout() {
  const url = `https://api.airtable.com/v0/app18hif6rR0tVAkT/`;
  const {dataDescription : description , dataEquip : equip} = useFetch(url);
  
  return (
    <section className={styles.main}>    
        <section className={styles.description}>
            <h3>O que é</h3>
            <p>O NewsFinder é um projeto voltado para localização de noticias, onde é usado requisições 
               á API(Airtable) para buscar e inserir dados, as tecnologias usadas foram Javascript , 
               React, HTML e CSS para implementar as páginas correspondente com salvamento e listagem
               de informações 
            </p>
            {description.map((value) => <p key={'index' + value.id}>{value.fields.Sobre}</p>)}
        </section>

        <section className={styles.ilustration}>
             <img src={Ilustration} alt='Ilustração'/>
        </section>

        <section className={styles.whoWeAre}>
              <h3>Quem somos</h3>
               <section className={styles.teamBio}> 

                  <div className={styles.members}>
                      <img/>
                      {equip.map((value) => <p>{value.fields.Nome}</p>)}
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Unde, eum beatae velit enim porro tenetur officiis ipsam earum nulla expedita. 
                        Doloribus mollitia saepe recusandae veniam sequi sunt impedit sit nihil.
                      </p>
                      <div className={styles.socialMedia}>
                          <a href='https://github.com' target='blank'><FaGithub/></a>
                          <a href='https://gmail.com'  target='blank'><MdEmail/></a>
                          <a href='https://linkedin.com' target='blank'><FaLinkedin/></a>
                      </div>
                  </div>

                  <div className={styles.members}>
                      <img/>
                      <p>Nome Sobrenome</p>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Unde, eum beatae velit enim porro tenetur officiis ipsam earum nulla expedita. 
                        Doloribus mollitia saepe recusandae veniam sequi sunt impedit sit nihil.
                      </p>
                      <div className={styles.socialMedia}>
                          <a href='https://github.com' target='blank'><FaGithub/></a>
                          <a href='https://gmail.com'  target='blank'><MdEmail/></a>
                          <a href='https://linkedin.com' target='blank'><FaLinkedin/></a>
                      </div>
                  </div>

                  <div className={styles.members}>
                      <img  src={MemberPhoto3}/>
                      <p>Vinicyos Ferreira</p>
                      <p>Contribuindo com um projeto em React
                       e suas nuances , além da parte lógica elaborada com Javascript , 
                       entusisata de tecnologia com experiência em infraestrura e 
                       conhecimentos em programação front end e sistema ERP
                      </p>
                      <div className={styles.socialMedia}>
                          <a href='https://github.com/VinicyosFerreira' target='blank'><FaGithub/></a>
                          <a href='https://mailto:vinifr987@gmail.com'  target='blank'><MdEmail/></a>
                          <a href='https://www.linkedin.com/in/vinicyos-ferreira/' target='blank'><FaLinkedin/></a>
                      </div>
                  </div>
              </section>
        </section>
    </section>
  )
}

export default MainAbout