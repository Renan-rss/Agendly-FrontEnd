
export function salvarUsuario(usuario) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

export function salvarProfissional(profissional) {
  const profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
  profissionais.push(profissional);
  localStorage.setItem("profissionais", JSON.stringify(profissionais));
}