import React, { useState, useEffect } from "react";
import '../css/search.css';
import { useNavigate } from "react-router";
import axios from "axios";

const Search = () => {
    const [buscas, setBuscas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(null);
    // const [page, setPage] = useState(1);
    // const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBuscas();
    }, []);

const fetchBuscas = async () => {
    setLoading(true);
    try {
        const response = await axios.get('https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas?maxRecords=10&pageSize=5&view=Grid%20view', {
            headers: {
                Authorization: 'Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439'
            }

        });

        // setBuscas(prevBuscas => [...prevBuscas, ...response.data.records]);
        setBuscas(response.data.records);
        setOffset(response.data.offset);
        console.log(response.data)

        // const newRecords = response.data.records;
        // console.log(newRecords)

        // if (newRecords.length > 0) {
        //     setHasMore(false);
        // } else {
        //     setHasMore(true);
        // }

        // setBuscas(newRecords);
        
        // if (response.data.offset) {
        //     setHasMore(true);
        // } else {
        //     setHasMore(false);
        // }

        // setBuscas(prevBuscas => {
        //     const newRecords = response.data.records.filter(record => !prevBuscas.some(busca => busca.id === record.id));
        //     return [...prevBuscas, ...newRecords];
        // });
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    } finally {
        setLoading(false);
    }
};

    const handleLogout = () => {
        navigate('/')
    };

    const handleNextPage = () => {
        fetchBuscas();
        // setPage(prevPage => prevPage + 1);
    }
 
    return (
        <div className="main">
            <div className="navbar">
                    <div className="titleNews">
                        <h2 className="newsFinder">newsFinder</h2>
                    </div>
                
                    <div className="btnHeader">
                        <button className="buttonHome">
                        <span className="dot">.</span> 
                        <span className="home">HOME</span>
                        </button>
                        <button className="buttonSair">
                        <span className="dot">.</span> 
                        <span onClick={handleLogout}>SAIR</span>
                        </button>
                    </div> 
            </div>
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
                            {buscas.map((busca, index) => (
                                <tr key={index}>
                                    <td className="colBuscas">{busca.fields.Busca}</td>
                                    <td className="colDate">{new Date(busca.fields.Data).toLocaleDateString()}</td>
                                    <td className="colTime">{new Date(busca.createdTime).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && <p>Carregando...</p>}
                </div>
                <div>
                {!loading && offset && (
                        <button onClick={handleNextPage}>Próxima pagina</button>
                    )}
                </div>
        </div>
    );
};

export default Search;
