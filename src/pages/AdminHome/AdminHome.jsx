import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

export default function AdminHome() {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [form, setForm] = useState({ 
    nome: "", 
    email: "",
    setor: "",
    senha: "",
  });

  const [profs, setProfs] = useState([]);

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    const onlyProfs = stored.filter(u => u.tipo === "profissional");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfs(onlyProfs);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    const novo = { ...form, id: Date.now(), tipo: "profissional" };

    stored.push(novo);
    localStorage.setItem("usuarios", JSON.stringify(stored));

    alert("Profissional cadastrado!");

    setProfs(prev => [...prev, novo]);

    setForm({ nome: "", email: "", setor: "", senha: "" });
  }

  function removerProf(id) {
    if(!confirm("Tem certeza que deseja remover?")) return;

    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    const atualizado = stored.filter(u => u.id !== id);
    localStorage.setItem("usuarios", JSON.stringify(atualizado));

    setProfs(profs.filter(p => p.id !== id));
  }

  return (

    <div className="admin-page">

      <nav className="admin-navbar">

        <h2>Admin - Agendly</h2>

        <ul className="nav-tabs">
          <li 
            className={activeTab === "dashboard" ? "active" : ""} 
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>

          <li className={activeTab === "cadastro" ? "active" : ""} onClick={() => setActiveTab("cadastro")}> Cadastrar Profissional </li>
          <li className={activeTab === "profissionais" ? "active" : ""} onClick={() => setActiveTab("profissionais")} > Profissionais </li>

        </ul>

        <button onClick={() => navigate("/")}>Sair</button>
        
      </nav>

      <main className="admin-main">

        {activeTab === "dashboard" && (
          <section>
            <h1>Bem-vindo, Admin!</h1>
            <p>Use o menu para gerenciar profissionais.</p>
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

        {activeTab === "profissionais" && (
          <section className="section-profissionais">
            <h2>Profissionais Cadastrados</h2>

            {profs.length === 0 ? (
              <p>Nenhum profissional cadastrado ainda.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Setor</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {profs.map(p => (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.email}</td>
                      <td>{p.setor}</td>
                      <td>
                        <button 
                          className="btn-remove"
                          onClick={() => removerProf(p.id)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

      </main>
    </div>
  );
}
