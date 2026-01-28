import { useEffect, useState } from "react";
import { buscarUsuarioPorId } from "../../../services/usuarioService";
import EditarPerfil from "../../EditarPerfil/EditarPerfilUsuario";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado?.id) {
      buscarUsuarioPorId(usuarioLogado.id)
        .then(res => setUsuario(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  if (!usuario) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div className="section-perfil">
      <h1>Meu Perfil</h1>

      <div className="perfil-card">
        <label>Nome</label>
        <input type="text" disabled value={usuario.nome} />

        <label>Email</label>
        <input type="email" disabled value={usuario.email} />

        <label>Telefone</label>
        <input type="text" disabled value={usuario.telefone || ""} />

        <button className="btn-editar" onClick={() => setShowModal(true)}>
          Editar Perfil
        </button>
      </div>

      {showModal && (
        <EditarPerfil
          usuario={usuario}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
