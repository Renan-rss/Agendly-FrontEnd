export default function Agendar() {
  return (
    <>
      <header className="header">
        <h1>Agendar Atendimento</h1>
      </header>

      <div className="card-form">
        <form>
          <label>Profissional</label>
          <select>
            <option>Selecione</option>
          </select>

          <label>Data</label>
          <input type="date" />

          <label>Horário</label>
          <input type="time" />

          <button>Agendar</button>
        </form>
      </div>
    </>
  );
}
