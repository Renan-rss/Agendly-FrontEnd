import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  // Se não estiver logado, redireciona para login
  if (!usuarioLogado) {
    return <Navigate to="/" replace />;
  }

  // Se houver restrição de roles e o usuário não estiver autorizado
  if (allowedRoles && !allowedRoles.includes(usuarioLogado.tipoUser)) {
    return <Navigate to="/" replace />;
  }

  // Usuário autorizado
  return <Outlet />;
}
