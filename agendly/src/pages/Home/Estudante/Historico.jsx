import { useEffect, useState } from "react";
import {
  listarAgendamentos,
  cancelarAgendamento
} from "../../../services/agendamentoService";

export default function Historico() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  function carregarAgendamentos() {
    listarAgendamentos()
      .then(res => {
        setAgendamentos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  async function handleCancelar(id) {
    const confirmacao = window.confirm(
      "Deseja cancelar este agendamento?"
    );

    if (!confirmacao) return;

    try {
      await cancelarAgendamento(id);
      alert("Agendamento cancelado com sucesso");
      carregarAgendamentos();
    } catch (err) {
      console.error(err);
      alert("Erro ao cancelar agendamento");
    }
  }

  return (
    <div className="section-historico">
      <h1>Histórico de Agendamentos</h1>

      {loading && <p>Carregando agendamentos...</p>}

      {!loading && agendamentos.length === 0 && (
        <div className="placeholder">
          Nenhum agendamento encontrado.
        </div>
      )}

      {!loading && agendamentos.length > 0 && (
        <div className="historico-list">
          {agendamentos.map(a => (
            <div className="card" key={a.id}>
              <p><strong>Profissional:</strong> {a.profissional?.nome}</p>
              <p><strong>Data:</strong> {new Date(a.dataHorarioInicio).toLocaleDateString()}</p>
              <p><strong>Horário:</strong> {new Date(a.dataHorarioInicio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p><strong>Status:</strong> {a.status}</p>

              {a.status === "AGENDADO" && (
                <button onClick={() => handleCancelar(a.id)}>
                  Cancelar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
