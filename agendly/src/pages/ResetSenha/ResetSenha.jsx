import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";


export default function ResetSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function handleReset(e) {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find((u) => u.email === email);

    if (!usuario) {
      alert("Nenhum usuário encontrado com esse email.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    usuario.senha = novaSenha;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Senha redefinida com sucesso!");
    navigate("/");
  }

  return (
    <div className="container">
      <form onSubmit={handleReset}>
        <h1>Redefinir Senha</h1>
        <div className="input-field">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">Redefinir</button>
         <button type="button" style={{ marginTop: "10px" }} onClick={() => navigate("/")} >Voltar</button>
      </form>
    </div>
  );
}
