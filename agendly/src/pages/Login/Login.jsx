import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/admin"); 
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o Sistema</h1>
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="recall-forget">
          <label>
            <input type="checkbox" /> Lembrar de mim
          </label>
          <Link to="/reset-senha">Esqueceu a senha?</Link>
        </div>
        <button type="submit">Entrar</button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/cadastro">Registrar</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
