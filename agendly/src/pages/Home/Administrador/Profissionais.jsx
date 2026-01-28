/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { listarProfissionais, deletarProfissional } from "../../../services/profissionalService.js";
import { FaTrash, FaUserMd, FaEnvelope, FaIdCard, FaSearch } from "react-icons/fa";

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarProfissionais();
  }, []);

  async function carregarProfissionais() {
    try {
      setLoading(true);
      const res = await listarProfissionais();
      setProfissionais(res.data || []); 
    } catch (err) {
      console.error("Erro ao carregar profissionais:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(id) {
    if (window.confirm("Deseja realmente remover este profissional?")) {
      try {
        await deletarProfissional(id);
        setProfissionais(profissionais.filter(p => p.id !== id));
      } catch (err) {
        console.error("Erro ao deletar profissional:", err);
        alert("Não foi possível excluir o profissional.");
      }
    }
  }

  const profissionaisFiltrados = profissionais.filter(prof =>
    prof.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="estudantes-lista"> {/* Mesma classe da tela de alunos */}
      <header className="estudantes-header"> {/* Mesma classe da tela de alunos */}
        <div className="header-titles">
          <h1>Profissionais</h1>
        </div>
        
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <div className="estudante-lista-cards"> {/* Mesma classe da tela de alunos */}
        {loading ? (
          <div className="empty-state">
            <p>Carregando profissionais...</p>
          </div>
        ) : profissionaisFiltrados.length === 0 ? ( 
          <div className="empty-state">
            <p>{searchTerm ? "Nenhum resultado encontrado para sua busca." : "Nenhum profissional encontrado."}</p>
          </div>
        ) : (
          profissionaisFiltrados.map((prof) => (
            <div key={prof.id} className="estudante-card"> {/* Mesma classe do card de aluno */}
              <div className="estudante-info">
                <div className="estudante-avatar">
                  <FaUserMd />
                </div>
                <div>
                  <h3>{prof.nome}</h3>
                  <p><FaEnvelope /> {prof.email}</p>
                  <p><FaIdCard /> {prof.cargo} {prof.registroProf ? `- ${prof.registroProf}` : ''}</p>
                </div>
              </div>
              <button
                className="estudante-btn-delete"
                onClick={() => handleDeletar(prof.id)}
                title="Excluir Profissional"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}