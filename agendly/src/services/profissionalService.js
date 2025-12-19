import { api } from "./api";

export function cadastrarProfissional(data) {
  return api.post("/profissionais/registrar", data);
}

export function listarProfissionais() {
  return api.get("/profissionais");
}

export function deletarProfissional(id) {
  return api.delete(`/profissionais/${id}`);
}
