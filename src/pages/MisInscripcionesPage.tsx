import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
import { Cargando, ErrorConReintento } from "../components/ui/EstadoCarga";
import { EstadoInscripcionInsignia } from "../components/ui/EstadoInscripcionInsignia";
import { Tarjeta } from "../components/ui/Tarjeta";
import { useApi } from "../hooks/useApi";
import { inscripcionesService } from "../services/inscripciones";
import type { EstadoInscripcion } from "../types/inscripcion";

type Filtro = "TODAS" | EstadoInscripcion;

const pestanas: { valor: Filtro; texto: string }[] = [
  { valor: "TODAS", texto: "Todas" },
  { valor: "ACTIVA", texto: "Activas" },
  { valor: "RETIRADA", texto: "Retiradas" },
  { valor: "FINALIZADA", texto: "Finalizadas" },
];

export function MisInscripcionesPage() {
  const [filtro, setFiltro] = useState<Filtro>("TODAS");
  const { data: inscripciones, cargando, error, recargar } = useApi(() =>
    inscripcionesService.getMias(),
  );

  const visibles = (inscripciones ?? []).filter(
    (inscripcion) => filtro === "TODAS" || inscripcion.estado === filtro,
  );

  return (
    <section className="py-2">
      <EncabezadoPagina
        titulo="Mis inscripciones"
        descripcion="Cursos en los que te inscribiste y su estado."
        acciones={
          <Link
            to="/cursos"
            className="inline-flex items-center gap-2 rounded-lg bg-marca-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-marca-700"
          >
            <Plus size={16} aria-hidden="true" /> Nueva inscripción
          </Link>
        }
      />

      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-slate-200">
        {pestanas.map(({ valor, texto }) => (
          <button
            key={valor}
            type="button"
            onClick={() => setFiltro(valor)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap ${
              filtro === valor
                ? "border-marca-600 text-marca-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {texto}
          </button>
        ))}
      </div>

      {cargando && <Cargando texto="Cargando tus inscripciones..." />}

      {!cargando && error && (
        <ErrorConReintento
          titulo="No pudimos cargar tus inscripciones"
          mensaje={error}
          alReintentar={recargar}
        />
      )}

      {!cargando && !error && inscripciones && visibles.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-marca-900">
            {inscripciones.length === 0 ? "Todavía no tienes inscripciones" : "Sin inscripciones en este estado"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {inscripciones.length === 0 && (
              <Link to="/cursos" className="font-semibold text-marca-700 hover:text-marca-800">
                Explora los cursos disponibles
              </Link>
            )}
          </p>
        </div>
      )}

      {!cargando && !error && visibles.length > 0 && (
        <Tarjeta className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Curso</th>
                  <th className="px-5 py-3 font-semibold">Créditos</th>
                  <th className="px-5 py-3 font-semibold">Fecha</th>
                  <th className="px-5 py-3 font-semibold">Estado</th>
                  <th className="px-5 py-3 font-semibold">Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibles.map((inscripcion) => (
                  <tr key={inscripcion.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <Link
                        to={`/cursos/${inscripcion.curso.id}`}
                        className="font-medium text-slate-900 hover:text-marca-700"
                      >
                        {inscripcion.curso.nombre}
                      </Link>
                      <p className="font-mono text-xs text-slate-500">{inscripcion.curso.codigo}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{inscripcion.curso.creditos}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                      {new Date(inscripcion.fecha).toLocaleDateString("es")}
                    </td>
                    <td className="px-5 py-4">
                      <EstadoInscripcionInsignia estado={inscripcion.estado} />
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {inscripcion.promedio ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tarjeta>
      )}
    </section>
  );
}
