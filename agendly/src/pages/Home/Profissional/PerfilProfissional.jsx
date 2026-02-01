import { useState, useEffect } from "react";
import { getPerfilProfissional } from "../../../services/profissionalService.js";
import { buscarDiasTrabalho } from "../../../services/disponibilidadeService.js";

export default function PerfilProfissional() {
  const [usuario, setUsuario] = useState({ id: "", nome: "", email: "", cargo: "", telefone: "" });
  const [diasAtendimento, setDiasAtendimento] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchDados() {
      try {
        const responsePerfil = await getPerfilProfissional();
        const profData = responsePerfil.data;
        
        const storedUser = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
        const idReal = profData.id || storedUser.id;

        setUsuario({
          id: idReal || "", 
          nome: profData.nome || "Não informado",
          email: profData.email || "Não informado",
          cargo: profData.cargo || "Especialista",
          telefone: profData.telefone || "Não informado"
        });

        if (idReal) {
          const responseDias = await buscarDiasTrabalho(idReal);
          const ordemSemana = { "MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3, "THURSDAY": 4, "FRIDAY": 5, "SATURDAY": 6, "SUNDAY": 7 };
          const traducao = { MONDAY: "Seg", TUESDAY: "Ter", WEDNESDAY: "Qua", THURSDAY: "Qui", FRIDAY: "Sex", SATURDAY: "Sáb", SUNDAY: "Dom" };

          let listaFinal = [];
          if (Array.isArray(responseDias.data)) {
            listaFinal = responseDias.data.map(item => typeof item === 'string' ? item : item.diaSemana);
          } else if (responseDias.data?.disponibilidades) {
            listaFinal = responseDias.data.disponibilidades.map(item => item.diaSemana);
          }

          if (listaFinal.length > 0) {
            const ordenados = listaFinal
              .filter(dia => dia)
              .sort((a, b) => (ordemSemana[a] || 99) - (ordemSemana[b] || 99))
              .map(dia => traducao[dia] || dia);
            setDiasAtendimento([...new Set(ordenados)]);
          }
        } else {
          console.error("ERRO: ID não encontrado nem na API nem no localStorage.");
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setCarregando(false);
      }
    }
    fetchDados();
  }, []);

  if (carregando) return <div className="content">Carregando...</div>;

  return (
    <div className="content">
      <div className="perfil-card">
        <h2>Meu Perfil Profissional</h2>
        <label>Nome Completo</label>
        <input type="text" disabled value={usuario.nome} />
        <label>E-mail</label>
        <input type="text" disabled value={usuario.email} />
        <div className="row" style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>Especialidade</label>
            <input type="text" disabled value={usuario.cargo} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Telefone</label>
            <input type="text" disabled value={usuario.telefone} />
          </div>
        </div>

        <div className="disponibilidade-box" style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <p style={{ color: '#4da3ff', fontWeight: 'bold', fontSize: '13px', textAlign: 'center' }}>MINHA DISPONIBILIDADE SEMANAL</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
            {diasAtendimento.length > 0 ? (
              diasAtendimento.map((dia, i) => (
                <span key={i} className="dia-tag" style={{ background: '#4da3ff', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '12px' }}>{dia}</span>
              ))
            ) : (
              <p style={{ color: '#ff6b6b', fontSize: '12px' }}>Nenhuma disponibilidade encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}