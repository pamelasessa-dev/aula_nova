import { LogOut, UserRound } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Logotipo } from "../ui/Logotipo";

export function BarraSuperior() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const usuario = useAuthStore((state) => state.usuario);
  const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

  // Los enlaces dependen de la sesión y del rol.
  const enlaces = token
    ? [
        { to: "/inicio", texto: "Inicio" },
        { to: "/cursos", texto: "Cursos" },
        ...(usuario?.rol === "ESTUDIANTE"
          ? [{ to: "/inscripciones", texto: "Mis inscripciones" }]
          : []),
      ]
    : [];

  const salir = () => {
    cerrarSesion();
    navigate("/login");
  };

  const claseEnlace = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-3 text-sm font-medium transition-colors hover:text-marca-300 sm:text-base ${
      isActive
        ? "text-white after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:rounded-full after:bg-marca-400"
        : "text-slate-200"
    }`;

  return (
    <header className="relative z-10 bg-marca-900 text-white shadow-lg shadow-slate-950/10">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-12">
        <Link to="/inicio" className="text-xl sm:text-2xl" aria-label="Aula Nova, inicio">
          <Logotipo tamano={38} />
        </Link>

        <nav className="flex items-center gap-4 sm:gap-8 lg:gap-12" aria-label="Navegación principal">
          {enlaces.map(({ to, texto }) => (
            <NavLink key={to} to={to} className={`${claseEnlace} hidden sm:inline-flex`}>
              {texto}
            </NavLink>
          ))}
          {token ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 p-1.5 text-slate-100">
                <UserRound size={22} aria-hidden="true" />
                <span className="hidden max-w-32 truncate text-sm sm:block">{usuario?.nombre}</span>
              </span>
              <button
                type="button"
                onClick={salir}
                className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-marca-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-marca-500"
            >
              Ingresar
            </Link>
          )}
        </nav>
      </div>

      {enlaces.length > 0 && (
        <nav className="flex justify-center gap-8 border-t border-white/10 px-4 sm:hidden" aria-label="Navegación móvil">
          {enlaces.map(({ to, texto }) => (
            <NavLink key={to} to={to} className="py-2.5 text-sm font-medium text-slate-200 hover:text-white">
              {texto}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
