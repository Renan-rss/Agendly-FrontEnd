import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import CadastroUsuario from "./pages/CadastroUsuario/CadastroUsuario.jsx";
import Home from "./pages/Home/Home.jsx";
import AdminHome from "./pages/AdminHome/AdminHome.jsx";
import ProfissionalHome from "./pages/ProfissionalHome/ProfissionalHome.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/profissional" element={<ProfissionalHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
