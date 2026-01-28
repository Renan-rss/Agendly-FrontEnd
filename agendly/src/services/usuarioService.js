import { api } from "./api";

export function listarUsuarios() {
    return api.get("/api/usuario"); 
}

export function listarEstudantes() {
    return api.get("/api/usuario"); 
}

export function listarProfissionais() {
    return api.get("/api/usuario");
}

export function listarServicos() {
    return api.get("/api/servico"); 
}

export function criarUsuario(dados) {
    return api.post("/api/usuario/registrar", dados);
}

export function criarEstudante(dados) {
    return api.post("/api/estudantes/registrar", dados);
}

export function buscarUsuarioPorId(id) {
    return api.get(`/api/usuario/${id}`);
}

export function atualizarUsuario(id, dados) {
    return api.put(`/api/usuario/${id}`, dados);
}

export const deletarUsuario = (id) => {
    return api.delete(`/api/usuario/deletar/${id}`);
};

export const deletarEstudante = (id) => {
    return api.delete(`/api/usuario/deletar/${id}`);
};