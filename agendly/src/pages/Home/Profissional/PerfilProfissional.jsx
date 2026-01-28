import { useState, useEffect } from "react";
import { getPerfilProfissional } from "../../../services/profissionalService.js"; 

export default function PerfilProfissional() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cargo: "",
    telefone: ""
  });

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const response = await getPerfilProfissional();
        console.log("Dados do backend:", response.data);
        setUsuario({
          nome: response.data.nome || "Nome não retornado",
          email: response.data.email || "Email não retornado",
          cargo: response.data.cargo || "Especialista",
          telefone: response.data.telefone || "Sem telefone"
        });
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    }

    fetchPerfil();
  }, []);

  return (
    <div className="section-perfil">
      <header className="header">
        <h1>Meu Perfil Profissional</h1>
      </header>

      <div className="perfil-card">
        <label>Nome Completo</label>
        <input type="text" disabled value={usuario.nome} />

        <label>E-mail</label>
        <input type="text" disabled value={usuario.email} />

        <label>Especialidade / Cargo</label>
        <input type="text" disabled value={usuario.cargo} />

        <label>Telefone de Contato</label>
        <input type="text" disabled value={usuario.telefone} />

        <button className="btn-editar">Editar Perfil</button>
      </div>
    </div>
  );
}
