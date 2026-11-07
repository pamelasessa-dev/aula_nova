import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Inscripcion } from "../types/inscripcion";

export const inscripcionesService = {
  // La API filtra según el rol: un estudiante solo recibe las suyas.
  getMias: async (): Promise<Inscripcion[]> => {
    const respuesta = await api.get<RespuestaApi<Inscripcion[]>>("/inscripciones", {
      params: { limit: 100 },
    });
    return respuesta.data.data;
  },

  inscribir: async (cursoId: number): Promise<Inscripcion> => {
    const respuesta = await api.post<RespuestaApi<Inscripcion>>("/inscripciones", {
      cursoId,
    });
    return respuesta.data.data;
  },
};
