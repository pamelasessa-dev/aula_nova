import { Boton } from "./Boton";

export function Cargando({ texto = "Cargando..." }: { texto?: string }) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-sm"
    >
      <span className="mx-auto mb-4 block h-9 w-9 animate-spin rounded-full border-4 border-marca-100 border-t-marca-600" />
      <p>{texto}</p>
      <p className="mt-1 text-xs text-slate-400">
        La primera carga puede tardar hasta un minuto mientras el servidor se despierta.
      </p>
    </div>
  );
}

interface PropsError {
  titulo: string;
  mensaje: string;
  alReintentar: () => void;
}

export function ErrorConReintento({ titulo, mensaje, alReintentar }: PropsError) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
      <h2 className="text-lg font-semibold text-red-900">{titulo}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-red-700">{mensaje}</p>
      <div className="mt-5 flex justify-center">
        <Boton onClick={alReintentar}>Reintentar</Boton>
      </div>
    </div>
  );
}
