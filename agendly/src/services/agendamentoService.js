import { api } from "./api";

export function listarServicos() {
    return api.get("/servico"); 
}

export function listarProfissionais() {
    return api.get("/profissionais");
}

export function listarEstudantes() {
    return api.get("/usuario"); 
}

export function listarUsuarios() {
    return api.get("/usuario"); 
}

export function criarEstudante(dados) {
    return api.post("/estudantes/registrar", dados);
}

export function criarUsuario(dados) {
    return api.post("/usuario/registrar", dados);
}

export function buscarUsuarioPorId(id) {
    return api.get(`/usuario/${id}`);
}

export function atualizarUsuario(id, dados) {
    return api.put(`/usuario/${id}`, dados);
}

export const deletarUsuario = (id) => {
    return api.delete(`/usuario/deletar/${id}`);
};

export function buscarEstatisticasConcluidas() {
  return api.get("/agendamentos/estatisticas/concluidos");
}

export function listarAgendamentos() {
  return api.get("/agendamentos/meu-historico");
}

export function criarAgendamento(payload) {
  return api.post("/agendamentos", payload);
export function criarAgendamento(dados) {
  return api.post("/agendamentos", dados);
}

export function listarAgendamentos() {
  return api.get("/agendamentos");
}

export function cancelarAgendamento(id) {
  return api.put(`/agendamentos/cancelar/${id}`);
}

export function finalizarAtendimento(id) {
  return api.put(`/agendamentos/finalizar/${id}`);
}

export function listarAtendimentos() {
  return api.get("/agendamentos/meu-historico"); 
}

export function atualizarStatus(id, status) {
  return api.patch(`/agendamentos/${id}/status`, { status });
}

export function salvarRegistroAtendimento(dados) {
  return api.post("/registros-atendimento", dados);
}

export function listarTodosAgendamentos() {
    return api.get("/agendamentos"); 
  return api.get("/agendamentos/profissional");
}

export function finalizarAtendimento(id) {
  return api.put(`/agendamentos/finalizar/${id}`);
}

export function buscarEstatisticasConcluidas() {
  return api.get("/agendamentos/estatisticas/concluidos");
}