import axios from "axios";

export function mensajeError(error: unknown, porDefecto: string): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "El servidor tardó demasiado en responder. Inténtalo de nuevo.";
    }
    if (!error.response) return "No hay conexión con el servidor.";

    const datos = (error.response.data ?? {}) as {
      details?: Array<{ mensaje?: string }>;
      message?: string;
    };
    return datos.details?.[0]?.mensaje ?? datos.message ?? porDefecto;
  }

  if (error instanceof Error) return error.message;
  return porDefecto;
}
