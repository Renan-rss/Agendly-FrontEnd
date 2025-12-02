import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfissionalHome.css";

export default function ProfissionalHome() {
  const navigate = useNavigate();
  const usuarioLogadoId = parseInt(localStorage.getItem("logadoId"));
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const carregarAgendamentos = () => {
      const todosAgendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
      const meus = todosAgendamentos.filter(a => a.profissionalId === usuarioLogadoId);
      setAgendamentos(meus);
    };
    carregarAgendamentos();
  }, [usuarioLogadoId]);

  function marcarAtendido(id) {
    const todos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const atualizados = todos.map(a => a.id === id ? { ...a, status: "Atendido" } : a);
    localStorage.setItem("agendamentos", JSON.stringify(atualizados));
    setAgendamentos(atualizados.filter(a => a.profissionalId === usuarioLogadoId));
  }

  return (
    
    <div className="profissional-page">
      <nav className="profissional-navbar">
        <h2>Profissional - Agendly</h2>
        <button onClick={() => navigate("/")}>Sair</button>
      </nav>

      <main className="profissional-main">
        <h1>Seus Agendamentos</h1>
        {agendamentos.length === 0 && <p>Nenhum agendamento encontrado.</p>}
        <ul>
          {agendamentos.map(a => (
            <li key={a.id}>
              <strong>{a.nomeAluno}</strong> - {a.data} - {a.hora} - {a.status || "Pendente"}
              {a.status !== "Atendido" && <button onClick={() => marcarAtendido(a.id)}>Marcar Atendido</button>}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
