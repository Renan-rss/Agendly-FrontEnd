import { api } from "./api";

/* ESTUDANTE */

// Criar agendamento
export function criarAgendamento(dados) {
  return api.post("/agendamentos", dados);
}

// Histórico do estudante
export function listarAgendamentos() {
  return api.get("/agendamentos");
}

// Cancelar agendamento (aluno)
export function cancelarAgendamento(id) {
  return api.put(`/agendamentos/cancelar/${id}`);
}

/*  PROFISSIONAL */

// Atendimentos do profissional
export function listarAtendimentos() {
  return api.get("/agendamentos/profissional");
}

// Finalizar atendimento
export function finalizarAtendimento(id) {
  return api.put(`/agendamentos/finalizar/${id}`);
}

export function buscarEstatisticasConcluidas() {
  return api.get("/agendamentos/estatisticas/concluidos");
}