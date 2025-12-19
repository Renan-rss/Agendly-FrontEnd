import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { deletarProfissional, listarProfissionais } from "../../../services/profissionalService.js";
import { FaTrash, FaUserMd, FaEnvelope, FaIdCard } from "react-icons/fa";

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    carregarProfissionais();
  }, []);

  async function carregarProfissionais() {
    try {
      setLoading(true);
      const res = await listarProfissionais();
      setProfissionais(res.data); 
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

  return (
    <div className="content">
     
      <header className="header">
        <div className="header-info">
          <h1>Profissionais</h1>
          <p>Gerencie os especialistas cadastrados no sistema.</p>
        </div>
        
        <button 
          onClick={() => navigate("/admin/cadastrar-profissional")}
          className="btn-header-action"
        >
          <span>+</span> Novo Profissional
        </button>
      </header>

      
      <div className="list-container">
        {loading ? (
          <div className="empty-state">
            <p>Carregando profissionais...</p>
          </div>
        ) : profissionais.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum profissional encontrado.</p>
          </div>
        ) : (
          profissionais.map((prof) => (
            <div key={prof.id} className="item-card">
              <div className="item-info">
                <div className="avatar">
                  <FaUserMd />
                </div>
                <div>
                  <h3>{prof.nome}</h3>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                    <p style={{ color: '#7f8c8d' }}>
                      <FaEnvelope style={{ marginRight: '5px' }} /> {prof.email}
                    </p>
                    <p style={{ color: '#7f8c8d' }}>
                      <FaIdCard style={{ marginRight: '5px' }} /> {prof.cargo} - {prof.registroProf}
                    </p>
                  </div>
                </div>
              </div>
              
              <button 
                className="btn-delete" 
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