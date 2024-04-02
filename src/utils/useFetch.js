import { useState, useEffect } from 'react'

export const useFetch = (url) => {
	const [dataAbout, setDataAbout] = useState([]);
	const [dataEquip, setDataEquip] = useState([]);
	const [table, setTable] = useState('Projeto');
	const token = 'patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439';

	const parameter = {
		filterByFormula: "({Squad} = '03-24')"
	}

	const encodedParameter = Object.keys(parameter).map((key) => {
		return key + '=' + encodeURI(parameter[key]);
	});

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(`${url}${table}?${encodedParameter}&`, {
					headers: {
						Authorization: 'Bearer ' + token
					}
				})
				const dataResponse = await response.json();

				if (table === 'Projeto') {
					setDataAbout(dataResponse.records);
				} else {
					setDataEquip(dataResponse.records)
				}

				setTable('Equipe');
			}
			catch (error) {
				console.log(error);
			}
		}
		fetchData();

	}, [table, url, encodedParameter])

	return { dataAbout, dataEquip, table }

}


