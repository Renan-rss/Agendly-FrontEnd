import { useEffect, useState } from "react";
import { listarAtendimentos, atualizarStatus, salvarRegistroAtendimento } from "../../../services/agendamentoService";

export default function Agenda() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("02");
  const [ano, setAno] = useState("2026");

  const [finalizandoId, setFinalizandoId] = useState(null);
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [comentarios, setComentarios] = useState("");

  const carregarDados = () => {
    listarAtendimentos()
      .then(res => {
        setTodos(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { carregarDados(); }, []);

  const handleStatusChange = async (id, novoStatus) => {
    if (novoStatus === "AGENDADO_ALUNO") {
      setFinalizandoId(null);
      setComentarios("");
      setStatusSelecionado("");
    } else {
      setFinalizandoId(id);
      setStatusSelecionado(novoStatus);
    }
  };

  const handleConfirmarFinalizacao = async (agendamento) => {
    if (!comentarios.trim()) return alert("Por favor, adicione uma anotação.");

    const registro = {
      agendamentoId: agendamento.id,
      profissionalId: agendamento.profissionalId, 
      dataAtendimento: new Date().toISOString(),
      anotacoesSigilosas: comentarios,
      encaminhamento: ""
    };

    console.log("Payload enviado ao servidor:", registro);

    try {

      await salvarRegistroAtendimento(registro);
      
      await atualizarStatus(agendamento.id, statusSelecionado);
      
      setFinalizandoId(null);
      setComentarios("");
      carregarDados();
      alert("Atendimento finalizado e registrado!");
    } catch (err) {
      console.error("Erro detalhado:", err.response?.data || err.message);
      alert("Erro ao salvar: " + (err.response?.data?.message || "Verifique o console"));
    }
  };

  const filtrados = todos.filter(a => {
    const dataRef = a.dataHorarioInicio || a.data_horario_inicio;
    if (!dataRef) return false;
    const [dataAno, dataMes, dataDia] = dataRef.split('T')[0].split(' ')[0].split('-');
    return (ano ? dataAno === ano : true) && 
           (mes ? dataMes === mes : true) && 
           (dia ? dataDia === dia : true);
  });

  return (
    <div className="content">
      <header className="header"><h1>Minha Agenda</h1></header>

      <div className="filter-container">
        <div className="filter-group">
          <label>DIA</label>
          <select value={dia} onChange={(e) => setDia(e.target.value)} className="date-picker">
            <option value="">Todos</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i+1} value={String(i+1).padStart(2,'0')}>{i+1}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>MÊS</label>
          <select value={mes} onChange={(e) => setMes(e.target.value)} className="date-picker">
            <option value="">Todos</option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
          </select>
        </div>

        <div className="filter-group">
          <label>ANO</label>
          <select value={ano} onChange={(e) => setAno(e.target.value)} className="date-picker">
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      <div className="panel-lista">
        {loading ? <p>Carregando...</p> : filtrados.map(a => (
          <div key={a.id} className="profissional-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div className="profissional-info">
                <span className="profissional-avatar">👤</span>
                <div>
                  <h3>{a.estudanteNome || "Lucas De Souza"}</h3>
                  <p><strong>Horário:</strong> {new Date(a.dataHorarioInicio || a.data_horario_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <select className="status-select" value={finalizandoId === a.id ? statusSelecionado : a.status} onChange={(e) => handleStatusChange(a.id, e.target.value)}>
                <option value="AGENDADO_ALUNO">Agendado</option>
                <option value="REALIZADO">Realizado</option>
                <option value="AUSENTE">Ausente</option>
              </select>
            </div>

            {finalizandoId === a.id && (
              <div className="finalizar-atendimento" style={{ marginTop: '15px', width: '100%' }}>
                <label style={{ fontSize: '11px', color: '#4da3ff', fontWeight: 'bold' }}>ANOTAÇÕES ({statusSelecionado})</label>
                <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)}placeholder="Escreva os detalhes aqui..."style={{ width: '100%', marginTop: '5px', padding: '10px', borderRadius: '8px', background: '#1e2124', color: 'white' }}/>
                <button className="btn-confirmar" onClick={() => handleConfirmarFinalizacao(a)} style={{ marginTop: '10px', width: '100%' }}>
                  Finalizar Atendimento
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}