import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();

      if (username === 'usuario' && password === 'senha') {
        navigate('/search');
      } else {
        setError('Nome de usuário ou senha incorretos');
      }
    };

return (
    <div className="main">
      <div className="loginHeader">
        <h2 className="newsFinder">newsFinder</h2>
        <button className="buttonHome">
          <span className="dot">.</span> 
          <span className="home">HOME</span>
        </button>
      </div>
      <div className="loginBox">
        <div className="intoLogin">
          <form onSubmit={handleSubmit} className="userPassword">
            <h2 className="titleLoginBox">Login</h2>
            <div className="formItens">
              <div>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <input
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
};

export default LoginForm;