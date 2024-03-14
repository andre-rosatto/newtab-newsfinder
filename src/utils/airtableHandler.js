//
// classe para conduzir operações no Airtable
//

const Airtable = require('airtable');

const AIRTABLE_ID = 'app18hif6rR0tVAkT';
const AIRTABLE_TOKEN = 'patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439';

export default class AirtableHandler {
	static _base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_ID);

	static post(search, date) {
		this._base('Buscas').create([
			{
				"fields": {
					"Squad": "03-24",
					"Busca": search,
					"Data": date
				}
			}
		], (err, records) => {
			if (err) {
				console.error('erro:', err);
				return;
			}
			records.forEach(record => {
				console.log(record.getId());
			});
		});
	}
}