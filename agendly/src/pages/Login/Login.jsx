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
      const response = await login({
        email: email,
        senha: senha
      });
      
      console.log("LOGIN.JSX → retorno do login():", response);

      const { token, role, id } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      localStorage.setItem("usuarioLogado", JSON.stringify({
        id: id,
        role: role
      }));

      if (role === "ADMIN") navigate("/admin");
      else if (role === "ESTUDANTE") navigate("/estudante");
      else if (role === "PROFISSIONAL") navigate("/profissional");

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

        <div className="recall-forget">
          <a href="/reset-senha">Esqueceu a senha?</a>
        </div>

        <button type="submit">Entrar</button>

        <div className="signup-link">
          <p>Não tem conta? <Link to="/cadastro">Registrar</Link></p>
        </div>
      </form>
    </div>
  );
}
