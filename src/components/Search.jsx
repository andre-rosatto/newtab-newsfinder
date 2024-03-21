import React, { useState, useEffect } from "react";
import '../css/search.css';
import { useNavigate } from "react-router";
import axios from "axios";

const Search = () => {
    const [buscas, setBuscas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(null);
    const [semMaisItens, setSemMaisItens] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuscas = async () => {
            setLoading(true);
            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439")
            

                let url = "https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas";

                if (offset) {
                    url += '&offset=' + offset;
                }

                const response = await fetch(url, {
                    method: "GET",
                    headers: myHeaders
                });

                const result = await response.json();

                if(result.offset) {
                    setOffset(result.offset);
                } else {
                    setSemMaisItens(true)
                }

                setBuscas(result.records);
                console.log(result.records);
            } catch (error) {
                console.log("Erro", error)
            } finally {
                setLoading(false)
            };
        }

        fetchBuscas();
    }, [page]); 

    // var offset = "";
    // var semMaisItens = "";

    // function getNextPage() {
    //     if (!semMaisItens) {
    //         const myHeaders = new Headers();
    //         myHeaders.append("Authorization", "Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439")

    //         let url = "https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas";

    //         if (offset) {
    //             url += '&offset=' + offset;
    //         }

    //         fetch(url, {
    //             method: "GET",
    //             headers: myHeaders
    //         })

    //         .then((response) => response.json())
    //         .then((result) => {
    //             if(result && result.offset) {
    //                 offset = result.offset;
    //             } else {
    //                 semMaisItens = true;
    //             }

    //             console.log(result.records);
    //         })

    //         .catch((error) => console.error(error));
    //     } else {
    //         console.log("Sem mais dados")
    //     }

    //     getNextPage()
    // }



// useEffect(() => {
//     const fetchBuscas = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas', {
//                 params: {
//                     maxRecords: pageSize,
//                     pageSize: pageSize,
//                     view: 'Grid view',
//                     offset: (page - 1) * pageSize,
//                 },
//                 headers: {
//                     Authorization: 'Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439'
//                 }
    
//             });
    
//             setBuscas(response.data.records);
//             setOffset(response.data.offset);
//             console.log(response.data.offset)
        
//         } catch (error) {
//             console.error('Erro ao buscar dados da API:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchBuscas();
// }, [page]);


    const handleLogout = () => {
        navigate('/')
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    }

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
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
                {!loading && offset && buscas.length === pageSize && (
                    <>
                        <button onClick={handlePreviousPage} disabled={page === 1}>Página Anterior</button>
                        <button onClick={handleNextPage}>Próxima pagina</button>
                    </>
                    )}
                </div>
        </div>
    );
};

export default Search;
