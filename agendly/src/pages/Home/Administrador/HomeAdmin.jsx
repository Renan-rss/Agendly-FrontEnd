import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaChartLine,
  FaCog,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";

import "./HomeAdmin.css";

export default function HomeAdmin() {
  const navigate = useNavigate();

  function handleLogout() {
    // Remove o usuário do localStorage
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  }

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
              <FaUsers className="icon" /> Estudantes
            </Link>
          </li>

          <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff4d4d' }}>
            <FaSignOutAlt className="icon" /> Sair
          </li>

        </ul>
      </div>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
