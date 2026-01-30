/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaUserShield, FaTrash, FaEnvelope, FaSearch, FaIdBadge } from "react-icons/fa";
import { listarUsuarios, deletarUsuario } from "../../../services/usuarioService";

export default function Admin() {
  const [admins, setAdmins] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAdmins();
  }, []);

  async function carregarAdmins() {
    try {
      setLoading(true);
      const response = await listarUsuarios();
      const dadosBrutos = response.data || response;

      if (Array.isArray(dadosBrutos)) {
        const filtrados = dadosBrutos.filter(user => {
          const valorTipo = (user.tipoUser || user.role || "").toString().trim().toUpperCase();
          return valorTipo === "ADMIN";
        });
        setAdmins(filtrados);
      }
    } catch (err) {
      console.error("Erro ao carregar:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(id) {
    if (window.confirm("Deseja realmente remover este administrador?")) {
      try {
        await deletarUsuario(id);
        setAdmins(prev => prev.filter(a => a.id !== id));
      } catch (err) {
        alert("Erro ao excluir.");
      }
    }
  }

  const adminsFiltrados = admins.filter(admin =>
    (admin.nome?.toLowerCase().includes(busca.toLowerCase())) ||
    (admin.email?.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <div className="estudantes-lista">
      <header className="estudantes-header">
        <div className="header-titles">
          <h1>Administradores</h1>
        </div>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" className="search-input" placeholder="Pesquisar por nome ou e-mail..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
        </div>
      </header>

      <div className="estudante-lista-cards">
        {loading ? (
          <div className="empty-state"><p>Carregando administradores...</p></div>
        ) : adminsFiltrados.length === 0 ? (
          <div className="empty-state">
            <p>{busca ? "Nenhum administrador encontrado para sua busca." : "Nenhum administrador cadastrado."}</p>
          </div>
        ) : (
          adminsFiltrados.map((admin) => (
            <div key={admin.id} className="estudante-card">
              <div className="estudante-info">
                <div className="estudante-avatar">
                  <FaUserShield />
                </div>
                <div>
                  <h3>{admin.nome || admin.email.split('@')[0]}</h3>
                  <p><FaEnvelope /> {admin.email}</p>
                  <p><FaIdBadge /> Nível de Acesso: Administrador</p>
                </div>
              </div>
              <button className="estudante-btn-delete" onClick={() => handleDeletar(admin.id)} title="Excluir Administrador">
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}