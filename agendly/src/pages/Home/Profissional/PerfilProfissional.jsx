import { useState } from "react";

export default function PerfilProfissional() {
  const [usuario] = useState(() => {
    const dadosSalvos = localStorage.getItem("usuarioLogado");
    
    if (dadosSalvos) {
      const user = JSON.parse(dadosSalvos);
      // Log para você ver as chaves reais que vêm do seu Java
      console.log("Dados no LocalStorage:", user); 

      return {
        // Tente mapear para as chaves exatas que o seu Backend envia
        nome: user.nome || user.username || "Nome não retornado",
        email: user.email || user.login || "Email não retornado",
        cargo: user.cargo || user.tipoUser || "Especialista",
        telefone: user.telefone || "Sem telefone"
      };
    }
    return { nome: "", email: "", cargo: "", telefone: "" };
  });

  return (
    <div className="section-perfil">
      <header className="header">
        <h1>Meu Perfil Profissional</h1>
      </header>

      <div className="perfil-card">
        <label>Nome Completo</label>
        <input type="text" disabled value={usuario.nome} />

        <label>Email de Acesso</label>
        <input type="email" disabled value={usuario.email} />

        <label>Especialidade / Cargo</label>
        <input type="text" disabled value={usuario.cargo} />

        <label>Telefone de Contato</label>
        <input type="text" disabled value={usuario.telefone} />

        <button className="btn-editar">Editar Perfil</button>
      </div>
    </div>
  );
}