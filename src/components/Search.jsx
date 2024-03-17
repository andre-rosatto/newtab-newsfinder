import React, { useState, useEffect } from "react";
import '../css/search.css';
// import { GetLoginsDetails } from './LoginsDetails';
import { useNavigate } from "react-router";
import axios from "axios";

const Search = () => {
    // const logins = GetLoginsDetails();
    const [buscas, setBuscas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuscas = async () => {
            try {
                const response = await axios.get('https://api.airtable.com/v0/app18hif6rR0tVAkT/Buscas?maxRecords=9&view=Grid%20view', {
                    headers: {
                        Authorization: 'Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439'
                    }
                });
                setBuscas(response.data.records);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };
        fetchBuscas();
    }, []);
    // })

    const handleLogout = () => {
        navigate('/')
    };
 
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
                            {/* {logins.map((login, index) => (
                            <tr key={index}>
                                <td className="colBuscas">{login.username}</td>
                                <td className="colDate">{new Date(login.loginTime).toLocaleDateString()}</td>
                                <td className="colTime">{new Date(login.loginTime).toLocaleTimeString()}</td>
                            </tr>
                            ))} */}
                        
                    </table>
                </div>
        </div>
    );
};

export default Search;
