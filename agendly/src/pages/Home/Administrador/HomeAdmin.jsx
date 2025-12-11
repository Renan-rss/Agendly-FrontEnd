import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaChartLine,
  FaBars,
  FaCog,
  FaBook,
} from "react-icons/fa";

import "./HomeAdmin.css";

export default function HomeAdmin() {
  return (
    <div className="admin-container">

      <div className="sidebar">
        <h2 className="logo">Agendly<span></span></h2>

        <ul className="menu">
          <li className="active">
            <FaChartLine className="icon" />  Dashboard</li>

          <li><FaUsers className="icon" />  Alunos</li>

          <li><FaUserMd className="icon" />  Profissionais</li>

          <li><FaCalendarCheck className="icon" />  Agendamentos</li>

          <li><FaBook className="icon" />  Relatórios</li>

          <li><FaCog className="icon" />  Configurações</li>
        </ul>
      </div>

      <main className="content">

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
              <h2></h2>
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


        <div className="dashboard-grid">

          <div className="panel panel-large">
            <h3>Agendamentos por mês</h3>
            <div className="placeholder"></div>
          </div>

          <div className="panel">
            <h3>Avisos</h3>
            <ul>
              <li>Sessões pendentes: 4</li>
              <li>Cancelamentos recentes: 2</li>
            </ul>
          </div>

        </div>

      </main>
    </div>
  );
}
