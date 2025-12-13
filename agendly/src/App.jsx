import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import CadastroUsuario from "./pages/CadastroUsuario/CadastroUsuario";
import ResetSenha from "./pages/ResetSenha/ResetSenha";
import HomeAdmin from "./pages/Home/Administrador/HomeAdmin";
import AdminDashboard from "./pages/Home/Administrador/AdminDashboard";
import CadastroProfissional from "./pages/Home/Administrador/HomeAdmin";
import Teste from "./pages/Home/Administrador/Teste";


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
          <Route path="teste" element={<Teste />} />
          <Route
            path="cadastrar-profissional"
            element={<CadastroProfissional />}
          />
        </Route>

      </Routes>
    </div>
  );
}
