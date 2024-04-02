// AirtableHandler
// 		classe para conduzir operações no Airtable

import axios from "axios";

const SQUAD = '03-24';
const AIRTABLE_API = 'https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas';
const AIRTABLE_TOKEN = 'patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439';

export default class AirtableHandler {
	// post(search, date)
	// search: string -> termo da busca
	// date: number -> data da busca em formato de número
	// onError: function -> callback chamado quando ocorre um erro
	//
	// cria um novo registro no formato {"Squad"=SQUAD, "Busca"=search, "Data"=date}
	static post(search, date, onError) {
		axios.post(AIRTABLE_API, {
			"fields": {
				"Squad": SQUAD,
				"Busca": search,
				"Data": date
			}
		}, {
			headers: {
				"Authorization": `Bearer ${AIRTABLE_TOKEN}`,
				"Content-Type": "application/json;charset=UTF-8"
			}
		}).catch(err => {
			if (typeof onError === 'function') onError(err);
		});
	}

	// getSearches(offset, onFetch, onError): Object
	// offset: string -> URL do offset; null se não houver
	// onFetch: function -> callback chamado quando o fetch resolve
	// onError: function -> callback chamado quando ocorre um erro
	//
	// ex (primeiro fetch): Airtable.getSearches(null, results => console.log(results));
	// ex (fetches subsequentes): Airtable.getSearches(results.offset, results => console.log(results));
	static getSearches(offset, onFetch, onError) {
		axios.get(`${AIRTABLE_API}?filterByFormula=({Squad})%20=%20"${SQUAD}"&pageSize=10&view=Grid%20view${offset ? '&offset=' + offset : ''}`,
			{
				headers: {
					"Authorization": `Bearer ${AIRTABLE_TOKEN}`,
					"Content-Type": "application/json;charset=UTF-8"
				}
			}).then(response => {
				if (typeof onFetch === 'function') onFetch(response.data);
			}).catch(err => {
				if (typeof onError === 'function') onError(err);
			});
	}
}