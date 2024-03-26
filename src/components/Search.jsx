import React, { useState, useEffect } from "react";
import '../css/Search.css';

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [offsets, setOffsets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [semMaisItens, setSemMaisItens] = useState(false);

    //Buscar a próxima página com os dados da API
    const getNextPage = () => {
        if (!semMaisItens) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439");

            let url = 'https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas?pageSize=10&view=Grid%20view';

            if (currentPage > 0) {
                url += `&offset=${offsets[currentPage - 1]}`;
            }

            fetch(url, {
                method: "GET",
                headers: myHeaders
            })
            .then((response) => response.json())
            .then((result) => {
                if (result && result.offset) {
                    setOffsets([...offsets, result.offset]); // Armazenar o novo offset
                } else {
                    setSemMaisItens(true);
                }

                setSearchResults(result.records);
            })
            .catch((error) => console.log(error));
        } else {
            console.log('Fim dos dados');
        }
    };

    //Ir para a próxima página
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    //Voltar para página anterior
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    //Ir para a primeira página
    const handleFirstPage = () => {
        setCurrentPage(0);
    };

    //Ir para a última página
    const handleLastPage = () => {
        setCurrentPage(offsets.length);
    };

    useEffect(() => {
        getNextPage();
    }, [currentPage]); // Atualiza os dados sempre que a página atual muda

    return (
        <div className="main">
            <div>
                <h2 className="titleBuscas">Buscas Realizadas</h2>
                <table className="tableBuscas" cellSpacing="0">
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
                                <td className="colDate">{new Date(result.fields.Data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit'})}</td>
                                <td className="colTime">{new Date(result.createdTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="btPages">
                    <button onClick={handleFirstPage} disabled={currentPage === 0}>&#60;&#60;</button>
                    <button onClick={handlePreviousPage} disabled={currentPage === 0}>&#60;</button>
                    <button onClick={handleNextPage} disabled={semMaisItens}>&#62;</button>
                    <button onClick={handleLastPage} disabled={currentPage === offsets.length - 1}>&#62;&#62;</button>
                </div>
            </div>
            
        </div>
    );
}

export default Search;
 