import api from "./api";

export function salvarDisponibilidades(payload) {
  return api.post("/disponibilidades/disponibilidades", payload);
}
