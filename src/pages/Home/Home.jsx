import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("agendar");
  const [form, setForm] = useState({ profissional: "", data: "", horario: "" });
  const [agendamentos, setAgendamentos] = useState([]);

  const [emailUsuario] = useState(() => {
    const usuarioId = Number(localStorage.getItem("logadoId"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.email : "";
  });

  const profissionais = JSON.parse(localStorage.getItem("usuarios"))?.filter(u => u.tipo === "profissional") || [];
  profissionais.sort((a,b)=> a.nome.localeCompare(b.nome));


  useEffect(() => {
  if (!emailUsuario) return;
  setTimeout(() => { const todosAgendamentos = JSON.parse(localStorage.getItem("agendamentos")) || []; const meusAgendamentos = todosAgendamentos.filter(a => a.aluno === emailUsuario); setAgendamentos(meusAgendamentos); }, 0); }, [emailUsuario]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
  e.preventDefault();

  const agendamentosExistentes = JSON.parse(localStorage.getItem("agendamentos")) || [];

  const novoAgendamento = {
    id: Date.now(),
    profissionalId: Number(form.profissional), 
    nomeAluno: emailUsuario,                   
    data: form.data,
    hora: form.horario,
    status: "Pendente"
  };

  agendamentosExistentes.push(novoAgendamento);
  localStorage.setItem("agendamentos", JSON.stringify(agendamentosExistentes));

  alert("Agendamento realizado!");

  setForm({ profissional: "", data: "", horario: "" });
  setAgendamentos([...agendamentos, novoAgendamento]);
}



  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>Agendly</h2>
        <ul>
          <li className={activeTab === "agendar" ? "active" : ""} onClick={() => setActiveTab("agendar")}>Agendar</li>
          <li className={activeTab === "historico" ? "active" : ""} onClick={() => setActiveTab("historico")}>Histórico</li>
        </ul>
        <button onClick={() => navigate("/")}>Sair</button>
      </nav>

      <main>
        {activeTab === "agendar" && (
          <form className="agendamento-form" onSubmit={handleSubmit}>
            <h2>Agendar Atendimento</h2>
            <select name="profissional" value={form.profissional} onChange={handleChange} required>
              <option value="">Selecione profissional</option>
              {profissionais.map((p, i) => (
                <option key={i} value={p.id}> {p.nome} - {p.setor}</option>
              ))}
            </select>
            <input type="date" name="data" value={form.data} onChange={handleChange} required />
            <input type="time" name="horario" value={form.horario} onChange={handleChange} required />
            <button type="submit">Agendar</button>
          </form>
        )}

        {activeTab === "historico" && (
          <section className="historico-section">
            <h2>Meus Agendamentos</h2>
            {agendamentos.length === 0 ? (
              <p>Nenhum agendamento realizado ainda.</p>
            ) : (
              <ul>
                {agendamentos.map((a, i) => (
                  <li key={i}>
                    {a.profissional} - {a.data} às {a.horario}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
