import { Outlet, Link } from "react-router-dom";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaChartLine,
  FaCog,
  FaBook,
} from "react-icons/fa";

import "./HomeAdmin.css";

export default function HomeAdmin() {
  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2 className="logo">Agendly</h2>

        <ul className="menu">
          <li>
            <Link to="/admin">
              <FaChartLine className="icon" /> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/profissionais">
              <FaUserMd className="icon" /> Profissionais
            </Link>
          </li>

          <li>
            <Link to="/admin/cadastrar-profissional">
              <FaUserMd className="icon" /> Cadastrar Profissional
            </Link>
          </li>

          <li>
            <Link to="/admin/alunos">
              <FaUsers className="icon" /> Alunos
            </Link>
          </li>

          <li>
            <Link to="/admin/agendamento">
              <FaCalendarCheck className="icon" /> Agendamentos
            </Link>
          </li>

          <li>
            <Link to="/admin/relatorios">
              <FaBook className="icon" /> Relatórios
            </Link>
          </li>

          <li>
            <Link to="/admin/configuracao">
              <FaCog className="icon" /> Configurações
            </Link>
          </li>
        </ul>
      </div>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
