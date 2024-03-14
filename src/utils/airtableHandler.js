//
// classe para conduzir operações no Airtable
//

const Airtable = require('airtable');

const SQUAD = '03-24';
const AIRTABLE_ID = 'app18hif6rR0tVAkT';
const AIRTABLE_TOKEN = 'patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439';

export default class AirtableHandler {
	static _base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_ID);

	// post(search, date)
	//
	// cria um novo registro formato {"Squad"=SQUAD, "Busca"=search, "Data"=date}
	static post(search, date) {
		this._base('Buscas').create([
			{
				"fields": {
					"Squad": SQUAD,
					"Busca": search,
					"Data": date
				}
			}
		], err => {
			if (err) {
				console.error('erro:', err);
				return;
			}
		});
	}

	// getAll(onFetch)
	//
	// retorna array de objetos (filtrado por Squad=SQUAD) no formato {id:string, search:string, date:number}
	// onFetch -> callback chamado quando o fetch terminar
	// ex: Airtable.getAll(results => console.log(results));
	static getAll(onFetch) {
		const result = [];
		this._base('Buscas').select({
			view: "Grid view",
			filterByFormula: `{Squad} = "${SQUAD}"`
		}).eachPage((records, fetchNextPage) => {
			records.forEach(record => {
				result.push({ id: record.id, search: record.get('Busca'), date: record.get('Data') });
			});
			fetchNextPage();
		}, err => {
			if (err) {
				console.error(err);
			} else {
				onFetch(result);
			}
		});
	}
}