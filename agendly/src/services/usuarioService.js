import { api } from "./api";

export function listarEstudantes() {
  return api.get("/estudantes");
}

export function listarProfissionais() {
  return api.get("/profissionais");
}


export function criarUsuario(dados) {
  return api.post("/usuario/registrar", dados);
}

export function buscarUsuarioPorId(id) {
  return api.get(`/usuario/${id}`);
}

export function atualizarUsuario(id, dados) {
  return api.put(`/usuario/${id}`, dados);
}

export const deletarEstudante = (id) => {
  return api.delete(`/deletar/${id}`);
};

export const listarServicos = () => {
  return api.get("/servico"); 
};