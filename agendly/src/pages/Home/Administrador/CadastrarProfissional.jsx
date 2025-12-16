export default function CadastrarProfissional() {
  return (
    <>
      <header className="header">
        <h1>Cadastrar Profissional</h1>
      </header>

      <div className="panel panel-form">
        <form>
          <label>Nome</label>
          <input type="text" placeholder="Nome do profissional" />

          <label>Email</label>
          <input type="email" placeholder="Email" />

          <label>Senha</label>
          <input type="password" placeholder="Senha inicial" />

          <label>Confirmar Senha</label>
          <input type="password" placeholder="Confirmar senha" />

          <label>Setor</label>
          <select>
            <option>Selecione</option>
            <option>Psicologia</option>
            <option>Pedagogia</option>
          </select>

          <button>Cadastrar</button>
        </form>
      </div>
    </>
  );
}
