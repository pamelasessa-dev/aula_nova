import { BookOpen, Users } from "lucide-react";
import { Cargando, ErrorConReintento } from "../ui/EstadoCarga";
import { TarjetaEstadistica } from "../ui/TarjetaEstadistica";
import { useApi } from "../../hooks/useApi";
import { cursosService } from "../../services/cursos";
import { usuariosService } from "../../services/usuarios";

export function InicioAdmin() {
  const { data, cargando, error, recargar } = useApi(async () => {
    const [cursos, estudiantes] = await Promise.all([
      cursosService.getTotal(),
      usuariosService.contarEstudiantes(),
    ]);
    return { cursos, estudiantes };
  });

  if (cargando) return <Cargando texto="Cargando el resumen..." />;
  if (error || !data) {
    return (
      <ErrorConReintento
        titulo="No pudimos cargar el resumen"
        mensaje={error ?? "Respuesta vacía del servidor."}
        alReintentar={recargar}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TarjetaEstadistica
        titulo="Total de cursos"
        valor={String(data.cursos)}
        detalle="Cursos registrados en la plataforma"
        icono={<BookOpen size={22} />}
      />
      <TarjetaEstadistica
        titulo="Total de estudiantes"
        valor={String(data.estudiantes)}
        detalle="Usuarios con rol estudiante"
        icono={<Users size={22} />}
      />
    </div>
  );
}
