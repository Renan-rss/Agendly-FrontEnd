import { useEffect, useState } from "react";
import { listarProfissionais, listarServicos } from "../../../services/usuarioService";
import { criarAgendamento } from "../../../services/agendamentoService";

export default function Agendar() {
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);
  
  const [profissionalId, setProfissionalId] = useState("");
  const [servicoId, setServicoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  useEffect(() => {
    listarProfissionais()
      .then(res => setProfissionais(res.data))
      .catch(err => console.error("Erro ao listar profissionais", err));

    listarServicos()
      .then(res => setServicos(res.data))
      .catch(err => console.error("Erro ao listar serviços", err));
  }, []);

  
  const profissionaisFiltrados = profissionais.filter(p => {
    if (!servicoId) return true;
    const servico = servicos.find(s => s.id === servicoId);
    if (!servico) return true;

    const nomeServico = servico.nome.toLowerCase();
    const cargoProf = p.cargo.toLowerCase();

    if (nomeServico.includes("psico")) return cargoProf.includes("psico") || cargoProf.includes("social");
    if (nomeServico.includes("pedag")) return cargoProf.includes("pedag");
    
    return true;
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    
    if (!usuarioLogado) {
      alert("Sessão expirada. Faça login novamente.");
      return;
    }

    if (!profissionalId || !servicoId || !data || !horario) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      profissionalId: profissionalId,
      servicoId: servicoId,
      estudanteId: usuarioLogado.estudanteId || usuarioLogado.id, 
      dataHorarioInicio: `${data}T${horario}:00`,
      observacaoAluno: "" 
    };

  
    console.log("Payload sendo enviado:", payload);

    try {
      await criarAgendamento(payload);
      alert("Agendamento realizado com sucesso!");

    } catch (err) {
      console.error("Erro completo do servidor:", err.response?.data);
      alert("Erro ao agendar: " + (err.response?.data?.message || "ID nulo detectado no servidor."));
    }
  }

  return (
    <div className="content-agendar">
      <header className="header">
        <h1>Novo Agendamento</h1>
    
      </header>

      <div className="card-form">
        <form onSubmit={handleSubmit}>
          
          <label>Tipo de Atendimento (Serviço)</label>
          <select value={servicoId} onChange={e => {setServicoId(e.target.value); setProfissionalId("");}} required>
            <option value="">Selecione o Serviço</option>
            {servicos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>

          <label>Profissional Especialista</label>
          <select value={profissionalId} onChange={e => setProfissionalId(e.target.value)} required disabled={!servicoId}>
            <option value="">{servicoId ? "Selecione o Profissional" : "Escolha um serviço primeiro"}</option>
            {profissionaisFiltrados.map(p => (
              <option key={p.id} value={p.id}>{p.nome} ({p.cargo})</option>
            ))}
          </select>

          <div className="row">
            <div className="col">
              <label>Data</label>
              <input type="date" value={data} onChange={e => setData(e.target.value)} required min={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="col">
              <label>Horário</label>
              <input type="time" value={horario} onChange={e => setHorario(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn-agendar">Confirmar Agendamento</button>
        </form>
      </div>
    </div>
  );
}