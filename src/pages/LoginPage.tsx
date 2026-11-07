import { LockKeyhole, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PlantillaAuth } from "../components/auth/PlantillaAuth";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { mensajeError } from "../lib/errores";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  if (token) return <Navigate to="/inicio" replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      const sesion = await authService.login({ username: username.trim(), password });
      iniciarSesion(sesion.token, sesion.usuario);
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(mensajeError(err, "No se pudo iniciar sesión. Revisa tus datos."));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PlantillaAuth
      etiqueta="Bienvenida de nuevo"
      titulo="Iniciar sesión"
      descripcion="Ingresa con tu usuario y contraseña."
      pie={
        <>
          ¿Todavía no tienes cuenta?{" "}
          <Link to="/registro" className="font-semibold text-marca-700 hover:text-marca-800">
            Crear cuenta
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <CampoTexto
          id="username"
          etiqueta="Usuario"
          placeholder="Tu nombre de usuario"
          icono={<UserRound size={17} />}
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <CampoTexto
          id="password"
          etiqueta="Contraseña"
          type="password"
          placeholder="••••••••"
          icono={<LockKeyhole size={17} />}
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <Boton type="submit" anchoCompleto disabled={enviando} className="rounded-full py-3">
          {enviando ? "Ingresando..." : "Ingresar"}
        </Boton>
        {enviando && (
          <p className="text-center text-xs text-slate-400">
            Si el servidor estaba dormido, puede tardar hasta un minuto.
          </p>
        )}
      </form>
    </PlantillaAuth>
  );
}
