import { useState, useEffect } from "react";
import { getPerfilEstudante } from "../../../services/estudanteService.js"; 

export default function PerfilEstudante() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    matricula: "",
    curso: "",
    telefone: ""
  });

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const response = await getPerfilEstudante();
        console.log("Dados do backend:", response.data);
        setUsuario({
          nome: response.data.nome || "Nome não retornado",
          email: response.data.email || "Email não retornado",
          matricula: response.data.matricula || "Matrícula não retornada",
          curso: response.data.curso || "Curso não retornado",
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
        <h1>Meu Perfil Estudante</h1>
      </header>

      <div className="perfil-card">
        <label>Nome</label>
        <input type="text" disabled value={usuario.nome} />

        <label>Email</label>
        <input type="text" disabled value={usuario.email} />

        <label>Matrícula</label>
        <input type="text" disabled value={usuario.matricula} />

        <label>Curso</label>
        <input type="text" disabled value={usuario.curso} />

        <label>Telefone de Contato</label>
        <input type="text" disabled value={usuario.telefone} />
      </div>
    </div>
  );
}
