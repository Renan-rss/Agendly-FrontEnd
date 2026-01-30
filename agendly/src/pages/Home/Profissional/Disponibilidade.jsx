import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvarDisponibilidades } from "../../../services/disponibilidadeService";

export default function Disponibilidade() {
  const navigate = useNavigate();

  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFim, setHoraFim] = useState("18:00");

  const diasOpcoes = [
    { label: "Seg", value: "MONDAY" },
    { label: "Ter", value: "TUESDAY" },
    { label: "Qua", value: "WEDNESDAY" },
    { label: "Qui", value: "THURSDAY" },
    { label: "Sex", value: "FRIDAY" },
  ];

  const handleCheckboxChange = (value) => {
    setDiasSelecionados((prev) =>
      prev.includes(value)
        ? prev.filter((d) => d !== value)
        : [...prev, value]
    );
  };

 function handleSalvar() {
  const payload = {
    disponibilidades: diasSelecionados.map((dia) => ({
      diaSemana: dia,
      horaInicio,
      horaFim,
    })),
  };

  console.log("Payload enviado:", payload);

  salvarDisponibilidades(payload)
    .then(() => {
      alert("Disponibilidade salva com sucesso!");
      navigate("/profissional");
    })
    .catch((err) => {
      console.error("Erro ao salvar disponibilidade:", err);
      alert("Erro ao salvar disponibilidade");
    });
}


  return (
    <div className="content">
      <header className="header compact">
        <h1>Disponibilidade</h1>
      </header>

      <div className="panel panel-form compact-panel">
        <div className="disponibilidade-container">
          <h3>Dias da Semana</h3>

          <div className="dias-grid">
            {diasOpcoes.map((opcao) => (
              <label key={opcao.value} className={`dia-item ${   diasSelecionados.includes(opcao.value) ? "selected" : ""}`}>
                <input type="checkbox" checked={diasSelecionados.includes(opcao.value)} onChange={() => handleCheckboxChange(opcao.value)}/>
                {opcao.label}
              </label>
            ))}
          </div>

          <div className="form-row">
            <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)}/>
            <input type="time"value={horaFim}onChange={(e) => setHoraFim(e.target.value)}/>
          </div>

          <button className="btn-submit" onClick={handleSalvar}>
            Salvar Disponibilidade
          </button>
        </div>
      </div>
    </div>
  );
}
