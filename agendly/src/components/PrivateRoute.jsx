import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuarioLogado) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(usuarioLogado.tipoUser)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
