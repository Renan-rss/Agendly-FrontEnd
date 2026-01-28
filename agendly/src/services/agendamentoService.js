import { api } from "./api";


export function criarAgendamento(dados) {
  return api.post("/api/agendamentos", dados);
}

export function listarAgendamentos() {
  return api.get("/api/agendamentos");
}

export function cancelarAgendamento(id) {
  return api.put(`/api/agendamentos/cancelar/${id}`);
}


export function listarAtendimentos() {
  return api.get("/api/agendamentos/profissional");
}

export function finalizarAtendimento(id) {
  return api.put(`/api/agendamentos/finalizar/${id}`);
}

export function buscarEstatisticasConcluidas() {
  return api.get("/api/agendamentos/estatisticas/concluidos");
}