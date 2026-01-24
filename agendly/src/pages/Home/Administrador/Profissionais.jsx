import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarProfissionais, deletarProfissional } from "../../../services/profissionalService.js";
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
  <div className="profissionais-container">
    <header className="profissionais-header-fixed">
      <div className="header-info">
        <h1>Profissionais</h1>
      </div>
    </header>
    <div className="profissionais-lista" style={{ paddingTop: '80px' }}>
      {profissionais.map(prof => (
        <div key={prof.id} className="profissional-card">
          <div className="profissional-info">
            <div className="profissional-avatar"><FaUserMd /></div>
            <div>
              <h3>{prof.nome}</h3>
              <p><FaEnvelope /> {prof.email}</p>
              <p><FaIdCard /> {prof.cargo} {prof.registroProf ? `- ${prof.registroProf}` : ''}</p>
            </div>
          </div>
          <button className="btn-delete" onClick={() => handleDeletar(prof.id)}>
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
