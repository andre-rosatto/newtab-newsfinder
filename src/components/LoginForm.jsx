import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import axios from "axios";

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    }

      const handleUsernameBlur = (event) => {
        const { value } = event.target;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        if (!emailRegex.test(value)) {
          setError('E-mail inválido');
        } else {
          setError('');
        }
      };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
            const response = await axios.get('https://api.airtable.com/v0/app18hif6rR0tVAkT/Login?maxRecords=3&view=Grid%20view', {
                headers: {
                    Authorization: 'Bearer patFWS9nyevnpN89P.981364c0cc345536e73139edfae790d9727211ee50e99f1f8af8fe867467f439'
                }
            });
            const records = response.data.records;
            console.log(records);

            const isValidLogin = records.some(record => {
              return record.fields.Email === username && record.fields.Senha === password;
            });

            if (isValidLogin) {
              navigate('/search');
              // const loginTime = new Date();
              // AddLoginsDetails(username, loginTime);
            } else {
              setError('Nome de usuário ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };
    
return (
    <div className="main">
      <div className="loginBox">
        <div className="intoLogin">
          <form onSubmit={handleSubmit} className="userPassword">
            <h2 className="titleLoginBox">Login</h2>
            <div className="formItens">
              <div>
                <input required
                  type="email"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  onBlur={handleUsernameBlur}
                />
              </div>
              <div>
                <input required
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {error && <p className="errorMessage">{error}</p>}
              </div>
            </div>
            <div className="btnFormWrapper">
            <button type="submit" className="buttonForm">ACESSAR</button>
            </div>
          </form>
          </div>
      </div>
  </div>
  );
}

export default LoginForm;