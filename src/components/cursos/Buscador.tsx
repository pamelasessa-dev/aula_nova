import { Search } from "lucide-react";

interface Props {
  valor: string;
  onCambiar: (valor: string) => void;
}

export function Buscador({ valor, onCambiar }: Props) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <input
        value={valor}
        onChange={(event) => onCambiar(event.target.value)}
        placeholder="Buscar por nombre o código..."
        aria-label="Buscar curso por nombre o código"
        className="w-full rounded-full border border-slate-200 bg-white py-3 pr-4 pl-10 text-sm shadow-sm outline-none transition focus:border-marca-400 focus:ring-4 focus:ring-marca-100"
      />
    </div>
  );
}
