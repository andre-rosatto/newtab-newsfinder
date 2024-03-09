import React from "react";
import '../css/search.css';
import '../css/login.css';

const Search = () => {
    return (
        <div className="main">
            <div className="searchHeader">
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
                    <span>SAIR</span>
                    </button>
                </div>
            </div>
            <div>
                <h2 className="titleBuscas">Buscas Realizadas</h2>
                <table className="tableBuscas">
                    <thead>
                        <th>Buscas</th>
                        <th>Data</th>
                        <th>Hora</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>###########</td>
                            <td>###########</td>
                            <td>###########</td>
                        </tr>
                        <tr>
                            <td>@@@@@@@@@@@</td>
                            <td>@@@@@@@@@@@</td>
                            <td>@@@@@@@@@@@</td>
                        </tr>
                        <tr>
                            <td>###########</td>
                            <td>###########</td>
                            <td>###########</td>
                        </tr>
                        <tr>
                            <td>@@@@@@@@@@@</td>
                            <td>@@@@@@@@@@@</td>
                            <td>@@@@@@@@@@@</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Search;
