import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaCalendarPlus,
  FaHistory,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import "./Estudante.css";

export default function HomeStudent() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  }

  return (
    <div className="user-container">
      <div className="sidebar">
        <h2 className="logo">Agendly</h2>

        <ul className="menu">
          <li>
            <Link to="/estudante">
              <FaCalendarPlus className="icon" /> Agendar
            </Link>
          </li>

          <li>
            <Link to="/estudante/historico">
              <FaHistory className="icon" /> Histórico
            </Link>
          </li>

          <li>
            <Link to="/estudante/perfil">
              <FaUser className="icon" /> Perfil
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