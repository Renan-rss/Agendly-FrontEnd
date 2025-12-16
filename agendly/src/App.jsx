import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import CadastroUsuario from "./pages/CadastroUsuario/CadastroUsuario";
import ResetSenha from "./pages/ResetSenha/ResetSenha";

import HomeAdmin from "./pages/Home/Administrador/HomeAdmin";
import AdminDashboard from "./pages/Home/Administrador/AdminDashboard";
import Agendamentos from "./pages/Home/Administrador/Agendamentos";
import Alunos from "./pages/Home/Administrador/Alunos";
import CadastrarProfissional from "./pages/Home/Administrador/CadastrarProfissional";
import Configuracoes from "./pages/Home/Administrador/Configuracoes";
import Profissionais from "./pages/Home/Administrador/Profissionais";
import Relatorios from "./pages/Home/Administrador/Relatorios";

import HomeStudent from "./pages/Home/Estudante/HomeEstudante";
import Agendar from "./pages/Home/Estudante/Agendar";
import Historico from "./pages/Home/Estudante/Historico";
import Perfil from "./pages/Home/Estudante/PerfilF";

import Profissional from "./pages/Home/Profissional/Profissional";
import Agenda from "./pages/Home/Profissional/Agenda";
import Atendimentos from "./pages/Home/Profissional/Atendimentos";


import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>

        
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/reset-senha" element={<ResetSenha />} />

        
      <Route path="/admin" element={<HomeAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="profissionais" element={<Profissionais />} />
        <Route path="cadastrar-profissional" element={<CadastrarProfissional />} />
        <Route path="alunos" element={<Alunos />} />
        <Route path="agendamento" element={<Agendamentos />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="configuracao" element={<Configuracoes />} />
      </Route>


        
        <Route path="/estudante" element={<HomeStudent />}>
          <Route index element={<Agendar />} />
          <Route path="historico" element={<Historico />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route path="/profissional" element={<Profissional />}>
          <Route index element={<Agenda />} />
          <Route path="atendimentos" element={<Atendimentos />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

      </Routes>
    </div>
  );
}
