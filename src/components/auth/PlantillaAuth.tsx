import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logotipo } from "../ui/Logotipo";

interface Props {
  etiqueta: string;
  titulo: string;
  descripcion: string;
  children: ReactNode;
  pie: ReactNode;
}

/** Marco compartido por Login y Registro: panel de marca + formulario. */
export function PlantillaAuth({ etiqueta, titulo, descripcion, children, pie }: Props) {
  return (
    <section className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:min-h-[620px] lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-marca-900 p-10 text-white lg:flex">
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-marca-500/30 blur-2xl" />
        <Link to="/inicio" className="relative text-lg text-white">
          <Logotipo />
        </Link>
        <div className="relative max-w-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-marca-300">Tu espacio académico</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight">Aprende y avanza a tu propio ritmo.</h1>
          <p className="mt-4 leading-relaxed text-marca-100">
            Explora cursos, inscríbete y sigue tu progreso en Aula Nova.
          </p>
        </div>
        <p className="relative text-sm text-marca-200">Aprender hoy, construir un mejor mañana.</p>
      </div>

      <div className="flex items-center px-6 py-10 sm:px-10 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-marca-700 lg:hidden">
            <Logotipo tamano={30} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-marca-700">{etiqueta}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-marca-900">{titulo}</h2>
          <p className="mt-2 text-sm text-slate-500">{descripcion}</p>
          {children}
          <p className="mt-6 text-center text-sm text-slate-500">{pie}</p>
        </div>
      </div>
    </section>
  );
}
