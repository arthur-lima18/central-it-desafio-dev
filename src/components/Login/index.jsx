import React, { useState } from "react";
import axios from "axios";
import "./styles.css"

export default function Login({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("https://gsm-hmg.centralitcloud.com.br/citsmart/services/login", {
        "clientId": "API_PBI",
        "language": "pt_BR",
        // "userName":"citsmart.local\\desafiodev",
        "userName":`citsmart.local\\${username}`,
        // "password": "desafi0Dev1@"
        "password": password
      })

      setToken(res.data.sessionID);
    } catch (err) {
      console.error("Usuário e/ou senha inválidos!");
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div className="login">
      <h2>Entre na sua conta</h2>
      <input 
        type="text" 
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}  
      />
      <input 
        type="password" 
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  
      />
      <button onClick={(e) => handleLogin(e)}>Entrar</button>
    </div>
  )
}