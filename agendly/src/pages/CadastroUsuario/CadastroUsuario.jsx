/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaIdBadge, FaBook } from "react-icons/fa";
import { criarEstudante, criarUsuario, listarUsuarios } from "../../services/usuarioService";
import "./CadastroUsuario.css";

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [temAdmin, setTemAdmin] = useState(true); 
  const [form, setForm] = useState({ 
    nome: "", email: "", senha: "", confirmarSenha: "", 
    isAdministrador: false, matricula: "", curso: "", telefone: "" 
  });

  useEffect(() => {
    async function verificarAdmin() {
      try {
        const response = await listarUsuarios();
        const adminExiste = response.data.some(u => {
          const r = u.role || u.tipoUser;
          return r && r.toString().trim().toUpperCase() === "ADMIN";
        });
        setTemAdmin(adminExiste);
      } catch (err) { 
        setTemAdmin(false); 
      }
    }
    verificarAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const tratarErro = (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 403) alert("Acesso negado.");
      else if (status === 409) alert("E-mail já cadastrado.");
      else alert(`Erro ${status}: Falha no processo.`);
    } else {
      alert("Erro de conexão.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmarSenha) return alert("As senhas não coincidem");

    try {
      let response;
      if (form.isAdministrador) {
        response = await criarUsuario({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          role: "ADMIN"
        });
      } else {
        response = await criarEstudante({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          telefone: form.telefone,
          role: "ESTUDANTE",
          matricula: Number(form.matricula),
          curso: form.curso
        });
      }

      const token = response.data?.token || response.data?.accessToken;
      
      if (token) {
        console.log("LOGIN.JSX → retorno do login():", response);
        localStorage.setItem("token", token);
      } else {
        console.warn("Token não encontrado no objeto:", response.data);
      }

      alert("Cadastro realizado!");
      navigate("/");
    } catch (error) {
      console.error(error);
      tratarErro(error);
    }
  };

  return (
    <div className="cadcontainer">
      <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>
        
        <div className="input-field">
          <input type="text" name="nome" placeholder="Nome completo" onChange={handleChange} value={form.nome} required />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input type="email" name="email" placeholder="E-mail" onChange={handleChange} value={form.email} required />
          <FaEnvelope className="icon" />
        </div>

        <div className="two-colunn">
          <div className="input-field">
            <input type="password" name="senha" placeholder="Senha" onChange={handleChange} value={form.senha} required />
            <FaLock className="icon" />
          </div>
          <div className="input-field">
            <input type="password" name="confirmarSenha" placeholder="Confirmar" onChange={handleChange} value={form.confirmarSenha} required />
            <FaLock className="icon" />
          </div>
        </div>

        {!temAdmin && (
          <div className="admin-toggle">
            <label>
              <input type="checkbox" name="isAdministrador" onChange={handleChange} checked={form.isAdministrador} /> 
              Sou Administrador
            </label>
          </div>
        )}

        {!form.isAdministrador && (
          <>
            <div className="input-field">
              <input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} value={form.telefone} required />
              <FaPhone className="icon" />
            </div>

            <div className="two-colunn">
              <div className="input-field">
                <input type="number" name="matricula" placeholder="Matrícula" onChange={handleChange} value={form.matricula} required />
                <FaIdBadge className="icon" />
              </div>
              <div className="input-field">
                <select name="curso" onChange={handleChange} value={form.curso} required>
                  <option value="">Selecione o Curso</option>
                  <option value="ADS">ADS</option>
                  <option value="ES">Engenharia de Software</option>
                </select>
                <FaBook className="icon" />
              </div>
            </div>
          </>
        )}

        <button type="submit">Cadastrar</button>
        <div className="signup-link">
          <p>Já tem uma conta? <Link to="/">Faça login</Link></p>
        </div>
      </form>
    </div>
  );
}