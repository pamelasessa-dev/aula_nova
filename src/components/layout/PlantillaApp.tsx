import { Outlet } from "react-router-dom";
import { BarraSuperior } from "./BarraSuperior";
import { PiePagina } from "./PiePagina";

export function PlantillaApp() {
  return (
    <div className="flex min-h-screen flex-col">
      <BarraSuperior />
      <main className="mx-auto w-full max-w-[1536px] flex-1 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}
