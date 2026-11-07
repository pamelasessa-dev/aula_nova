import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Usuario } from "../types/usuario";

export interface LoginDatos {
  username: string;
  password: string;
}

export interface RegistroDatos extends LoginDatos {
  nombre: string;
  apellido: string;
  email: string;
}

export interface Sesion {
  token: string;
  tipo: string;
  usuario: Usuario;
}

export const authService = {
  login: async (datos: LoginDatos): Promise<Sesion> => {
    const respuesta = await api.post<RespuestaApi<Sesion>>("/auth/login", datos);
    return respuesta.data.data;
  },

  // Crea un ESTUDIANTE. Si la API no devuelve token, se inicia sesión a continuación.
  registro: async (datos: RegistroDatos): Promise<Sesion> => {
    const respuesta = await api.post<RespuestaApi<Sesion>>("/auth/register", datos);
    const sesion = respuesta.data.data;
    if (sesion?.token) return sesion;
    return authService.login({ username: datos.username, password: datos.password });
  },
};
