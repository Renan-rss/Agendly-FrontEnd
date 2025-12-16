export default function Perfil() {
  return (
    <>
      <header className="header">
        <h1>Meu Perfil</h1>
      </header>

      <div className="perfil-card">

        <label>Email</label>
        <input type="email" disabled placeholder="email@exemplo.com" />

        <label>Especialidade</label>
        <input type="text" disabled placeholder="Psicologia" />

        <label>Telefone</label>
        <input type="text" disabled placeholder="(00) 00000-0000" />

        <button className="btn-editar">Editar Perfil</button>

      </div>
    </>
  );
}
