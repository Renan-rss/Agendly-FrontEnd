import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Login.css";

// IMPORTAR OS ÍCONES
import eyeShow from "../../assets/eye-open.png";
import eyeHide from "../../assets/eye-close.png";

export default function Login() {

 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 // NOVO ESTADO: Controla a visibilidade da senha
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
    <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            className="input-login-padrao" /* Adicione uma classe para estilizarmos */
        />

    <label>Senha</label>
        {/* ENVOLVENDO O CAMPO DE SENHA */}
        <div className="cadastro-campo-senha"> 
       <input 
                // Troca o tipo com base no estado
                type={showSenha ? "text" : "password"} 
                value={senha} 
                onChange={e => setSenha(e.target.value)} 
                required 
            />
       <button 
                type="button" 
                className="cadastro-btn-icone" 
                onClick={() => setShowSenha(!showSenha)} 
            >
                {/* Ícone que troca com base no estado */}
         <img 
                    src={showSenha ? eyeHide : eyeShow} 
                    className="cadastro-icone-olho" 
                    alt="mostrar/ocultar senha" 
                />
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