import { useEffect, useState, useCallback } from "react";
import { listarAtendimentos } from "../../../services/agendamentoService";

export default function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detalheId, setDetalheId] = useState(null);

  const carregar = useCallback(async () => {
    try {
      const res = await listarAtendimentos();
      setAtendimentos(res.data || []);
    } catch (err) {
      console.error("Erro ao carregar atendimentos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const toggleDetalhes = (id) => {
    setDetalheId(detalheId === id ? null : id);
  };

  return (
    <>
      <header className="header">
        <h1>Meus Atendimentos</h1>
        <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Histórico e registros sigilosos</p>
      </header>

      <div className="panel">
        {loading ? (
          <div className="card"><p>Carregando...</p></div>
        ) : atendimentos.length === 0 ? (
          <div className="card"><p>Nenhum registro encontrado.</p></div>
        ) : (
          atendimentos.map(a => (
            <div key={a.id} className="profissional-card" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="profissional-info">
                  <span className="profissional-avatar">👤</span>
                  <div>
                
                    <h3>{a.estudanteNome || a.estudante?.nome || "Estudante"}</h3>
                    <p>
                      {new Date(a.dataHorarioInicio || a.data_horario_inicio).toLocaleDateString()} às {new Date(a.dataHorarioInicio || a.data_horario_inicio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button onClick={() => toggleDetalhes(a.id)}className="btn-detalhes"style={{   background: detalheId === a.id ? '#4da3ff' : '#333',   color: '#fff',   border: 'none',   padding: '6px 12px',   borderRadius: '4px',   cursor: 'pointer',  fontSize: '12px',  transition: '0.3s'}}>
                    {detalheId === a.id ? "Ocultar" : "Ver Detalhes"}
                  </button>
                  <span className="dia-tag" style={{ background: 'rgba(77, 163, 255, 0.1)', color: '#4da3ff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>
                    {a.status}
                  </span>
                </div>
              </div>

              {detalheId === a.id && (
                <div style={{ marginTop: '10px', padding: '15px', background: '#1a1d20', borderRadius: '6px', borderLeft: '4px solid #4da3ff',animation: 'fadeIn 0.3s ease'}}>
                  <h4 style={{ fontSize: '11px', color: '#4da3ff', marginBottom: '10px', textTransform: 'uppercase' }}>
                    Anotações Sigilosas do Profissional
                  </h4>
                  <p style={{ fontSize: '14px', color: '#ddd', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {a.anotacoesSigilosas || "Não há anotações registradas para este atendimento."}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}