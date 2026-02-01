import { useState } from "react";
import { api } from "../../../services/api";

export default function CadastrarServico() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      nome: nome,
      descricao: descricao,
      duracaoPadraoMin: 50,
      ativo: true,
    };

    try {
      await api.post("/servico", payload);
      alert("Serviço criado com sucesso! Agora os estudantes podem vê-lo.");
      setNome("");
      setDescricao("");
    } catch (err) {
      console.error("Erro ao criar serviço", err);
      alert("Erro ao salvar o serviço no banco.");
    }
  }

  return (
    <div className="content-admin">
      <header className="header">
        <h1>Configurar Novo Serviço</h1>
      </header>

      <div className="card-form">
        <form onSubmit={handleSubmit}>
          <label>Nome do Serviço</label>
          <input type="text" placeholder="Ex: Psicologia, Pedagogia, Orientação..." value={nome} onChange={(e) => setNome(e.target.value)} required/>

          <label>Descrição do Atendimento</label>
          <textarea placeholder="Descreva brevemente como funciona este serviço..." value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="4"/>
            
          <button type="submit" className="btn-agendar">
            Salvar no Catálogo
          </button>
        </form>
      </div>
    </div>
  );
}
