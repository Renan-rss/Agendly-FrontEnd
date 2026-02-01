import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiPublica from "../../services/apiPublica";
import "../Login/Login.css";

export default function ResetSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

 async function handleReset(e) {
  e.preventDefault();

  if (novaSenha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    await apiPublica.post("/usuarios/reset-senha", {
      email,
      novaSenha,
    });

    alert("Senha redefinida com sucesso!");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Erro ao redefinir senha.");
  }
}



  return (
    <div className="container">
      <form onSubmit={handleReset}>
        <h1>Redefinir Senha</h1>

        <div className="input-field">
          <input type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input type="password" placeholder="Nova senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required/>
          <FaLock className="icon" />
        </div>

        <div className="input-field">
          <input type="password" placeholder="Confirmar nova senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required/>
          <FaLock className="icon" />
        </div>

        <button type="submit">Redefinir</button>
        <button type="button" style={{ marginTop: "10px" }} onClick={() => navigate("/")}>
          Voltar
        </button>
      </form>
    </div>
  );
}
