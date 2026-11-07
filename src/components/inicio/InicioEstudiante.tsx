import { BookOpen, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Cargando, ErrorConReintento } from "../ui/EstadoCarga";
import { TarjetaEstadistica } from "../ui/TarjetaEstadistica";
import { useApi } from "../../hooks/useApi";
import { inscripcionesService } from "../../services/inscripciones";

export function InicioEstudiante() {
  const { data: inscripciones, cargando, error, recargar } = useApi(() =>
    inscripcionesService.getMias(),
  );

  if (cargando) return <Cargando texto="Cargando tu resumen..." />;
  if (error || !inscripciones) {
    return (
      <ErrorConReintento
        titulo="No pudimos cargar tus datos"
        mensaje={error ?? "Respuesta vacía del servidor."}
        alReintentar={recargar}
      />
    );
  }

  // Solo cuentan las inscripciones activas.
  const activas = inscripciones.filter((inscripcion) => inscripcion.estado === "ACTIVA");
  const creditos = activas.reduce((suma, inscripcion) => suma + inscripcion.curso.creditos, 0);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <TarjetaEstadistica
          titulo="Cursos inscritos"
          valor={String(activas.length)}
          detalle="Inscripciones activas"
          icono={<BookOpen size={22} />}
        />
        <TarjetaEstadistica
          titulo="Créditos"
          valor={String(creditos)}
          detalle="Suma de tus cursos activos"
          icono={<GraduationCap size={22} />}
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/cursos"
          className="rounded-full bg-marca-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-marca-700"
        >
          Explorar cursos
        </Link>
        <Link
          to="/inscripciones"
          className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Ver mis inscripciones
        </Link>
      </div>
    </>
  );
}
