import api from "./api";

export async function listarEstudantes() {
  const response = await api.get("/estudantes");
  return response.data;
}

export async function deletarEstudante(id) {
  await api.delete(`/estudantes/deletar/${id}`);
}

export function getPerfilEstudante() {
  return api.get("/estudantes/perfil");
}