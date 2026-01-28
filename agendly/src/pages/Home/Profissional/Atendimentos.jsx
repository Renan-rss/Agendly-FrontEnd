import { useEffect, useState } from "react";
import {
  listarAtendimentos,
  finalizarAtendimento
} from "../../../services/agendamentoService";

export default function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  function carregarAtendimentos() {
    listarAtendimentos()
      .then(res => {
        setAtendimentos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    carregarAtendimentos();
  }, []);

  async function handleFinalizar(id) {
    const confirmacao = window.confirm(
      "Deseja finalizar este atendimento?"
    );

    if (!confirmacao) return;

    try {
      await finalizarAtendimento(id);
      alert("Atendimento finalizado com sucesso");
      carregarAtendimentos();
    } catch (err) {
      console.error(err);
      alert("Erro ao finalizar atendimento");
    }
  }

  return (
    <>
      <header className="header">
        <h1>Atendimentos</h1>
      </header>

      {loading && <p>Carregando atendimentos...</p>}

      {!loading && atendimentos.length === 0 && (
        <p>Nenhum atendimento encontrado.</p>
      )}

      {!loading && atendimentos.length > 0 && (
        <div className="panel">
          {atendimentos.map(a => (
            <div key={a.id} className="card">
              <p><strong>Aluno:</strong> {a.estudante?.nome}</p>
              <p><strong>Data:</strong> {new Date(a.dataHorarioInicio).toLocaleDateString()}</p>
              <p><strong>Horário:</strong> {new Date(a.dataHorarioInicio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p><strong>Status:</strong> {a.status}</p>

              {a.status === "AGENDADO" && (
                <button onClick={() => handleFinalizar(a.id)}>
                  Finalizar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
