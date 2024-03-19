// AirtableHandler
// 		classe para conduzir operações no Airtable

const SQUAD = '03-24';
const AIRTABLE_API = 'https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas';
const AIRTABLE_TOKEN = 'patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439';

export default class AirtableHandler {
	// post(search, date)
	//
	// cria um novo registro no formato {"Squad"=SQUAD, "Busca"=search, "Data"=date}
	static post(search, date) {
		fetch(AIRTABLE_API, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${AIRTABLE_TOKEN}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"fields": {
					"Squad": SQUAD,
					"Busca": search,
					"Data": date
				}
			})
		});
	}

	// getAll(onFetch)
	//
	// retorna um objeto
	// params -> parâmetros da URL do fetch
	// onFetch -> callback chamado quando o fetch resolve
	//
	// ex: Airtable.getAll('filterByFormula=({Squad}) = "${SQUAD}', results => console.log(results));
	static getAll(params, onFetch) {
		fetch(`${AIRTABLE_API}?${params}`, {
			method: 'GET',
			headers: {
				"Authorization": `Bearer ${AIRTABLE_TOKEN}`,
				"Content-Type": "application/json"
			}
		}).then(res => res.json()).then(data => {
			if (typeof onFetch === 'function') onFetch(data);
		});
	}
}