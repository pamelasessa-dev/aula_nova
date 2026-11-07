import { InicioAdmin } from "../components/inicio/InicioAdmin";
import { InicioEstudiante } from "../components/inicio/InicioEstudiante";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

export function InicioPage() {
  const usuario = useAuthStore((state) => state.usuario);
  if (!usuario) return null; // RutaProtegida ya garantiza que hay sesión

  return (
    <section className="py-2">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-marca-700">
        Tu panel
      </p>
      <h1 className="mt-2 mb-8 text-4xl font-extrabold tracking-tight text-marca-900 sm:text-5xl">
        Hola, {usuario.nombre}
      </h1>

      {usuario.rol === "ADMIN" && <InicioAdmin />}
      {usuario.rol === "ESTUDIANTE" && <InicioEstudiante />}
      {usuario.rol === "DOCENTE" && (
        <Link
          to="/cursos"
          className="inline-flex rounded-full bg-marca-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-marca-700"
        >
          Ver cursos
        </Link>
      )}
    </section>
  );
}
