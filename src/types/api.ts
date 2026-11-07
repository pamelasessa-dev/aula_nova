export interface RespuestaApi<T> {
  success: boolean;
  data: T;
  message?: string;
  details?: Array<{ campo?: string; mensaje: string }>;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
