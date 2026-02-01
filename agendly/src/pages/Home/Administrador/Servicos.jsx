/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { listarServicos } from "../../../services/usuarioService";
import { api } from "../../../services/api";
import { FaTrash } from "react-icons/fa";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    let montado = true; 

    async function buscarDados() {
      try {
        const res = await listarServicos();
        if (montado) {
          setServicos(res.data);
        }
      } catch (err) {
        console.error("Erro ao listar serviços", err);
      }
    }

    buscarDados();

    return () => { montado = false; }; 
  }, []); 

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este serviço?")) {
      try {
        await api.delete(`/servico/${id}`);
        alert("Serviço removido!");
      
        const res = await listarServicos();
        setServicos(res.data);
      } catch (err) {
        alert("Erro ao excluir serviço.");
      }
    }
  };

  return (
    <div className="content">
      <header className="header">
        <h1>Serviços Oferecidos</h1>
      </header>

      <div className="card-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Duração</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((s) => (
              <tr key={s.id}>
                <td><strong>{s.nome}</strong></td>
                <td>{s.descricao || "Sem descrição"}</td>
                <td>{s.duracaoPadraoMin} min</td>
                <td>
                  <span className={`badge ${s.ativo ? "active" : "inactive"}`}>
                    {s.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <button className="btn-icon delete" onClick={() => handleDelete(s.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {servicos.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                  Nenhum serviço cadastrado no banco.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}