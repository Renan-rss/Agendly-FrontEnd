/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUserMd, 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaPhone, 
  FaBriefcase, 
  FaCalendarAlt 
} from "react-icons/fa";
import { cadastrarProfissional } from "../../../services/profissionalService.js";

export default function CadastrarProfissional() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Estados para disponibilidade (caso queira reativar a lógica de dias depois)
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFim, setHoraFim] = useState("18:00");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cargo: "",
    telefone: "",
    tipoUser: "PROFISSIONAL"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      // Se o seu backend exige disponibilidade no cadastro, o array vai aqui
      disponibilidades: diasSelecionados.map(dia => ({
        diasSemana: dia,
        horaInicio,
        horaFim
      }))
    };

    try {
      await cadastrarProfissional(payload);
      alert("Profissional cadastrado com sucesso!");
      navigate("/admin/profissionais");
    } catch (err) {
      console.error("Erro detalhado do servidor:", err.response?.data);
      alert("Falha no cadastro: Verifique se os dados estão corretos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="estudantes-lista">
      <header className="estudantes-header">
        <div className="header-titles">
          <h1>Novo Profissional</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "5px" }}>
            Cadastre especialistas para realizar os atendimentos na plataforma.
          </p>
        </div>
      </header>

      <div className="panel panel-form" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          {/* NOME COMPLETO */}
          <div className="form-group">
            <label><FaUser style={{ marginRight: "8px" }} /> Nome Completo</label>
            <input 
              name="nome" 
              placeholder="Digite o nome completo..."
              value={formData.nome} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* EMAIL E SENHA */}
          <div className="form-row">
            <div className="form-group">
              <label><FaEnvelope style={{ marginRight: "8px" }} /> E-mail</label>
              <input 
                type="email" 
                name="email" 
                placeholder="exemplo@agendly.com"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label><FaLock style={{ marginRight: "8px" }} /> Senha</label>
              <input 
                type="password" 
                name="senha" 
                placeholder="••••••••"
                value={formData.senha} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* TELEFONE E SETOR */}
          <div className="form-row">
            <div className="form-group">
              <label><FaPhone style={{ marginRight: "8px" }} /> Telefone</label>
              <input 
                name="telefone" 
                placeholder="(00) 00000-0000"
                value={formData.telefone} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label><FaBriefcase style={{ marginRight: "8px" }} /> Setor / Cargo</label>
              <select 
                name="cargo" 
                value={formData.cargo} 
                onChange={handleChange} 
                required
              >
                <option value="">Selecione o setor...</option>
                <option value="PEDAGOGICO">Pedagógico</option>
                <option value="PISCOSOCIAL">Psicossocial</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: "25px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1 
            }}
          >
            {loading ? "Salvando informações..." : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}