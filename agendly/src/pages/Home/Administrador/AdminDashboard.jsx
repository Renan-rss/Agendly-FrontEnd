import { useEffect, useState } from "react";
import { listarUsuarios } from "../../../services/usuarioService";
import { listarTodosAgendamentos, buscarEstatisticasConcluidas } from "../../../services/agendamentoService";
import { FaUsers, FaUserMd, FaCalendarCheck, FaChartLine } from "react-icons/fa";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ 
    alunos: 0, 
    profissionais: 0, 
    agendamentos: 0, 
    concluidos: 0 
  });

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        const resultados = await Promise.allSettled([
          listarUsuarios(),
          listarTodosAgendamentos(),
          buscarEstatisticasConcluidas()
        ]);

        if (ativo) {
          const resUsers = resultados[0].status === 'fulfilled' ? resultados[0].value.data : [];
          const resAgend = resultados[1].status === 'fulfilled' ? resultados[1].value.data : [];
          const resConcl = resultados[2].status === 'fulfilled' ? resultados[2].value.data : 0;

          const totalAlunos = resUsers.filter(u => u.tipoUser === "ESTUDANTE").length;
          const totalProfs = resUsers.filter(u => u.tipoUser === "PROFISSIONAL").length;
          const valorConcluidos = typeof resConcl === 'object' ? (resConcl.total || 0) : resConcl;

          setCounts({
            alunos: totalAlunos,
            profissionais: totalProfs,
            agendamentos: resAgend.length || 0,
            concluidos: valorConcluidos || 0
          });
        }
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }

    carregarDados();
    return () => { ativo = false; };
  }, []);

  return (
    <div className="content">
      <h1>Dashboard</h1>
      
      <div className="cards">
        <div className="card">
          <FaUsers size={30} />
          <div className="card-info">
            <p>Total de alunos</p>
            <h2>{counts.alunos}</h2>
          </div>
        </div>

        <div className="card">
          <FaUserMd size={30} />
          <div className="card-info">
            <p>Profissionais</p>
            <h2>{counts.profissionais}</h2>
          </div>
        </div>

        <div className="card">
          <FaCalendarCheck size={30} />
          <div className="card-info">
            <p>Agendamentos</p>
            <h2>{counts.agendamentos}</h2>
          </div>
        </div>

        <div className="card">
          <FaChartLine size={30} />
          <div className="card-info">
            <p>Sessões concluídas</p>
            <h2>{counts.concluidos}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}