import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarEstudantes, deletarEstudante } from "../../../services/estudanteService";
import { FaTrash, FaGraduationCap, FaEnvelope, FaIdCard } from "react-icons/fa";


export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
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

  return (
    <div className="estudantes-lista">
      <header className="estudantes-header">
        <h1>Estudantes</h1>
      </header>

      <div className="estudante-lista-cards">
        {loading ? (
          <div className="empty-state">
            <p>Carregando estudantes...</p>
          </div>
        ) : alunos.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum estudante encontrado.</p>
          </div>
        ) : (
          alunos.map((aluno) => (
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
