import { useEffect, useState } from "react";
import {
  listarProfissionais,
  listarServicos
} from "../../../services/usuarioService";
import { criarAgendamento } from "../../../services/agendamentoService";
import { listarHorariosDisponiveis } from "../../../services/disponibilidadeService";

export default function Agendar() {
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [profissionalId, setProfissionalId] = useState("");
  const [servicoId, setServicoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  // 🔹 Carregar profissionais e serviços
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

  const nomeServico = servico.nome?.toLowerCase() || "";
  const cargoProf = p.cargo?.toLowerCase() || "";

  if (nomeServico.includes("psico"))
    return cargoProf.includes("psico") || cargoProf.includes("social");

  if (nomeServico.includes("pedag"))
    return cargoProf.includes("pedag");

  return true;
});


  // 🔹 Buscar horários disponíveis quando profissional + data mudarem
  useEffect(() => {
    if (!profissionalId || !data) {
      setHorariosDisponiveis([]);
      setHorario("");
      return;
    }

    listarHorariosDisponiveis(profissionalId, data)
      .then(res => {
        setHorariosDisponiveis(res.data);
        setHorario("");
      })
      .catch(err => {
        console.error("Erro ao buscar horários", err);
        setHorariosDisponiveis([]);
      });
  }, [profissionalId, data]);

  // 🔹 Enviar agendamento
  async function handleSubmit(e) {
    e.preventDefault();

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
      alert("Sessão expirada. Faça login novamente.");
      return;
    }

    if (!profissionalId || !servicoId || !data || !horario) {
      alert("Preencha todos os campos.");
      return;
    }

    const payload = {
      profissionalId,
      servicoId,
      estudanteId: usuarioLogado.estudanteId || usuarioLogado.id,
      dataHorarioInicio: `${data}T${horario}:00`,
      observacaoAluno: ""
    };

    console.log("Payload enviado:", payload);

    try {
      await criarAgendamento(payload);
      alert("Agendamento realizado com sucesso!");
      setData("");
      setHorario("");
      setProfissionalId("");
      setServicoId("");
      setHorariosDisponiveis([]);
    } catch (err) {
      console.error("Erro do servidor:", err.response?.data);
      alert(
        err.response?.data?.message ||
          "Erro ao realizar agendamento."
      );
    }
  }

  return (
    <div className="content-agendar">
      <header className="header">
        <h1>Novo Agendamento</h1>
      </header>

      <div className="card-form">
        <form onSubmit={handleSubmit}>
          {/* SERVIÇO */}
          <label>Tipo de Atendimento</label>
          <select
            value={servicoId}
            onChange={e => {
              setServicoId(e.target.value);
              setProfissionalId("");
              setData("");
              setHorario("");
              setHorariosDisponiveis([]);
            }}
            required
          >
            <option value="">Selecione o Serviço</option>
            {servicos.map(s => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </select>

          {/* PROFISSIONAL */}
          <label>Profissional Especialista</label>
          <select
            value={profissionalId}
            onChange={e => {
              setProfissionalId(e.target.value);
              setData("");
              setHorario("");
            }}
            required
            disabled={!servicoId}
          >
            <option value="">
              {servicoId
                ? "Selecione o Profissional"
                : "Escolha um serviço primeiro"}
            </option>

            {profissionaisFiltrados.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome} ({p.cargo})
              </option>
            ))}
          </select>

          {/* DATA */}
          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            required
            disabled={!profissionalId}
            min={new Date().toISOString().split("T")[0]}
          />

          {/* HORÁRIO */}
          <label>Horário</label>
          <select
            value={horario}
            onChange={e => setHorario(e.target.value)}
            required
            disabled={horariosDisponiveis.length === 0}
          >
            <option value="">
              {horariosDisponiveis.length
                ? "Selecione um horário"
                : "Nenhum horário disponível"}
            </option>

            {horariosDisponiveis.map(h => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <button type="submit" className="btn-agendar">
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}
