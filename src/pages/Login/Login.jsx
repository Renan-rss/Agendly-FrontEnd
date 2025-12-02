import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Login.css";


import eyeShow from "../../assets/eye-open.png";
import eyeHide from "../../assets/eye-close.png";

export default function Login() {

 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");


 const [showSenha, setShowSenha] = useState(false);

 useEffect(() => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const adminExistente = usuarios.find(u => u.tipo === "admin");
  if (!adminExistente) {
   usuarios.push({
    id: Date.now(),
    nome: "Admin Fixo",
    email: "admin@teste.com",
    senha: "admin123",
    tipo: "admin"
   });
   localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
 }, []);

// ele pega os dados do formulario inseridos pelo usuario e armazena localmente no navegador
 function handleLogin(e) {
  e.preventDefault();
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioValido = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuarioValido) {
   alert("Email ou senha incorretos!");
   return;
  }

  localStorage.setItem("logadoId", usuarioValido.id);
  localStorage.setItem("logadoTipo", usuarioValido.tipo);

  if (usuarioValido.tipo === "admin") navigate("/admin");
  else if (usuarioValido.tipo === "profissional") navigate("/profissional");
  else navigate("/home");
 }

 return (
  
  <div className="login-container">
   <form onSubmit={handleLogin}>

    <h1>LOGIN</h1>

    <label>Email</label>
    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-login-padrao" />

    <label>Senha</label>
      
        <div className="cadastro-campo-senha"> 

       <input type={showSenha ? "text" : "password"} value={senha} onChange={e => setSenha(e.target.value)} required />

       <button type="button" className="cadastro-btn-icone" onClick={() => setShowSenha(!showSenha)} >
         <img src={showSenha ? eyeHide : eyeShow} className="cadastro-icone-olho" alt="mostrar/ocultar senha" />
       </button>

        </div>

    <button type="submit">Entrar</button>
    
    <button type="button" className="btn-cadastrar" onClick={() => navigate("/cadastro")} >
     Cadastrar
    </button>
   </form>
  </div>
 );
}