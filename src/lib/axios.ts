import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // La API de Render se duerme: la primera petición puede tardar ~50 s.
  timeout: 90_000,
});

// Antes de cada petición: si hay sesión, adjunta el token.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si el token venció (401 con sesión abierta), se cierra la sesión.
// Un 401 en /auth/login no entra aquí: ahí todavía no hay token guardado.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      useAuthStore.getState().token
    ) {
      useAuthStore.getState().cerrarSesion();
    }
    return Promise.reject(error);
  },
);
