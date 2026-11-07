export interface DocenteCurso {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  fotoUrl: string | null;
}

/** Curso tal como lo devuelve la API (GET /cursos y GET /cursos/:id). */
export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  creditos: number;
  cupo: number;
  inscritos: number;
  disponibles: number;
  docente: DocenteCurso | null;
  createdAt: string;
  updatedAt: string;
}
