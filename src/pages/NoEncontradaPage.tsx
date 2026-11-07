import { Link } from "react-router-dom";

export function NoEncontradaPage() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center p-6 text-center">
      <p className="text-7xl font-bold text-marca-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Página no encontrada</h1>
      <p className="mt-2 text-slate-500">La dirección que buscas no existe o fue movida.</p>
      <Link
        to="/inicio"
        className="mt-8 rounded-lg bg-marca-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-marca-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
