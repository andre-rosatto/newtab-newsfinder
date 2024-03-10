import React from "react";
import '../css/search.css';
import '../css/login.css';
import { GetLoginsDetails } from './LoginsDetails';

const Search = () => {
    const logins = GetLoginsDetails();
    console.log("Valor da variável logins:", logins);
    // const [logins, setLogins] = useState([]);

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
                        <tr>
                            <th>Buscas</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logins.map((login, index) => (
                        <tr key={index}>
                            <td>{login.username}</td>
                            <td>{new Date(login.loginTime).toLocaleDateString()}</td>
                            <td>{new Date(login.loginTime).toLocaleTimeString()}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Search;
