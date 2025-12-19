import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarEstudantes, deletarEstudante } from "../../../services/usuarioService"; // Verifique se deletarEstudante existe no seu service
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
      setAlunos(res.data);
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
    <div className="content">
      <header className="header">
        <div className="header-info">
          <h1>Estudantes</h1>
          <p>Gerencie os alunos matriculados no sistema.</p>
        </div>
        
        <button 
          onClick={() => navigate("/admin/cadastrar-estudante")}
          className="btn-header-action"
        >
          <span>+</span> Novo Estudante
        </button>
      </header>

      <div className="list-container">
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
            <div key={aluno.id} className="item-card">
              <div className="item-info">
                <div className="avatar">
                  <FaGraduationCap />
                </div>
                <div>
                  <h3>{aluno.nome}</h3>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                    <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                      <FaEnvelope style={{ marginRight: '5px' }} /> {aluno.email}
                    </p>
                    <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                      <FaIdCard style={{ marginRight: '5px' }} /> 
                      {aluno.matricula} - {aluno.curso}
                    </p>
                  </div>
                </div>
              </div>
              
              <button 
                className="btn-delete" 
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