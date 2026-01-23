import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarProfissional } from "../../../services/profissionalService.js";

export default function CadastrarProfissional() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const diasOpcoes = [
    { label: "Seg", value: "MONDAY" },
    { label: "Ter", value: "TUESDAY" },
    { label: "Qua", value: "WEDNESDAY" },
    { label: "Qui", value: "THURSDAY" },
    { label: "Sex", value: "FRIDAY" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setDiasSelecionados(prev => 
      prev.includes(value) ? prev.filter(d => d !== value) : [...prev, value]
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    
    const payload = {
      ...formData,
      disponibilidades: diasSelecionados.map(dia => ({
        diasSemana: dia,
        horaInicio,
        horaFim
      }))
    };

    try {
      await cadastrarProfissional(payload);
      alert("Sucesso!");
      navigate("/admin/profissionais");
    } catch (err) {
      
      console.error("Erro detalhado do servidor:", err.response?.data);
      alert("Erro 400: Verifique se todos os campos obrigatórios estão preenchidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="content">
      <header className="header compact">
        <h1>Novo Profissional</h1>
      </header>

      <div className="panel panel-form compact-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input name="nome" value={formData.nome} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Telefone</label>
              <input name="telefone" value={formData.telefone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Setor</label>
              <select name="cargo" value={formData.cargo} onChange={handleChange} required>
                <option value="">Selecione...</option>
                <option value="PEDAGOGICO">Pedagógico</option>
                <option value="PISCOSOCIAL">Piscosocial</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Salvando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}