import { AtSign, Lock, Mail, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PlantillaAuth } from "../components/auth/PlantillaAuth";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { mensajeError } from "../lib/errores";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";

const FORMULARIO_VACIO = {
  username: "",
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  confirmar: "",
};

export function RegistroPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);
  const [form, setForm] = useState(FORMULARIO_VACIO);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  if (token) return <Navigate to="/inicio" replace />;

  const cambiar = (campo: keyof typeof FORMULARIO_VACIO) => (event: { target: { value: string } }) =>
    setForm((actual) => ({ ...actual, [campo]: event.target.value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Reglas de la API: contraseña de 8 a 72 caracteres con al menos un número.
    if (form.password.length < 8 || !/[0-9]/.test(form.password)) {
      setError("La contraseña debe tener al menos 8 caracteres e incluir un número.");
      return;
    }
    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setEnviando(true);
    try {
      const sesion = await authService.registro({
        username: form.username.trim(),
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      iniciarSesion(sesion.token, sesion.usuario);
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(mensajeError(err, "No se pudo crear la cuenta."));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PlantillaAuth
      etiqueta="Únete a Aula Nova"
      titulo="Crea tu cuenta"
      descripcion="El registro crea una cuenta de estudiante."
      pie={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-marca-700 hover:text-marca-800">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <CampoTexto
            id="nombre"
            etiqueta="Nombre"
            placeholder="Ana"
            icono={<User size={17} />}
            autoComplete="given-name"
            maxLength={100}
            value={form.nombre}
            onChange={cambiar("nombre")}
            required
          />
          <CampoTexto
            id="apellido"
            etiqueta="Apellido"
            placeholder="Quispe"
            icono={<User size={17} />}
            autoComplete="family-name"
            maxLength={100}
            value={form.apellido}
            onChange={cambiar("apellido")}
            required
          />
        </div>
        <CampoTexto
          id="username"
          etiqueta="Usuario"
          placeholder="ana.quispe"
          icono={<AtSign size={17} />}
          autoComplete="username"
          minLength={3}
          maxLength={50}
          pattern="[a-zA-Z0-9._\-]+"
          title="Solo letras, números, punto, guion y guion bajo."
          ayuda="De 3 a 50 caracteres: letras, números, . _ -"
          value={form.username}
          onChange={cambiar("username")}
          required
        />
        <CampoTexto
          id="email"
          etiqueta="Correo electrónico"
          type="email"
          placeholder="ana@correo.com"
          icono={<Mail size={17} />}
          autoComplete="email"
          maxLength={150}
          value={form.email}
          onChange={cambiar("email")}
          required
        />
        <CampoTexto
          id="password"
          etiqueta="Contraseña"
          type="password"
          placeholder="••••••••"
          icono={<Lock size={17} />}
          autoComplete="new-password"
          maxLength={72}
          ayuda="Mínimo 8 caracteres e incluir al menos un número."
          value={form.password}
          onChange={cambiar("password")}
          required
        />
        <CampoTexto
          id="confirmar"
          etiqueta="Repite la contraseña"
          type="password"
          placeholder="••••••••"
          icono={<Lock size={17} />}
          autoComplete="new-password"
          maxLength={72}
          value={form.confirmar}
          onChange={cambiar("confirmar")}
          required
        />

        {error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <Boton type="submit" anchoCompleto disabled={enviando} className="rounded-full py-3">
          {enviando ? "Creando cuenta..." : "Crear cuenta"}
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
