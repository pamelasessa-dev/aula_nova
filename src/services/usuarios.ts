import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Usuario } from "../types/usuario";

export const usuariosService = {
  // Solo ADMIN. Se recorren las páginas y se cuentan los de rol ESTUDIANTE.
  contarEstudiantes: async (): Promise<number> => {
    let pagina = 1;
    let totalPaginas = 1;
    let total = 0;

    do {
      const respuesta = await api.get<RespuestaApi<Usuario[]>>("/usuarios", {
        params: { page: pagina, limit: 100 },
      });
      total += respuesta.data.data.filter((u) => u.rol === "ESTUDIANTE").length;
      totalPaginas = respuesta.data.meta?.totalPages ?? 1;
      pagina += 1;
    } while (pagina <= totalPaginas);

    return total;
  },
};
