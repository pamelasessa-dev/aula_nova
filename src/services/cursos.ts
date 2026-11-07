import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Curso } from "../types/curso";

export const cursosService = {
  // Sin limit la API solo devuelve 10 cursos.
  getTodos: async (): Promise<Curso[]> => {
    const respuesta = await api.get<RespuestaApi<Curso[]>>("/cursos", {
      params: { limit: 100 },
    });
    return respuesta.data.data;
  },

  getPorId: async (id: number): Promise<Curso> => {
    const respuesta = await api.get<RespuestaApi<Curso>>(`/cursos/${id}`);
    return respuesta.data.data;
  },

  // Total de cursos: se pide 1 solo y se lee meta.total.
  getTotal: async (): Promise<number> => {
    const respuesta = await api.get<RespuestaApi<Curso[]>>("/cursos", {
      params: { limit: 1 },
    });
    return respuesta.data.meta?.total ?? respuesta.data.data.length;
  },
};
