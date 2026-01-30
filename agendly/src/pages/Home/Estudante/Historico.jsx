/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback, useMemo } from "react";
import { FaCalendarAlt, FaClock, FaTrashAlt, FaHistory, FaStethoscope } from "react-icons/fa";
import { listarAgendamentos, cancelarAgendamento } from "../../../services/agendamentoService";

export default function Historico() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filtroData, setFiltroData] = useState(""); 
  const [filtroMes, setFiltroMes] = useState(""); 

  const carregarAgendamentos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await listarAgendamentos();
      console.log("Dados recebidos da API:", res.data); 
      setAgendamentos(res.data || []);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  const agendamentosFiltrados = useMemo(() => {
    return agendamentos.filter(a => {
      const dataRef = a.dataHorarioInicio;
      if (!dataRef) return false;

      const dataApenas = dataRef.split('T')[0];
      const mesBanco = dataApenas.split('-')[1]; 

      const bateData = filtroData ? dataApenas === filtroData : true;
      const bateMes = filtroMes ? mesBanco === filtroMes : true;

      return bateData && bateMes;
    });
  }, [agendamentos, filtroData, filtroMes]);

  async function handleCancelar(id) {
    if (!window.confirm("Deseja cancelar este agendamento?")) return;
    try {
      await cancelarAgendamento(id);
      carregarAgendamentos();
    } catch (err) {
      alert("Não foi possível cancelar. Verifique se o atendimento já foi realizado.");
    }
  }

  return (
    <div className="section-historico">
      <header className="header">
        <h1><FaHistory style={{marginRight: '12px'}} /> Meu Histórico</h1>
      </header>

      <div className="filter-container">
        <div className="filter-group">
          <label>POR DIA</label>
          <input type="date" value={filtroData} onChange={(e) => setFiltroData(e.target.value)}className="date-picker"/>
        </div>

        <div className="filter-group">
          <label>POR MÊS</label>
          <select value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}className="date-picker">
            <option value="">Todos</option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
          </select>
        </div>

        <div className="filter-group" style={{ flex: '0' }}>
          <button 
            className="btn-limpar-filtros"
            onClick={() => {setFiltroData(""); setFiltroMes("");}}
          >
            LIMPAR
          </button>
        </div>
      </div>

      <div className="panel-lista">
        {loading ? (
          <p className="placeholder">Buscando seus atendimentos...</p>
        ) : agendamentosFiltrados.length === 0 ? (
          <div className="placeholder">
             <p>Nenhum agendamento encontrado.</p>
             <small>Tente mudar o filtro de mês para "Todos".</small>
          </div>
        ) : (
          <div className="historico-grid" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}> 
            {agendamentosFiltrados.map(a => (
              <div className={`profissional-card ${a.status?.toLowerCase()}`} key={a.id}>
                <div className="profissional-info">
                  <div className="profissional-avatar"><FaStethoscope /></div>
                  <div>
                    <h3>{a.nomeProfissional}</h3>
                    <p><strong>Serviço:</strong> {a.nomeServico}</p>
                    <p>
                      <FaCalendarAlt /> {new Date(a.dataHorarioInicio).toLocaleDateString()} 
                      <FaClock style={{marginLeft: '10px'}} /> {new Date(a.dataHorarioInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className={`dia-tag ${a.status?.toLowerCase()}`}>
                    {a.status?.replace('_', ' ')}
                  </span>
                  {(a.status.includes("AGENDADO")) && (
                    <button className="btn-delete-historico" onClick={() => handleCancelar(a.id)}>
                      <FaTrashAlt />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}