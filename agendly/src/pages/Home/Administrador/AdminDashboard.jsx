import { useEffect, useState } from "react";
import { listarEstudantes, listarProfissionais } from "../../../services/usuarioService";
import { listarAgendamentos,buscarEstatisticasConcluidas } from "../../../services/agendamentoService";


import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaChartLine,
} from "react-icons/fa";


export default function AdminDashboard() {
  const [counts, setCounts] = useState({ alunos: 0, profissionais: 0, agendamentos: 0, concluidos:0 });

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resAlunos, resProfs, resAgend, resConcluidos] = await Promise.all([
          listarEstudantes(),
          listarProfissionais(),
          listarAgendamentos(),
          buscarEstatisticasConcluidas()
        ]);
        
        setCounts({
          alunos: resAlunos.data.length,
          profissionais: resProfs.data.length,
          agendamentos: resAgend.data.length,
          concluidos: resConcluidos.data
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }
    carregarDados();
  }, []);

  return (
    <>
      <header className="header">
        <h1>Dashboard</h1>
      </header>

      <div className="cards">
        <div className="card">
          <FaUsers className="icon big" />
          <div>
            <p>Total de alunos</p>
            <h2>{counts.alunos}</h2>
          </div>
        </div>

        <div className="card">
          <FaUserMd className="icon big" />
          <div>
            <p>Profissionais</p>
            <h2>{counts.profissionais}</h2>
          </div>
        </div>

        <div className="card">
          <FaCalendarCheck className="icon big" />
          <div>
            <p>Agendamentos (mês)</p>
            <h2>{counts.agendamentos}</h2>
          </div>
        </div>

        <div className="card">
          <FaChartLine className="icon big" />
          <div>
            <p>Sessões concluídas</p>
            <h2>{counts.concluidos}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
