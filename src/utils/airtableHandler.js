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
	// retorna array de objetos (filtrado por Squad=SQUAD) no formato {id:string, search:string, date:number}
	// onFetch -> callback chamado quando o fetch resolve
	// ex: Airtable.getAll(results => console.log(results));
	static getAll(onFetch) {
		const result = [];
		fetch(`${AIRTABLE_API}?view=Grid view&filterByFormula=({Squad}) = "${SQUAD}"`, {
			method: 'GET',
			headers: {
				"Authorization": `Bearer ${AIRTABLE_TOKEN}`,
				"Content-Type": "application/json"
			}
		}).then(res => res.json()).then(data => {
			data.records.forEach(record =>
				result.push({ id: record.id, search: record.fields.Busca, date: record.fields.Data })
			);
			if (typeof onFetch === 'function') onFetch(result);
		});
	}
}