import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  let role = localStorage.getItem("role");

  if (role) {
    try {
      role = JSON.parse(role);
    } catch (e) {
     
    }
  }

  console.group("Verificação PrivateRoute");
  console.log("Token encontrado?", !!token);
  console.log("Role no Storage:", role);
  console.log("Roles permitidas:", allowedRoles);
  console.groupEnd();

  if (!token) {
    console.warn("Bloqueado: Sem token");
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.warn(`Bloqueado: Role '${role}' não está na lista permitida`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}