
import { useState } from "react";

export default function Agendamento() {

  const [form, setForm] = useState({ 
    profissional: "", 
    data: "", 
    horario: "" 
  });

  const profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  function handleSubmit(e) { e.preventDefault(); const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    agendamentos.push({ ...form, aluno: localStorage.getItem("email") });
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    alert("Agendamento realizado!");

    setForm({ 
      profissional: "", 
      data: "", 
      horario: "" 
    });
    
  }

  return (

    <form className="form-cadastro" onSubmit={handleSubmit}>

      <h2>Agendamento</h2>
      <select name="profissional" value={form.profissional} onChange={handleChange} required>
        <option value="">Selecione profissional</option>
        {profissionais.map((p, i) => <option key={i} value={p.nome}>{p.nome} - {p.area}</option>)}
      </select>

      <input type="date" name="data" value={form.data} onChange={handleChange} required />
      <input type="time" name="horario" value={form.horario} onChange={handleChange} required />

      <button type="submit">Agendar</button>
      
    </form>
  );
}
