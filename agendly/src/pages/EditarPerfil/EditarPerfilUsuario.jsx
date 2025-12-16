import { useState } from "react";
import "./EditarPerfilUsuario.css";

export default function EditarPerfil({ onClose }) {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const [error, setError] = useState("");

  function validarCampos() {
    if (!email.includes("@")) {
      return "Digite um email válido.";
    }

    if (senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres.";
    }

    if (senha !== confirmarSenha) {
      return "As senhas não coincidem.";
    }

    if (!/^\(\d{2}\)\s?\d{5}-\d{4}$/.test(telefone)) {
      return "Digite um telefone no formato (00) 00000-0000.";
    }

    return "";
  }

  function salvar() {
    const erro = validarCampos();
    if (erro) {
      setError(erro);
      return;
    }

    setError("");

    
    alert("Perfil salvo com sucesso!");

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>Editar Perfil</h2>

        {error && <p className="modal-error">{error}</p>}

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" />

        <label>Senha</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Nova senha" />

        <label>Confirmar Senha</label>
        <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} placeholder="Confirme a nova senha"/>

        <label>Telefone</label>
        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" />

        <div className="modal-buttons">
          <button onClick={salvar}>Salvar</button>
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        </div>

      </div>
    </div>
  );
}
