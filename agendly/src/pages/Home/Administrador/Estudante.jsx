/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarEstudantes, deletarEstudante } from "../../../services/estudanteService";
import { FaTrash, FaGraduationCap, FaEnvelope, FaIdCard, FaSearch } from "react-icons/fa";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    try {
      setLoading(true);
      const res = await listarEstudantes();
      setAlunos(res);
    } catch (err) {
      console.error("Erro ao carregar alunos:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(id) {
    if (window.confirm("Deseja realmente remover este estudante?")) {
      try {
        await deletarEstudante(id);
        setAlunos(alunos.filter(a => a.id !== id));
      } catch (err) {
        console.error("Erro ao deletar estudante:", err);
        alert("Não foi possível excluir o estudante.");
      }
    }
  }

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
    aluno.matricula.toString().includes(busca)
  );

  return (
    <div className="estudantes-lista">
      <header className="estudantes-header">
        <div className="header-titles">
          <h1>Estudantes</h1>
        </div>
        
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Pesquisar por nome ou matrícula..." value={busca} onChange={(e) => setBusca(e.target.value)} className="search-input"/>
        </div>
      </header>

      <div className="estudante-lista-cards">
        {loading ? (
          <div className="empty-state">
            <p>Carregando estudantes...</p>
          </div>
        ) : alunosFiltrados.length === 0 ? ( 
          <div className="empty-state">
            <p>{busca ? "Nenhum resultado encontrado para sua busca." : "Nenhum estudante encontrado."}</p>
          </div>
        ) : (
          alunosFiltrados.map((aluno) => (
            <div key={aluno.id} className="estudante-card">
              <div className="estudante-info">
                <div className="estudante-avatar">
                  <FaGraduationCap />
                </div>
                <div>
                  <h3>{aluno.nome}</h3>
                  <p><FaEnvelope /> {aluno.email}</p>
                  <p><FaIdCard /> {aluno.matricula} - {aluno.curso}</p>
                </div>
              </div>
              <button
                className="estudante-btn-delete"
                onClick={() => handleDeletar(aluno.id)}
                title="Excluir Estudante"
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