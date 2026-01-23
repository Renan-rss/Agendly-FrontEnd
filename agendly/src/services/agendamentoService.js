import { api } from "./api";


export function criarAgendamento(dados) {
  return api.post("/agendamentos", dados);
}

export function listarAgendamentos() {
  return api.get("/agendamentos");
}

export function cancelarAgendamento(id) {
  return api.put(`/agendamentos/cancelar/${id}`);
}


export function listarAtendimentos() {
  return api.get("/agendamentos/profissional");
}

export function finalizarAtendimento(id) {
  return api.put(`/agendamentos/finalizar/${id}`);
}

export function buscarEstatisticasConcluidas() {
  return api.get("/agendamentos/estatisticas/concluidos");
}