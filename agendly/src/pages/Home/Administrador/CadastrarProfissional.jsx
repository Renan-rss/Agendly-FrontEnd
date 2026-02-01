import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaBriefcase } from "react-icons/fa";
import { cadastrarProfissional } from "../../../services/profissionalService.js";
import { listarServicos } from "../../../services/usuarioService"; 

export default function CadastrarProfissional() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [servicosDisponiveis, setServicosDisponiveis] = useState([]); 
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cargo: "", 
    telefone: "",
    tipoUser: "PROFISSIONAL"
  });

  useEffect(() => {
    listarServicos().then(res => setServicosDisponiveis(res.data || []));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      nome: formData.nome.trim(),
      email: formData.email.trim(),
      cargo: formData.cargo.trim(), 
      disponibilidades: [] 
    };

    try {
      await cadastrarProfissional(payload);
      alert("Profissional cadastrado com sucesso!");
      navigate("/admin/profissionais");
    } catch (err) {
      console.error("Erro no cadastro:", err);
      alert("Falha no cadastro: Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="content">
      <header className="header compact">
        <h1>Novo Profissional</h1>
      </header>

      <div className="panel panel-form" style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", background: "#333", borderRadius: "8px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FaUser /> Nome Completo</label>
            <input name="nome" value={formData.nome} onChange={handleChange} required />
          </div>

          <div className="form-row" style={{ display: "flex", gap: "15px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label><FaEnvelope /> E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label><FaLock /> Senha</label>
              <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row" style={{ display: "flex", gap: "15px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label><FaPhone /> Telefone</label>
              <input name="telefone" value={formData.telefone} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label><FaBriefcase /> Serviço (Cargo)</label>
              <select name="cargo" value={formData.cargo} onChange={handleChange} required>
                <option value="">Selecione o serviço...</option>
                {servicosDisponiveis.map(s => (
                  <option key={s.id} value={s.nome}>{s.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit" style={{ width: "100%", marginTop: "20px" }} disabled={loading}>
            {loading ? "Salvando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}