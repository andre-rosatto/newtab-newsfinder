import React, {useState} from "react";
import '../css/login.css';

const LoginForm = () => {
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
      // lógica para validar os campos do formulário
      if (username === 'usuario' && password === 'senha') {
        // Login bem-sucedido
        alert('Login bem-sucedido!');
      } else {
        // Login falhou
        setError('Nome de usuário ou senha incorretos');
      }
    };

return (
    <div className="main">
      <div className="loginHeader">
        <h2>NewsFinder</h2>
        <button className="buttonHome">
          <span className="dot">.</span> 
          <span className="home">HOME</span>
        </button>
      </div>
      <div className="loginBox">
        <div className="intoLogin">
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit} className="userPassword">
            <h2 className="titleLoginBox">Login</h2>
            <div className="formItens">
              <div>
                {/* <label htmlFor="username">Nome de Usuário:</label> */}
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                {/* <label htmlFor="password">Senha:</label> */}
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <button type="submit">ACESSAR</button>
          </form>
          </div>
      </div>
  </div>
  );
};

export default LoginForm;