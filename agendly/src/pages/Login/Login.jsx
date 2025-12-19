import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  
  async function handleSubmit(e) {
  e.preventDefault();
  try {
    const response = await login(email, senha);
    const usuario = response.data; 

    // Salva no navegador para a PrivateRoute e o Perfil usarem
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    if (usuario.tipoUser === "ADMIN") navigate("/admin");
    else if (usuario.tipoUser === "ESTUDANTE") navigate("/estudante");
    else if (usuario.tipoUser === "PROFISSIONAL") navigate("/profissional");

  } catch (error) {
    alert("Usuário ou senha inválidos");
    console.error(error);
  }
}

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o Sistema</h1>

        <div className="input-field">
          <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
          <FaLock className="icon" />
        </div>

        <button type="submit">Entrar</button>

        <div className="signup-link">
          <p>Não tem conta? <Link to="/cadastro">Registrar</Link></p>
        </div>
      </form>
    </div>
  );
}
