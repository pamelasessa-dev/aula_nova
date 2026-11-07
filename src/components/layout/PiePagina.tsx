import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Logotipo } from "../ui/Logotipo";

export function PiePagina() {
  const token = useAuthStore((state) => state.token);

  return (
    <footer className="bg-marca-900 text-white">
      <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-9 sm:px-10 lg:grid-cols-[1.35fr_1fr_1.25fr] lg:items-center lg:gap-0 lg:px-14">
        <div className="lg:pr-8">
          <Link to="/inicio" className="inline-flex text-xl">
            <Logotipo tamano={34} />
          </Link>
          <p className="mt-2 text-sm text-slate-200">Aprender hoy, construir un mejor mañana.</p>
        </div>

        <div className="border-t border-white/20 pt-5 lg:border-t-0 lg:border-l lg:px-8 lg:py-1">
          <h2 className="font-semibold">Enlaces útiles</h2>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-200">
            {token ? (
              <>
                <Link className="hover:text-marca-300" to="/inicio">Inicio</Link>
                <Link className="hover:text-marca-300" to="/cursos">Cursos</Link>
              </>
            ) : (
              <>
                <Link className="hover:text-marca-300" to="/login">Ingresar</Link>
                <Link className="hover:text-marca-300" to="/registro">Crear cuenta</Link>
              </>
            )}
          </div>
        </div>

        <p className="border-t border-white/20 pt-5 text-sm text-slate-200 lg:border-t-0 lg:border-l lg:py-1 lg:pl-8">
          © 2026 Aula Nova. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
