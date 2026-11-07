import { Navigate, Outlet } from "react-router-dom";
import type { Rol } from "../../types/usuario";
import { useAuthStore } from "../../store/useAuthStore";

interface Props {
  roles?: Rol[];
}

export function RutaProtegida({ roles }: Props) {
  const token = useAuthStore((state) => state.token);
  const usuario = useAuthStore((state) => state.usuario);

  if (!token) return <Navigate to="/login" replace />;
  if (roles && (!usuario || !roles.includes(usuario.rol))) {
    return <Navigate to="/inicio" replace />;
  }

  return <Outlet />;
}
