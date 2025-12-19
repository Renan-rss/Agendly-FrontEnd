import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaIdBadge,
  FaBook,
} from "react-icons/fa";
import { criarUsuario } from "../../services/usuarioService";
import "./CadastroUsuario.css";

export default function CadastroUsuario() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    isAdministrador: false,
    matricula: "",
    curso: "",
    telefone: "",
  });

  const CURSOS_DISPONIVEIS = [
    "Selecione o Curso",
    "Análise e Desenvolvimento de Sistemas",
    "Engenharia de Software",
    "Design Gráfico",
    "Marketing Digital",
    "Administração",
  ];

  function handleChange(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    if (name === "isAdministrador" && value === true) {
      setForm({ ...form, [name]: value, matricula: "", curso: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

 async function handleSubmit(e) {
  e.preventDefault();

  if (form.senha !== form.confirmarSenha) {
    alert("As senhas não coincidem");
    return;
  }

  
  const payload = {
  nome: form.nome,
  email: form.email,
  senha: form.senha,
  telefone: form.telefone,
  tipoUser: form.isAdministrador ? "ADMIN" : "ESTUDANTE",
  matricula: form.isAdministrador ? null : Number(form.matricula),
  curso: form.isAdministrador ? null : form.curso
};

  try {
    await criarUsuario(payload); 
    alert("Usuário cadastrado com sucesso");
    navigate("/");
  } catch (error) {
    console.error("Erro detalhado:", error.response?.data || error.message);
    alert("Erro ao cadastrar usuário. Verifique se a matrícula já existe ou se os campos estão corretos.");
  }
}

  

  return (
    <div className="cadcontainer">
      <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>
        <div className="input-field">
          <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required />
          <FaUser className="icon" />
        </div>

        <div className="two-colunn">
          <div className="input-field">
            <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
            <FaEnvelope className="icon" />
          </div>

          <div className="input-field">
            <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
            <FaPhone className="icon" />
          </div>
        </div>

        <div className="two-colunn">
          <div className="input-field">
            <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />
            <FaLock className="icon" />
          </div>

          <div className="input-field">
            <input type="password" name="confirmarSenha" placeholder="Confirmar senha" value={form.confirmarSenha} onChange={handleChange} required />
            <FaLock className="icon" />
          </div>
        </div>

        <div className="admin-toggle">
          <label>
            <input type="checkbox" name="isAdministrador" checked={form.isAdministrador} onChange={handleChange} />
            Sou Administrador
          </label>
        </div>

        {!form.isAdministrador && (
          <div className="two-colunn">
            <div className="input-field">
              <input type="number" name="matricula" placeholder="Matrícula" value={form.matricula} onChange={handleChange} required />
              <FaIdBadge className="icon" />
            </div>

            <div className="input-field">
              <select name="curso" value={form.curso} onChange={handleChange} required>
                <option value="" disabled hidden>Selecione o Curso</option>
                {CURSOS_DISPONIVEIS.slice(1).map((curso, index) => (
                  <option key={index} value={curso}>{curso}</option>
                ))}
              </select>
              <FaBook className="icon" />
            </div>
          </div>
        )}

        <button type="submit">Cadastrar</button>

        <div className="signup-link">
          <p>Já possui conta? <Link to="/">Entrar</Link></p>
        </div>
      </form>
    </div>
  );
}
