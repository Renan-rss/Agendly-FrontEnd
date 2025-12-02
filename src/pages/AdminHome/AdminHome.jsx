import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

export default function AdminHome() {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [form, setForm] = useState({ 
    nome: "", 
    email: "",
    setor: "", 
    senha: "" 
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const profs = JSON.parse(localStorage.getItem("usuarios")) || [];
    profs.push({ ...form, id: Date.now(), tipo: "profissional" });
    localStorage.setItem("usuarios", JSON.stringify(profs));
    alert("Profissional cadastrado!");

    setForm({ 
      nome: "", 
      email: "", 
      setor: "", 
      senha: "" 
    });
  }

  return (

    <div className="admin-page">

      <nav className="admin-navbar">

        <h2>Admin - Agendly</h2>
        <ul className="nav-tabs">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li className={activeTab === "cadastro" ? "active" : ""} onClick={() => setActiveTab("cadastro")}>Cadastrar Profissional</li>
        </ul>

        <button onClick={() => navigate("/")}>Sair</button>
        
      </nav>

      <main className="admin-main">
        {activeTab === "dashboard" && (
          <section>
            <h1>Bem-vindo, Admin!</h1>
            <p>Use a aba “Cadastrar Profissional” para adicionar novos membros à equipe.</p>
          </section>
        )}

        {activeTab === "cadastro" && (
          <section className="section-cadastro">
            <h2>Cadastrar Profissional</h2>
            <form onSubmit={handleSubmit}>
              <label>Nome</label>
              <input type="text" name="nome" value={form.nome} onChange={handleChange} required />

              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />

              <label>Setor</label>
              <select name="setor" value={form.setor} onChange={handleChange} required>
                <option value="">Selecione o setor</option>
                <option value="Pedagógico">Pedagógico</option>
                <option value="Psicossocial">Psicossocial</option>
              </select>

              <label>Senha</label>
              <input type="password" name="senha" value={form.senha} onChange={handleChange} required />

              <button type="submit">Cadastrar</button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
