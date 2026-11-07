import { GraduationCap } from "lucide-react";

interface Props {
  tamano?: number;
}

/** Nombre de la plataforma con su ícono (se usa en barra, pie y login). */
export function Logotipo({ tamano = 32 }: Props) {
  return (
    <span className="inline-flex items-center gap-2.5 font-bold tracking-tight">
      <GraduationCap size={tamano} strokeWidth={2.3} aria-hidden="true" />
      <span>
        Aula<span className="text-marca-300">Nova</span>
      </span>
    </span>
  );
}
