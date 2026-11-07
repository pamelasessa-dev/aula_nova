import { Navigate, Route, Routes } from "react-router-dom";
import { PlantillaApp } from "./components/layout/PlantillaApp";
import { RutaProtegida } from "./components/layout/RutaProtegida";
import { CursoDetallePage } from "./pages/CursoDetallePage";
import { CursosPage } from "./pages/CursosPage";
import { InicioPage } from "./pages/InicioPage";
import { LoginPage } from "./pages/LoginPage";
import { MisInscripcionesPage } from "./pages/MisInscripcionesPage";
import { NoEncontradaPage } from "./pages/NoEncontradaPage";
import { RegistroPage } from "./pages/RegistroPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PlantillaApp />}>
        {/* Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/404" element={<NoEncontradaPage />} />

        {/* Con sesión */}
        <Route element={<RutaProtegida />}>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="inicio" element={<InicioPage />} />
          <Route path="cursos" element={<CursosPage />} />
          <Route path="cursos/:id" element={<CursoDetallePage />} />
        </Route>

        {/* Solo estudiantes */}
        <Route element={<RutaProtegida roles={["ESTUDIANTE"]} />}>
          <Route path="inscripciones" element={<MisInscripcionesPage />} />
        </Route>

        <Route path="*" element={<NoEncontradaPage />} />
      </Route>
    </Routes>
  );
}
