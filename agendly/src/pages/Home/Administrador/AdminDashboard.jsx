import { useEffect, useState } from "react";
import { listarUsuarios } from "../../../services/usuarioService";
import { listarAgendamentos, buscarEstatisticasConcluidas } from "../../../services/agendamentoService";
import { FaUsers, FaUserMd, FaCalendarCheck, FaChartLine } from "react-icons/fa";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ alunos: 0, profissionais: 0, agendamentos: 0, concluidos: 0 });

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        const [resUsers, resAgend, resConcl] = await Promise.all([
          listarUsuarios(),
          listarAgendamentos(),
          buscarEstatisticasConcluidas()
        ]);

        if (ativo) {
          const lista = resUsers.data || [];
          
          // O segredo estava aqui: a API manda 'tipoUser' e não 'role'
          const totalAlunos = lista.filter(u => u.tipoUser === "ESTUDANTE").length;
          const totalProfs = lista.filter(u => u.tipoUser === "PROFISSIONAL").length;

          setCounts({
            alunos: totalAlunos,
            profissionais: totalProfs,
            agendamentos: (resAgend.data || []).length,
            concluidos: resConcl.data || 0
          });
        }
      } catch (err) {
        console.error("Erro na API", err);
      }
    }

    carregarDados();
    return () => { ativo = false; };
  }, []);

  return (
    <div className="content" style={{ padding: '20px' }}>
      <header className="header">
        <h1>Dashboard</h1>
      </header>

      <div className="cards">
        <div className="card">
          <FaUsers size={30} />
          <div>
            <p>Total de alunos</p>
            <h2>{counts.alunos}</h2>
          </div>
        </div>

        <div className="card">
          <FaUserMd size={30} />
          <div>
            <p>Profissionais</p>
            <h2>{counts.profissionais}</h2>
          </div>
        </div>

        <div className="card">
          <FaCalendarCheck size={30} />
          <div>
            <p>Agendamentos</p>
            <h2>{counts.agendamentos}</h2>
          </div>
        </div>

        <div className="card">
          <FaChartLine size={30} />
          <div>
            <p>Sessões concluídas</p>
            <h2>{counts.concluidos}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}