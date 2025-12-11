import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import CadastroUsuario from "./pages/CadastroUsuario/CadastroUsuario";
import HomeAdmin from "./pages/Home/Administrador/HomeAdmin";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/admin" element={<HomeAdmin />} />
      </Routes>
    </div>
  );
}
