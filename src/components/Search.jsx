import React, { useState, useEffect } from "react";
import '../css/Search.css';
import AirtableHandler from "../utils/airtableHandler";

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [offset, setOffset] = useState('');
    const [semMaisItens, setSemMaisItens] = useState(false);

    const getNextPage = () => {
        if (!semMaisItens) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439");

            let url = 'https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas?pageSize=10&view=Grid%20view';

            if (offset) {
                url += '&offset=' + offset;
            }

            fetch(url, {
                method: "GET",
                headers: myHeaders
            })
            .then((response) => response.json())
            .then((result) => {
                if (result && result.offset) {
                    setOffset(result.offset);
                } else {
                    setSemMaisItens(true);
                }

                setSearchResults(result.records);
            })
            .catch((error) => console.log(error));
        } else {
            console.log('Acabaram as páginas');
        }
    };

    useEffect(() => {
        getNextPage();
    }, []); // Chama a função quando o componente é montado

    return (
        <div className="main">
            <div>
                <h2 className="titleBuscas">Buscas Realizadas</h2>
                <table className="tableBuscas">
                    <thead className="tableHeader">
                        <tr>
                            <th className="nameBuscas">Buscas</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        {searchResults.map((result) => (
                            <tr key={result.id}>
                                <td className="colBuscas">{result.fields.Busca}</td>
                                <td className="colDate">{new Date(result.fields.Data).toLocaleDateString()}</td>
                                <td className="colTime">{new Date(result.createdTime).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={getNextPage}>Next</button>
            </div>
        </div>
    );
}

export default Search;
