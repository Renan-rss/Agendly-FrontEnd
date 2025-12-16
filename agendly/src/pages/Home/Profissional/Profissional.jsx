import {
  FaCalendarCheck,
  FaClipboardList,
  FaUser
} from "react-icons/fa";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Profissional.css";

export default function Profissional() {

  const location = useLocation();
  const navigate = useNavigate();

  function ativo(path) {
    return location.pathname === path;
  }

  return (
    <div className="profissional-container">

      <div className="sidebar">
        <h2 className="logo">Agendly</h2>

        <ul className="menu">

          <li
            className={ativo("/profissional") ? "active" : ""}
            onClick={() => navigate("/profissional")}
          >
            <FaCalendarCheck className="icon" /> Agenda
          </li>

          <li
            className={ativo("/profissional/atendimentos") ? "active" : ""}
            onClick={() => navigate("/profissional/atendimentos")}
          >
            <FaClipboardList className="icon" /> Atendimentos
          </li>

          <li
            className={ativo("/profissional/perfil") ? "active" : ""}
            onClick={() => navigate("/profissional/perfil")}
          >
            <FaUser className="icon" /> Perfil
          </li>

        </ul>
      </div>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}
