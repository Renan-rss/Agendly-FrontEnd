import api from "./api";

export async function login(dados) {
  const res = await api.post("/auth/login", dados);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);

  console.log("AUTH SERVICE → token salvo:", localStorage.getItem("token"));
  console.log("AUTH SERVICE → role salva:", localStorage.getItem("role"));

  return res.data;
}

export function logout() {
  localStorage.clear();
}
