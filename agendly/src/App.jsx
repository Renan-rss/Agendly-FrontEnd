import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

// Componentes de Autenticação
import Login from "./pages/Login/Login"; 
import CadastroUsuario from "./pages/CadastroUsuario/CadastroUsuario"; 
import ResetSenha from "./pages/ResetSenha/ResetSenha"; 
// Admin 
import HomeAdmin from "./pages/Home/Administrador/HomeAdmin";
import AdminDashboard from "./pages/Home/Administrador/AdminDashboard";
import Estudante from "./pages/Home/Administrador/Estudante";
import CadastrarProfissional from "./pages/Home/Administrador/CadastrarProfissional";
import Profissionais from "./pages/Home/Administrador/Profissionais";

// Estudante 
import HomeStudent from "./pages/Home/Estudante/HomeEstudante";
import Agendar from "./pages/Home/Estudante/Agendar";
import Historico from "./pages/Home/Estudante/Historico";
import PerfilEstudante from "./pages/Home/Estudante/PerfilEstudante"; 

// Profissional 
import Profissional from "./pages/Home/Profissional/Profissional";
import Agenda from "./pages/Home/Profissional/Agenda";
import Atendimentos from "./pages/Home/Profissional/Atendimentos";
import PerfilProfissional from "./pages/Home/Profissional/PerfilProfissional";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/reset-senha" element={<ResetSenha />} />

        {/*  Administrador */}
        <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<HomeAdmin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profissionais" element={<Profissionais />} />
            <Route path="cadastrar-profissional" element={<CadastrarProfissional />} />
            <Route path="alunos" element={<Estudante />} />
          </Route>
        </Route>

        {/* Estudante */}
        <Route element={<PrivateRoute allowedRoles={["ESTUDANTE"]} />}>
          <Route path="/estudante" element={<HomeStudent />}>
            <Route index element={<Agendar />} />
            <Route path="historico" element={<Historico />} />
            <Route path="perfil" element={<PerfilEstudante />} />
          </Route>
        </Route>

        {/* Profissional */}
        <Route element={<PrivateRoute allowedRoles={["PROFISSIONAL"]} />}>
          <Route path="/profissional" element={<Profissional />}>
            <Route index element={<Agenda />} />
            <Route path="atendimentos" element={<Atendimentos />} />
            <Route path="perfil" element={<PerfilProfissional />} />
          </Route>
        </Route>

      </Routes>
    </div>
  );
}