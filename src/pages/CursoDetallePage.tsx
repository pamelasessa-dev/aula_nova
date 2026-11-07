import { ArrowLeft, BookOpen, CheckCircle2, GraduationCap, UserRound, Users } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BarraProgreso } from "../components/ui/BarraProgreso";
import { Boton } from "../components/ui/Boton";
import { Cargando, ErrorConReintento } from "../components/ui/EstadoCarga";
import { Insignia } from "../components/ui/Insignia";
import { Tarjeta } from "../components/ui/Tarjeta";
import { useApi } from "../hooks/useApi";
import { mensajeError } from "../lib/errores";
import { cursosService } from "../services/cursos";
import { inscripcionesService } from "../services/inscripciones";
import { useAuthStore } from "../store/useAuthStore";

export function CursoDetallePage() {
  const { id } = useParams();
  const cursoId = Number(id); // useParams() siempre devuelve texto
  const esEstudiante = useAuthStore((state) => state.usuario?.rol === "ESTUDIANTE");

  const [enviando, setEnviando] = useState(false);
  const [errorInscripcion, setErrorInscripcion] = useState<string | null>(null);

  const { data: curso, cargando, error, recargar: recargarCurso } = useApi(
    () => cursosService.getPorId(cursoId),
    [cursoId],
  );
  // Solo los estudiantes necesitan saber si ya están inscritos.
  const { data: inscripciones, recargar: recargarInscripciones } = useApi(
    () => (esEstudiante ? inscripcionesService.getMias() : Promise.resolve([])),
    [esEstudiante],
  );

  if (Number.isNaN(cursoId)) {
    return (
      <ErrorConReintento
        titulo="Curso no válido"
        mensaje="La dirección del curso no es correcta."
        alReintentar={() => window.history.back()}
      />
    );
  }

  const volver = (
    <Link
      to="/cursos"
      className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
    >
      <ArrowLeft size={16} /> Volver a cursos
    </Link>
  );

  // Solo se muestra la carga completa la primera vez; al recargar se conserva el curso.
  if (cargando && !curso) return <>{volver}<Cargando texto="Cargando curso..." /></>;
  if (error || !curso) {
    return (
      <>
        {volver}
        <ErrorConReintento
          titulo="No pudimos cargar el curso"
          mensaje={error ?? "Curso no encontrado."}
          alReintentar={recargarCurso}
        />
      </>
    );
  }

  const inscrito = (inscripciones ?? []).some(
    (inscripcion) => inscripcion.curso.id === curso.id && inscripcion.estado !== "RETIRADA",
  );
  const sinCupos = curso.disponibles <= 0;
  const porcentaje = curso.cupo > 0 ? (curso.inscritos / curso.cupo) * 100 : 0;
  const docente = curso.docente
    ? `${curso.docente.nombre} ${curso.docente.apellido}`.trim()
    : "Sin docente asignado";

  const inscribirme = async () => {
    setEnviando(true);
    setErrorInscripcion(null);
    try {
      await inscripcionesService.inscribir(curso.id);
      recargarCurso(); // actualiza los cupos
      recargarInscripciones(); // el botón pasa a "Inscrito"
    } catch (err) {
      setErrorInscripcion(mensajeError(err, "No se pudo completar la inscripción."));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="py-2">
      {volver}

      <Tarjeta className="overflow-hidden rounded-2xl">
        <div className="h-2 bg-gradient-to-r from-marca-700 via-marca-500 to-marca-300" />
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Insignia color="azul">{curso.codigo}</Insignia>
              <Insignia color="gris">
                {curso.creditos} {curso.creditos === 1 ? "crédito" : "créditos"}
              </Insignia>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-marca-900 sm:text-4xl">
              {curso.nombre}
            </h1>
            <p className="mt-4 leading-relaxed text-slate-600">
              {curso.descripcion ?? "Este curso todavía no tiene descripción."}
            </p>

            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <UserRound size={20} className="text-marca-600" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-slate-400 uppercase">Docente</dt>
                  <dd className="text-sm font-semibold text-slate-700">{docente}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap size={20} className="text-marca-600" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-slate-400 uppercase">Créditos</dt>
                  <dd className="text-sm font-semibold text-slate-700">{curso.creditos}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-marca-600" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-slate-400 uppercase">Código</dt>
                  <dd className="text-sm font-semibold text-slate-700">{curso.codigo}</dd>
                </div>
              </div>
            </dl>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Users size={18} className="text-marca-600" aria-hidden="true" /> Cupos
            </div>
            <p className="mt-3 text-3xl font-bold text-marca-900">
              {curso.inscritos}
              <span className="text-lg font-medium text-slate-400"> / {curso.cupo}</span>
            </p>
            <div className="mt-3">
              <BarraProgreso valor={porcentaje} />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              {curso.disponibles} {curso.disponibles === 1 ? "cupo disponible" : "cupos disponibles"}
            </p>

            <div className="mt-5">
              {esEstudiante ? (
                inscrito ? (
                  <Boton anchoCompleto disabled variante="secundario" icono={<CheckCircle2 size={17} />}>
                    Inscrito
                  </Boton>
                ) : (
                  <Boton anchoCompleto onClick={inscribirme} disabled={enviando || sinCupos}>
                    {sinCupos ? "Sin cupos" : enviando ? "Inscribiendo..." : "Inscribirme"}
                  </Boton>
                )
              ) : (
                <p className="text-xs text-slate-500">Solo los estudiantes pueden inscribirse.</p>
              )}
            </div>

            {errorInscripcion && (
              <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorInscripcion}
              </p>
            )}
          </aside>
        </div>
      </Tarjeta>
    </section>
  );
}
