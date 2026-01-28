import { api } from "./api";

export function listarProfissionais() {
  return api.get("/profissionais"); 
}

export function getPerfilProfissional() {
  return api.get("/profissionais/perfil");
}
export function cadastrarProfissional(data) {
  return api.post("/profissionais/registrar", data); 
}

export function deletarProfissional(id) {
  return api.delete(`/profissionais/${id}`); 
}
