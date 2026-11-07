import { ArrowUpRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import type { Curso } from "../../types/curso";
import { BarraProgreso } from "../ui/BarraProgreso";
import { Insignia } from "../ui/Insignia";
import { Tarjeta } from "../ui/Tarjeta";

interface Props {
  curso: Curso;
}

export function TarjetaCurso({ curso }: Props) {
  const porcentaje = curso.cupo > 0 ? (curso.inscritos / curso.cupo) * 100 : 0;
  const docente = curso.docente
    ? `${curso.docente.nombre} ${curso.docente.apellido}`.trim()
    : "Sin docente asignado";

  return (
    <Tarjeta className="group flex flex-col overflow-hidden rounded-2xl border-slate-200 transition duration-200 hover:-translate-y-1 hover:border-marca-200 hover:shadow-xl hover:shadow-marca-950/5">
      <div className="h-1.5 bg-gradient-to-r from-marca-700 via-marca-500 to-marca-300" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-marca-50 px-3 py-1 text-xs font-semibold text-marca-800">
            {curso.creditos} {curso.creditos === 1 ? "crédito" : "créditos"}
          </span>
          <span className="rounded-md bg-slate-50 px-2 py-1 font-mono text-xs text-slate-500">
            {curso.codigo}
          </span>
        </div>

        <h2 className="mt-4 text-lg font-bold leading-snug text-marca-900 sm:text-xl">
          {curso.nombre}
        </h2>
        <p className="mt-2 line-clamp-3 min-h-[3.25rem] text-sm leading-relaxed text-slate-600">
          {curso.descripcion ?? "Este curso todavía no tiene descripción."}
        </p>

        <div className="mt-5 flex items-center gap-2.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <UserRound size={16} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Docente</p>
            <p className="truncate font-semibold text-slate-700">{docente}</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500">Cupos ocupados</span>
            <span className="font-semibold text-slate-700">
              {curso.inscritos} de {curso.cupo}
            </span>
          </div>
          <BarraProgreso valor={porcentaje} />
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              {curso.disponibles} {curso.disponibles === 1 ? "cupo disponible" : "cupos disponibles"}
            </span>
            {curso.disponibles === 0 && <Insignia color="rojo">Sin cupos</Insignia>}
          </div>
        </div>

        <Link
          to={`/cursos/${curso.id}`}
          className="mt-6 inline-flex w-full items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-marca-800 transition-colors group-hover:border-marca-200 group-hover:bg-marca-50"
        >
          Ver curso
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </Tarjeta>
  );
}
