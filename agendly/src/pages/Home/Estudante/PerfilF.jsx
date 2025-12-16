import { useState } from "react";
import EditarPerfil from "../../EditarPerfil/EditarPerfilUsuario";

export default function Perfil() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="section-perfil">
      <h1>Meu Perfil</h1>

      <div className="perfil-card">
        <label>Email</label>
        <input type="email" disabled placeholder="Email" />

        <label>Senha</label>
        <input type="password" disabled placeholder="********" />

        <label>Telefone</label>
        <input type="text" disabled placeholder="(00) 00000-0000" />

        <button className="btn-editar" onClick={() => setShowModal(true)}>
          Editar Perfil
        </button>
      </div>

      {showModal && (
        <EditarPerfil onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
