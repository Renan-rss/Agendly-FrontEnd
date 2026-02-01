import { Outlet, Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/authService";
import {
  FaUsers,
  FaUserMd,
  FaUserShield, 
  FaChartLine,
  FaSignOutAlt,
  FaPlusCircle, 
  FaConciergeBell,
} from "react-icons/fa";

import "./HomeAdmin.css";

export default function HomeAdmin() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
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
            <Link to="/admin/alunos">
              <FaUsers className="icon" /> Estudantes
            </Link>
          </li>

          <li>
            <Link to="/admin/profissionais">
              <FaUserMd className="icon" /> Profissionais
            </Link>
          </li>

          <li>
            <Link to="/admin/admins">
              <FaUserShield className="icon" /> Administradores
            </Link>
          </li>

          <li>
            <Link to="/admin/servicos">
              <FaConciergeBell className="icon" /> Serviços
            </Link>
          </li>

          <li>
            <Link to="/admin/cadastrar-servico">
              <FaPlusCircle className="icon" /> Cadastrar Serviço
            </Link>
          </li>

          <li>
            <Link to="/admin/cadastrar-profissional">
              <FaUserMd className="icon" /> Cadastrar Profissional
            </Link>
          </li>

          <li>
            <Link to="/admin/cadastrar-admin">
              <FaUserShield className="icon" /> Cadastrar Admin
            </Link>
          </li>

          <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff4d4d', marginTop: '20px' }}>
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