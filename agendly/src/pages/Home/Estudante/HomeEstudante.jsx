import { Outlet, Link } from "react-router-dom";
import {
  FaCalendarPlus,
  FaHistory,
  FaUser
} from "react-icons/fa";

import "./Estudante.css";

export default function HomeStudent() {
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
        </ul>
      </div>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}
