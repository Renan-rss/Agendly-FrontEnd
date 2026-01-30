import { api } from "./api";

export function listarHorariosDisponiveis(profissionalId, data) {
  return api.get("/disponibilidades/horarios", {
    params: { 
        profissionalId: profissionalId, 
        data: data 
    }
  });
}

export function salvarDisponibilidades(payload) {
  return api.post("/disponibilidades", payload);
}

export function buscarDiasTrabalho(profissionalId) {
  return api.get(`/disponibilidades/dias/${profissionalId}`);
}