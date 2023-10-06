import React, { useState } from "react";
import axios from "axios";
import CentralITLogo from "../../assets/central-it-logo.svg";
import LoginImg from "../../assets/login-img.svg";
import "./styles.css"

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErro, setLoginErro] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("https://gsm-hmg.centralitcloud.com.br/citsmart/services/login", {
        "clientId": "API_PBI",
        "language": "pt_BR",
        "userName": `citsmart.local\\${username}`,
        "password": password
      })

      setToken(res.data.sessionID);
    } catch (err) {
      console.error("Usuário e/ou senha inválidos!");
      setLoginErro(true);
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div className="container">

      <div className="descricao-container">
        <header className="header">
          <img src={CentralITLogo} alt="Central IT" height={80}/>
        </header>
        <section className="banner">
          <img src={LoginImg} alt="" height={600}/>
          <h2>Boas vindas!</h2>
          <h3>Acesse agora a sua conta</h3>
          <p>Faça login e tenha acesso aos dados mais recentes e atualizados dos atendimentos</p>
        </section>
      </div>

      <aside className="login-container">
        <form className="login">
          <div className="login-content">
            <h3 className="login-title">Entre na sua conta</h3>
            <div className="form-group mt-3 pb-3">
              <label>Nome de Usuário</label>
              <input
                className="form-control mt-1"
                type="text"
                placeholder="Insira seu Nome de Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3 pb-4">
              <label>Senha</label>
              <input
                className="form-control mt-1 mb-4"
                type="password"
                placeholder="Insira sua Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleLogin(e)}>
                Entrar
              </button>
            </div>
            {
              loginErro && <p className="login-erro">Usuário e/ou senha incorretos! Tente novamente</p>
            }
          </div>
        </form>
      </aside>
      
    </div>
  )
}