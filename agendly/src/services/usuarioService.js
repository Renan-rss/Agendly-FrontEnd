import { api } from "./api";

export function listarUsuarios() {
    return api.get("/usuario"); 
}

export function listarProfissionais() {
    return api.get("/profissionais"); 
}

export function listarEstudantes() {
    return api.get("/usuario"); 
}

export function listarServicos() {
    return api.get("/servico"); 
}

export function criarEstudante(dados) {
    return api.post("/estudantes/registrar", dados);
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

export const deletarUsuario = (id) => {
    return api.delete(`/usuario/deletar/${id}`);
};

export const deletarEstudante = (id) => {
    return api.delete(`/usuario/deletar/${id}`);
};