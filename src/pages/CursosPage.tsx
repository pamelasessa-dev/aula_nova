import { useState } from "react";
import { Buscador } from "../components/cursos/Buscador";
import { TarjetaCurso } from "../components/cursos/TarjetaCurso";
import { Cargando, ErrorConReintento } from "../components/ui/EstadoCarga";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";

export function CursosPage() {
  const [busqueda, setBusqueda] = useState("");
  const { data: cursos, cargando, error, recargar } = useApi(() => cursosService.getTodos());

  const consulta = busqueda.trim().toLowerCase();
  const cursosFiltrados = (cursos ?? []).filter(
    (curso) =>
      curso.nombre.toLowerCase().includes(consulta) ||
      curso.codigo.toLowerCase().includes(consulta),
  );

  return (
    <section className="py-2">
      <EncabezadoPagina
        titulo="Explora nuestros cursos"
        descripcion="Encuentra el próximo curso para avanzar hacia tus metas."
      />

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Buscador valor={busqueda} onCambiar={setBusqueda} />
        {cursos && (
          <p className="text-sm text-slate-500">
            {cursosFiltrados.length} de {cursos.length} cursos
          </p>
        )}
      </div>

      {cargando && <Cargando texto="Cargando cursos..." />}

      {!cargando && error && (
        <ErrorConReintento
          titulo="No pudimos cargar los cursos"
          mensaje={error}
          alReintentar={recargar}
        />
      )}

      {!cargando && !error && cursos && cursos.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-marca-900">Todavía no hay cursos disponibles</h2>
          <p className="mt-2 text-sm text-slate-500">Vuelve pronto para ver nuevas opciones.</p>
        </div>
      )}

      {!cargando && !error && cursos && cursos.length > 0 && cursosFiltrados.length === 0 && (
        <p className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-500">
          Sin resultados para “{busqueda}”.
        </p>
      )}

      {!cargando && !error && cursosFiltrados.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cursosFiltrados.map((curso) => (
            <TarjetaCurso key={curso.id} curso={curso} />
          ))}
        </div>
      )}
    </section>
  );
}
