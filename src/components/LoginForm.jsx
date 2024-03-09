import React, {useState} from "react";
import "../css/login.css";

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
    <div>
      <div className="loginHeader">
        <h2>NewsFinder</h2>
        <button>Home</button>
      </div>
      <div className="loginBox">
          <h2>Login</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Nome de Usuário:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
      </div>
  </div>
  );
};

export default LoginForm;