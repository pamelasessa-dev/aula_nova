export type EstadoInscripcion = "ACTIVA" | "RETIRADA" | "FINALIZADA";

export interface Calificacion {
  id: number;
  inscripcionId: number;
  descripcion: string;
  nota: number;
  fecha: string;
}

export interface CursoInscripcion {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
}

export interface Inscripcion {
  id: number;
  estado: EstadoInscripcion;
  fecha: string;
  curso: CursoInscripcion;
  calificaciones?: Calificacion[];
  promedio: number | null;
}
