import api from "./api";

export async function listarEstudantes() {
  const response = await api.get("/api/estudantes");
  return response.data;
}

export async function deletarEstudante(id) {
  await api.delete(`/api/estudantes/deletar/${id}`);
}
