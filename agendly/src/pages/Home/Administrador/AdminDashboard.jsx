import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaChartLine,
} from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <>
      <header className="header">
        <h1>Visão Geral</h1>
      </header>

      <div className="cards">
        <div className="card">
          <FaUsers className="icon big" />
          <div>
            <p>Total de alunos</p>
            <h2>138</h2>
          </div>
        </div>

        <div className="card">
          <FaUserMd className="icon big" />
          <div>
            <p>Profissionais</p>
            <h2>10</h2>
          </div>
        </div>

        <div className="card">
          <FaCalendarCheck className="icon big" />
          <div>
            <p>Agendamentos (mês)</p>
            <h2>56</h2>
          </div>
        </div>

        <div className="card">
          <FaChartLine className="icon big" />
          <div>
            <p>Sessões concluídas</p>
            <h2>48</h2>
          </div>
        </div>
      </div>
    </>
  );
}
