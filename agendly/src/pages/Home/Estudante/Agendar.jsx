/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { listarProfissionais, listarServicos } from "../../../services/usuarioService";
import { listarHorariosDisponiveis, buscarDiasTrabalho } from "../../../services/disponibilidadeService";
import { criarAgendamento } from "../../../services/agendamentoService";

export default function Agendar() {
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [profissionalId, setProfissionalId] = useState("");
  const [servicoId, setServicoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [diasAtendimento, setDiasAtendimento] = useState([]);

  useEffect(() => {
    listarProfissionais().then(res => setProfissionais(res.data || []));
    listarServicos().then(res => setServicos(res.data || []));
  }, []);

  useEffect(() => {
    if (profissionalId && data) {
      listarHorariosDisponiveis(profissionalId, data)
        .then(res => setHorariosDisponiveis(res.data || []))
        .catch(() => setHorariosDisponiveis([]));
    }
  }, [profissionalId, data]);

  const selecionarProfissional = async (id) => {
    setProfissionalId(id);
    setData("");
    setHorario("");
    setHorariosDisponiveis([]);
    setDiasAtendimento([]); 
    
    try {
      const res = await buscarDiasTrabalho(id);
      
      const ordemSemana = {
        "MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3, "THURSDAY": 4, 
        "FRIDAY": 5, "SATURDAY": 6, "SUNDAY": 7
      };

      const traducao = {
        MONDAY: "Segunda", TUESDAY: "Terça", WEDNESDAY: "Quarta", 
        THURSDAY: "Quinta", FRIDAY: "Sexta", SATURDAY: "Sábado", SUNDAY: "Domingo"
      };
      
      if (res.data && res.data.length > 0) {
        const diasOrdenados = [...res.data].sort((a, b) => 
          (ordemSemana[a] || 99) - (ordemSemana[b] || 99)
        );

        setDiasAtendimento(diasOrdenados.map(dia => traducao[dia] || dia));
      }
    } catch (err) {
      console.error("Erro ao carregar dias de atendimento:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("usuarioLogado");
    if (!storedUser) return alert("Sessão expirada.");
    
    const user = JSON.parse(storedUser);
    const payload = {
      profissionalId,
      servicoId,
      estudanteId: user?.id, 
      dataHorarioInicio: `${data}T${horario}:00`,
      observacaoAluno: ""
    };

    try {
      await criarAgendamento(payload);
      alert("Agendamento realizado com sucesso!");
      window.location.reload();
    } catch (err) {
      alert("Erro ao realizar agendamento.");
    }
  };

  return (
    <div className="content">
      <div className="card-form">
        <h2>Agendar Consulta</h2>
        <form onSubmit={handleSubmit}>
          <label>1. Escolha o Serviço</label>
          <select value={servicoId} onChange={e => { setServicoId(e.target.value); setProfissionalId(""); setDiasAtendimento([]); }}>
            <option value="">Selecione...</option>
            {servicos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>

          {servicoId && (
            <div className="section">
              <label>2. Especialistas Disponíveis</label>
              <div className="row">
                {profissionais .filter(p => p.cargo?.toLowerCase() === servicos.find(s => s.id === servicoId)?.nome.toLowerCase()).map(p => (
                    <button type="button" key={p.id}className={profissionalId === p.id ? "btn-editar active" : "btn-editar"}onClick={() => selecionarProfissional(p.id)}>
                      {p.nome}
                    </button>
                  ))}
              </div>
              
              {diasAtendimento.length > 0 && (
                <div style={{ 
                  marginTop: '15px', 
                  padding: '12px', 
                  backgroundColor: 'rgba(77, 163, 255, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(77, 163, 255, 0.4)'
                }}>
                  <p style={{ fontSize: '13px', color: '#4da3ff', margin: 0, textAlign: 'center', fontWeight: '500' }}>
                    📅 Atendimento: {diasAtendimento.join(", ")}
                  </p>
                </div>
              )}
            </div>
          )}

          {profissionalId && (
            <div className="section">
              <label>3. Escolha a Data</label>
              <input type="date" value={data} min={new Date().toISOString().split("T")[0]} onChange={e => { setData(e.target.value); setHorario(""); }} required />
            </div>
          )}

          {data && (
            <div className="section">
              <label>4. Horários Disponíveis</label>
              <div className="time-grid">
                {horariosDisponiveis.length > 0 ? (
                  horariosDisponiveis.map((h, i) => {
                    const t = Array.isArray(h) 
                      ? `${String(h[0]).padStart(2, '0')}:${String(h[1]).padStart(2, '0')}` 
                      : h.substring(0,5);
                    return (
                      <div 
                        key={i} 
                        className={horario === t ? "time-slot selected" : "time-slot"} 
                        onClick={() => setHorario(t)}
                      >
                        {t}
                      </div>
                    );
                  })
                ) : (
                  <p className="no-slots" style={{ gridColumn: '1/-1' }}>
                    Sem horários disponíveis para esta data.
                  </p>
                )}
              </div>
            </div>
          )}

          <button type="submit" className="btn-confirmar" disabled={!horario}>
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}