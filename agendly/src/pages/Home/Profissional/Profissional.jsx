import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClipboardList,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import "./Profissional.css";

export default function Profissional() {
  const navigate = useNavigate();

  function handleLogout() {
    
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  }

  return (
    <div className="profissional-container">
      <div className="sidebar">
        <h2 className="logo">Agendly</h2>

        <ul className="menu">
          <li>
            <Link to="/profissional">
              <FaCalendarCheck className="icon" /> Agenda
            </Link>
          </li>

          <li>
            <Link to="/profissional/atendimentos">
              <FaClipboardList className="icon" /> Atendimentos
            </Link>
          </li>

          <li>
            <Link to="/profissional/perfil">
              <FaUser className="icon" /> Perfil
            </Link>
          </li>

          
          <li 
            onClick={handleLogout} 
            style={{ cursor: 'pointer', color: '#ff4d4d', marginTop: '20px' }}
          >
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