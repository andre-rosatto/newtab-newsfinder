import React, { useState, useEffect } from "react";
import '../css/Search.css';
import AirtableHandler from "../utils/airtableHandler";

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [offsets, setOffsets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [semMaisItens, setSemMaisItens] = useState(false);

    const getNextPage = () => {
        if (!semMaisItens) {
            if (currentPage === 0) {
                // Primeira página
                AirtableHandler.getSearches(
                    null,
                    data => {
                        setSearchResults(data.records);
                        if (data.offset) {
                            setOffsets([data.offset]);
                        }

                        if (data.records.length === 0) {
                            setSemMaisItens(true);
                            console.log('semMaisItens atualizado:', semMaisItens);
                           
                        }
                    },
                    error => console.error(error)
                );
            } else if (currentPage > 0 && offsets[currentPage -1]) {
                // Páginas subsequentes
                
                AirtableHandler.getSearches(
                    offsets[currentPage - 1],
                    data => {
                        if (data.records.length > 0) {
                            setSearchResults(data.records);
                            setOffsets(prevOffsets => [...prevOffsets, data.offset]);
                        } else {
                            if (data.records.length === 0) {
                                console.log(data.records.length);
                                setSemMaisItens(true);
                                console.log('semMaisItens atualizado:', semMaisItens);
                            }
                        }
                    },
                    error => console.error(error)
                );
            }
        } else {
            console.log('Fim dos dados');
        }
    };

    //Ir para a próxima página
    const handleNextPage = () => {
        if (!semMaisItens && currentPage < offsets.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    //Voltar a página anterior
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            getNextPage();
        }
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
                    <button onClick={handlePreviousPage} disabled={currentPage === 0}>&#60;</button>
                    <button onClick={handleNextPage} disabled={semMaisItens === true}>&#62;</button>
                </div>
            </div>
            
        </div>
    );
}

export default Search;
