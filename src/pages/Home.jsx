import '../css/Home.css';

import { useRef, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SearchResults from '../components/SearchResults';
import AirtableHandler from '../utils/airtableHandler';
import ReactImageGallery from 'react-image-gallery';

const SEARCH_API_URL = 'https://gnews.io/api/v4/search';
const SEARCH_API_KEY = '9327490b8ff243c91b713513fc0e6c2b';

// DEBUG:
// const SEARCH_RESULTS = {
// 	"totalArticles": 1297,
// 	"articles": [
// 		{
// 			"title": "Teclado do iPhone troca vou por vouch; veja como corrigir",
// 			"description": "Reclamações nas redes sociais tiveram início em setembro, após Apple anunciar que adicionaria IA generativa a teclado",
// 			"content": "São Paulo\nUm bug no corretor de teclado de iPhones vem alterando automaticamente a palavra \"vou\" para \"vouch\", mesmo que o aparelho esteja configurado em português e com localização no Brasil. Os primeiros relatos remetem à última atualização do sist... [2205 chars]",
// 			"url": "https://www1.folha.uol.com.br/mercado/2024/03/bug-em-corretor-do-iphone-troca-vou-por-vouch-veja-como-consertar.shtml",
// 			"image": "https://f.i.uol.com.br/fotografia/2024/03/12/171027510965f0ba259b8da_1710275109_3x2_md.jpg",
// 			"publishedAt": "2024-03-12T20:41:00Z",
// 			"source": {
// 				"name": "Folha de S.Paulo",
// 				"url": "https://www1.folha.uol.com.br"
// 			}
// 		},
// 		{
// 			"title": "¿Cómo escribir arroba en el teclado de una laptop y computadora de escritorio?",
// 			"description": "La arroba era usado por comerciante y contadores, pero en 1971 Ray Tomlinson decidió utilizar este símbolo en otra función y se le llama el inventor del correo electrónico",
// 			"content": "La arroba (@) es uno de los símbolos más usados, no solo para los correos electrónicos, sino que también tiene funciones que pueden ayudar en diversas operaciones y ordenes informáticas que podrían salvarle la vida en este mundo de las tecnologías. G... [5086 chars]",
// 			"url": "https://gestion.pe/tecnologia/arroba-escribir-teclado-laptop-computadora-escritorio-email-correo-electronico-twitter-instagram-nnda-nnlt-249080-noticia/",
// 			"image": "https://gestion.pe/resizer/5hMWp1XEvqdgV9r5Q8tJW5m9qSU=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/TBEN276R4RDU3KS4ASFATZF34U.jpg",
// 			"publishedAt": "2024-03-11T21:32:00Z",
// 			"source": {
// 				"name": "Diario Gestión",
// 				"url": "https://gestion.pe"
// 			}
// 		},
// 		{
// 			"title": "'Simples e eficaz': este kit promete limpar laptop, teclado, fone e celular",
// 			"description": "Acompanha as principais notícias do mundo das compras. Promoções, dicas e guia para escolher os melhores produtos do mercado com análises e reviews.",
// 			"content": "Produto cumpre com o que diz. Porém é muito frágil, a espuma da parte para limpar rasga fácil Mauri Vinicius Santos Moura\nQualidade péssima do material, plástico frágil e com cara de barato. O líquido pra limpeza de tela dá pra 2 espirradas só. Foi d... [535 chars]",
// 			"url": "https://www.uol.com.br/guia-de-compras/ultimas-noticias/2024/03/09/xxx-este-kit-de-ferramentas-limpa-monitor-fonecelular-e-laptop.htm",
// 			"image": "https://conteudo.imguol.com.br/c/noticias/c2/2023/07/11/arte-kit-de-limpeza-7-em-1-da-enfudid-1689104723740_v2_615x300.jpg",
// 			"publishedAt": "2024-03-09T07:00:00Z",
// 			"source": {
// 				"name": "UOL",
// 				"url": "https://www.uol.com.br"
// 			}
// 		},
// 		{
// 			"title": "O Teclado Gamer HyperX Alloy Core está com um desconto imperdível para os jogadores de PC!",
// 			"description": "O Teclado Gamer HyperX Alloy Core está com um desconto imperdível para os jogadores de PC! Periférico conta com iluminação RGB destacada, configurações macro e inúmeros atalhos de mídia que facilitam a usabilidade",
// 			"content": "Ter um teclado gamer com aquele conjunto de luzes para trazer estilo durante a gameplay potencializa a emoção da partida no setup, ainda mais com a possibilidade de sincronizar a iluminação com os acontecimentos dentro do jogo, o que garante um reali... [2007 chars]",
// 			"url": "https://br.ign.com/descontos/120519/news/o-teclado-gamer-hyperx-alloy-core-esta-com-um-desconto-imperdivel-para-os-jogadores-de-pc",
// 			"image": "https://sm.ign.com/t/ign_br/screenshot/default/core_dfu4.1200.png",
// 			"publishedAt": "2024-03-04T13:54:51Z",
// 			"source": {
// 				"name": "IGN Brasil",
// 				"url": "https://br.ign.com"
// 			}
// 		},
// 		{
// 			"title": "Así puedes probar el teclado de las Apple Vision Pro con un iPhone",
// 			"description": "Unos desarrolladores han lanzado una aplicación en la App Store que permite utilizar el teclado virtual de las nuevas gafas de realidad virtual en dispositivos",
// 			"content": "Las Apple Vision Pro se lanzaron a principios de febrero en Estados Unidos y, aunque todavía tendremos que esperar para poder comprarlas en España, hay muchos usuarios interesados. Las gafas de realidad mixta salieron al mercado norteamericano con má... [2957 chars]",
// 			"url": "https://www.20minutos.es/tecnologia/aplicaciones/como-probar-teclado-apple-vision-pro-iphone-5223225/",
// 			"image": "https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2024/02/29/teclado-virtual-vision-pro.jpeg",
// 			"publishedAt": "2024-03-03T17:00:00Z",
// 			"source": {
// 				"name": "20 Minutos",
// 				"url": "https://www.20minutos.es"
// 			}
// 		},
// 		{
// 			"title": "Leve para casa este teclado Redragon pagando só 12x de R$ 26",
// 			"description": "Teclado Redragon tem conexão Wireless e Bluetooth, iluminação RGB e layout ABNT. Saiba mais sobre o periférico gamer",
// 			"content": "O teclado Redragon Kumara, é uma escolha robusta para gamers e usuários que buscam qualidade, durabilidade e personalização em seus dispositivos de entrada, oferecendo uma combinação de desempenho mecânico, estética RGB e versatilidade de conectivida... [1369 chars]",
// 			"url": "https://gizmodo.uol.com.br/leve-para-casa-este-teclado-redragon-pagando-so-12x-de-r-26/",
// 			"image": "https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2024/02/teclado-redragon.jpg",
// 			"publishedAt": "2024-02-28T22:59:52Z",
// 			"source": {
// 				"name": "Gizmodo Brasil",
// 				"url": "https://gizmodo.uol.com.br"
// 			}
// 		},
// 		{
// 			"title": "A volta do BlackBerry? Capa coloca teclado físico em iPhone e promete mudar completamente o uso do celular",
// 			"description": "Clicks promete te levar de volta para o passado, mas de um jeito interessante.",
// 			"content": "Apresentado na CES 2024, o Clicks começou a ser testado no MWC de Barcelona, que acontece entre 26 a 29 de fevereiro. Basicamente, o Clicks é uma capa para iPhone que dá um teclado físico ao celular da Apple.\nMas não é só isso! Ok, é quase só isso, m... [1162 chars]",
// 			"url": "https://br.ign.com/tech/120345/news/a-volta-do-blackberry-capa-coloca-teclado-fisico-em-iphone-e-promete-mudar-completamente-o-uso-do-ce",
// 			"image": "https://sm.ign.com/t/ign_br/screenshot/default/imagem-2024-02-28-133918607_apat.1200.jpg",
// 			"publishedAt": "2024-02-28T17:55:04Z",
// 			"source": {
// 				"name": "IGN Brasil",
// 				"url": "https://br.ign.com"
// 			}
// 		},
// 		{
// 			"title": "¿Por qué el teclado de tu laptop o PC tiene sus letras en mayúsculas y no en minúsculas?",
// 			"description": "¿Te habías dado cuenta? Casi todos los teclados están en mayúsculas, salvo una marca de laptops que decidió que las letras se encuentren en minúsculas. Te contamos por qué.",
// 			"content": "¿Compraste una laptop o PC para tu casa? Si revisas con detenimiento el teclado de tu computadora, verás un detalle que suele pasar desapercibido para la mayoría de personas: las letras están en mayúsculas. Aunque hay algunas excepciones (como los bo... [3025 chars]",
// 			"url": "https://larepublica.pe/tecnologia/actualidad/2024/02/28/por-que-el-teclado-de-tu-laptop-o-pc-tiene-sus-letras-en-mayusculas-y-no-en-minusculas-315924",
// 			"image": "https://imgmedia.larepublica.pe/1200x630/larepublica/original/2024/02/28/65df4d63737141108e1d958d.jpg",
// 			"publishedAt": "2024-02-28T16:50:49Z",
// 			"source": {
// 				"name": "LaRepública.pe",
// 				"url": "https://larepublica.pe"
// 			}
// 		},
// 		{
// 			"title": "Eu ouvi Teclado Gamer? O Logitech G915 TKL está com incríveis 51% de desconto!",
// 			"description": "Eu ouvi Teclado Gamer? O Logitech G915 TKL está com incríveis 51% de desconto! Sem fio e com RGB LightSync, o teclado é perfeito para longas horas de gameplays.",
// 			"content": "Esse é o momento de aumentar o nível das gameplays com o Teclado Mecânico Gamer Sem Fio Logitech G915 TKL! O periférico está com SUPER desconto de 51% na Amazon Brasil por tempo limitado e oferece conexão sem fio e RGB LightSync. Com switches mecânic... [1283 chars]",
// 			"url": "https://br.ign.com/descontos/120337/news/eu-ouvi-teclado-gamer-o-logitech-g915-tkl-esta-com-incriveis-51-de-desconto",
// 			"image": "https://sm.ign.com/t/ign_br/screenshot/default/teclado-gamer-rgb-logitech_128a.1200.jpg",
// 			"publishedAt": "2024-02-28T15:24:47Z",
// 			"source": {
// 				"name": "IGN Brasil",
// 				"url": "https://br.ign.com"
// 			}
// 		},
// 		{
// 			"title": "Conoce el computador transparente de Lenovo, que tiene funciones de IA y realidad aumentada",
// 			"description": "El portátil tiene un teclado táctil y no usa los botones tradicionales",
// 			"content": "En el MWC 2024 se presentó este prototipo que usa IA para suponer información sobre otros objetos. (Infobae)\nLenovo reveló un nuevo concepto de portátil. Se trata de un computador transparente en el que se podrá ver todo lo que está en pantalla, al t... [4296 chars]",
// 			"url": "https://www.infobae.com/tecno/2024/02/27/conoce-el-computador-transparente-de-lenovo-que-tiene-funciones-de-ia-y-realidad-aumentada/",
// 			"image": "https://www.infobae.com/new-resizer/U1qO-47CfSPQCG2AcoZ-JKleu9Y=/1200x630/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/FTKQTFEII5AKTMWJJ6EJZRKKS4.jpeg",
// 			"publishedAt": "2024-02-27T12:48:54Z",
// 			"source": {
// 				"name": "infobae",
// 				"url": "https://www.infobae.com"
// 			}
// 		}
// 	]
// };

const Home = () => {
	// DEBUG:
	// const [searchText, setSearchText] = useState('teclado');
	// const [searchResults] = useState(SEARCH_RESULTS.articles);
	// const [searchQuery] = useState('teclado');

	const [showZoomedImage, setShowZoomedImage] = useState(false);
	const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState(0);
	const zoomedImageComp = useRef();
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState();
	const [searchQuery, setSearchQuery] = useState(null);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value.trimStart().substring(0, 20));
	}

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		// post da busca no airtable
		AirtableHandler.post(searchText, Date.now());

		// fetch na API de busca
		setSearchQuery(null);
		const abortController = new AbortController();
		fetch(`${SEARCH_API_URL}?q=${searchText}&max=10&apikey=${SEARCH_API_KEY}`, { signal: abortController.signal })
			.then(res => res.json())
			.then(data => {
				setSearchResults(data.articles);
				setSearchQuery(searchText);
			}).catch(() => {
				abortController.abort();
			});
	}

	const handleGalleryImageClick = (e, idx) => {
		e.stopPropagation();
		setShowZoomedImage(true);
		zoomedImageComp.current.slideToIndex(idx);
	}

	const getContent = (fullContent) => {
		const ellipsis = fullContent.match(/\[(.*?)\]/g);
		return fullContent.substring(0, fullContent.indexOf(ellipsis));
	}

	return (
		<div className="home">
			{/* banner */}
			<header>
				<Navbar about login />
				<div className="banner">
					<h2>Encontre notícias<br />de maneira fácil</h2>
					<p>Digite o que deseja no campo de buscas e<br />confira os resultados</p>
				</div>
			</header>

			{/* barra de pesquisa */}
			<form onSubmit={handleSearchSubmit}>
				{/* desativa busca se estiver vazia */}
				<button disabled={!searchText || searchText.trim().length < 2}></button>
				<input
					type="text"
					placeholder="Buscar..."
					value={searchText}
					onChange={handleSearchChange}
					autoFocus
				/>
			</form>

			{/* resultados da busca */}
			{searchQuery && <SearchResults
				query={searchQuery}
				results={searchResults}
				onImageClick={handleGalleryImageClick}
			/>}

			{/* zoom de imagens */}
			{searchQuery && <div className={`zoomGallery${showZoomedImage ? '' : ' hidden'}`}>
				<div className="zoomGalleryWrapper">
					<ReactImageGallery
						ref={zoomedImageComp}
						items={searchResults.map(result => {
							return {
								original: result.image,
								originalHeight: `${window.innerWidth >= 750 ? window.innerHeight / 2 : window.innerHeight / 4}px`,
								thumbnail: result.image
							}
						})}
						useBrowserFullscreen={false}
						showPlayButton={false}
						showBullets={true}
						showFullscreenButton={false}
						additionalClass="zoomGalleryImage"
						onSlide={idx => setCurrentZoomedImageIndex(idx)}
					/>
					{zoomedImageComp.current && <div className="zoomGalleryTextWrapper">
						<div className="linkWrapper">
							<p>Postado por: <a
								href={searchResults[currentZoomedImageIndex].source.url}
								rel="noreferrer"
								target="_blank"
							>{searchResults[currentZoomedImageIndex].source.name}</a>
							</p>
							<a
								href={searchResults[currentZoomedImageIndex].url}
								rel="noreferrer"
								target="_blank"
							>Ver mais</a>
						</div>
						<h2>{searchResults[currentZoomedImageIndex].title}</h2>
						<h3>{searchResults[currentZoomedImageIndex].description}</h3>
						<p>{getContent(searchResults[currentZoomedImageIndex].content)}</p>
					</div>}
				</div>
				<button
					className="closeButton"
					onClick={() => setShowZoomedImage(false)}
				>FECHAR</button>
			</div>}

			{/* rodapé */}
			<Footer />
		</div>
	);
}

export default Home;