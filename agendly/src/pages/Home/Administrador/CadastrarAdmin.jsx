
import { useState } from "react";
import { FaUserShield, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { criarUsuario } from "../../../services/usuarioService"; 

export default function CadastrarAdmin() {
  const [formData, setFormData] = useState({
    nome: "", 
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dadosParaEnvio = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      role: "ADMIN" 
    };

    try {
   
      await criarUsuario(dadosParaEnvio);
      
      alert("Administrador cadastrado com sucesso no banco de dados!");

      setFormData({ nome: "", email: "", senha: "" });
    } catch (err) {
      console.error("Erro ao salvar no banco:", err);
      const mensagemErro = err.response?.data?.message || "Erro ao conectar com o servidor.";
      alert("Falha no cadastro: " + mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="estudantes-lista">
      <header className="estudantes-header">
        <div className="header-titles">
          <h1>Cadastrar Admin</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "5px" }}>
            Adicione um novo usuário com privilégios administrativos.
          </p>
        </div>
      </header>

      <div className="panel panel-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FaUser style={{ marginRight: "8px" }} /> Nome Completo</label>
            <input type="text" placeholder="Digite o nome do administrador..." value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})}required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><FaEnvelope style={{ marginRight: "8px" }} /> E-mail</label>
              <input type="email" placeholder="admin@email.com" value={formData.email}onChange={(e) => setFormData({...formData, email: e.target.value})}required />
            </div>
            <div className="form-group">
              <label><FaLock style={{ marginRight: "8px" }} /> Senha</label>
              <input type="password" placeholder="••••••••" value={formData.senha}onChange={(e) => setFormData({...formData, senha: e.target.value})}required />
            </div>
          </div>

          <button type="submit" disabled={loading}style={{   marginTop: "20px",  cursor: loading ? "not-allowed" : "pointer",  opacity: loading ? 0.7 : 1 }}>
            {loading ? "Processando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}