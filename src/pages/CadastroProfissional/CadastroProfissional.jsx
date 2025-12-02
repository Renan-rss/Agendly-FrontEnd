
import { useState } from "react";
import { salvarProfissional } from "../../utils/auth";
import "./CadastroProfissional.css";


export default function CadastroProfissional() {

  const [form, setForm] = useState({ 
    nome: "", 
    area: "", 
    email: "", 
    telefone: "" 
  });

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  function handleSubmit(e) { e.preventDefault(); salvarProfissional(form); alert("Profissional cadastrado!");

    setForm({ 
      nome: "", 
      area: "", 
      email: "", 
      telefone: "" 
    });

  }

  return (

    <form className="form-cadastro" onSubmit={handleSubmit}>

      <h2>Cadastro de Profissional</h2>
      <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
      <input type="text" name="area" value={form.area} onChange={handleChange} placeholder="Área" required />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" required />

      <button type="submit">Cadastrar Profissional</button>
      
    </form>
  );
}
