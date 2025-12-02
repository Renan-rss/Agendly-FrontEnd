import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroUsuario.css";

import eyeShow from "../../assets/eye-open.png";
import eyeHide from "../../assets/eye-close.png";

export default function CadastroUsuario() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    matricula: "",
    curso: "",
    telefone: ""
  });

  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  function handleSubmit(e) {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuariosSalvos.push(form);
    localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

    alert("Cadastro realizado com sucesso!");
    navigate("/");
  }

  return (

    <form className="cadastro-form-cadastro" onSubmit={handleSubmit}>
      <h2>Cadastro de Usuário</h2>

      <label htmlFor="nome">Nome</label>
      <input id="nome" type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Digite seu nome" required />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Digite seu email"required />

      <label htmlFor="senha">Senha</label>
      <div className="cadastro-campo-senha">

        <input id="senha" type={showSenha ? "text" : "password"} name="senha" value={form.senha} onChange={handleChange} placeholder="Digite sua senha" required />
        <button type="button" className="cadastro-btn-icone" onClick={() => setShowSenha(!showSenha)} >
          <img src={showSenha ? eyeHide : eyeShow} className="cadastro-icone-olho" alt="mostrar/ocultar" />
        </button>
        
      </div>

      <label htmlFor="confirmarSenha">Confirmar Senha</label>
      <div className="cadastro-campo-senha">

        <input id="confirmarSenha" type={showConfirmar ? "text" : "password"} name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} placeholder="Confirme sua senha" required />
        <button type="button" className="cadastro-btn-icone" onClick={() => setShowConfirmar(!showConfirmar)} >
          <img src={showConfirmar ? eyeHide : eyeShow} className="cadastro-icone-olho" alt="mostrar/ocultar" />
        </button>

      </div>

      <label htmlFor="matricula">Matrícula</label>
      <input id="matricula" type="number" name="matricula" value={form.matricula} onChange={handleChange} placeholder="Digite sua matrícula" required />

      <label htmlFor="curso">Curso</label>
      <input id="curso" type="text" name="curso" value={form.curso} onChange={handleChange} placeholder="Digite seu curso" required />

      <label htmlFor="telefone">Telefone</label>
      <input id="telefone" type="text" name="telefone" value={form.telefone} onChange={handleChange} placeholder="Digite seu telefone" required />

      <button type="submit" className="btn-submit">Cadastrar</button>
      
    </form>
  );
}
