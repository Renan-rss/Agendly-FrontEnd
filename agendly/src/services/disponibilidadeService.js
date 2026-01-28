import api from "./api";

export function salvarDisponibilidades(payload) {
  return api.post("/disponibilidades/disponibilidades", payload);
}
export function listarHorariosDisponiveis(profissionalId, data) {
  return api.get("/disponibilidades/horarios", {
    params: {
      profissionalId,
      data
    }
  });
}
