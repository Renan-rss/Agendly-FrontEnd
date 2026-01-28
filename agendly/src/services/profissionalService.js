import { api } from "./api";

export function listarProfissionais() {
  return api.get("/api/profissionais"); 
}

export function cadastrarProfissional(data) {
  return api.post("/api/profissionais/registrar", data);
}

export function deletarProfissional(id) {
  return api.delete(`/api/profissionais/${id}`);
}

