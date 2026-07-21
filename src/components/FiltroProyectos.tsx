import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Proyecto {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  image?: string; // 👈 Campo de imagen opcional
}

interface Props {
  proyectosIniciales: Proyecto[];
}

export default function FiltroProyectos({ proyectosIniciales }: Props) {
  const [tagSeleccionado, setTagSeleccionado] = useState<string | null>(null);

  const todasLasTags = Array.from(
    new Set(proyectosIniciales.flatMap((p) => p.tags)),
  );
  const proyectosFiltrados = tagSeleccionado
    ? proyectosIniciales.filter((p) => p.tags.includes(tagSeleccionado))
    : proyectosIniciales;

  return (
    <div className="space-y-12">
      {/* Botones de Filtro Estilizados */}
      <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
        <button
          onClick={() => setTagSeleccionado(null)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 shadow-sm ${
            tagSeleccionado === null
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20 shadow-lg"
              : "bg-zinc-900/80 text-zinc-400 border border-zinc-800/80 hover:text-white hover:border-zinc-700"
          }`}
        >
          Todos
        </button>
        {todasLasTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagSeleccionado(tag)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
              tagSeleccionado === tag
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20 shadow-lg"
                : "bg-zinc-900/80 text-zinc-400 border border-zinc-800/80 hover:text-white hover:border-zinc-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid Animado con Tarjetas con Imagen de Fondo */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {proyectosFiltrados.map((p, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.01 }}
              key={p.title}
              className="group relative min-h-[280px] p-6 bg-zinc-950 border border-zinc-800/80 rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl transition-all hover:border-zinc-700/80"
            >
              {/* 🖼️ IMAGEN DE FONDO CON DIFUMINADO Y DEGRADADO NEGRO */}
              {p.image ? (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={
                      p.image.startsWith("http")
                        ? p.image
                        : `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.image.replace(/^\//, "")}`
                    }
                    alt={p.title}
                    className="w-full h-full object-cover object-top opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 blur-[1px] group-hover:blur-0"
                  />
                  {/* Degradado oscuro por encima para garantizar que el texto sea 100% legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
                </div>
              ) : (
                /* Fondo por defecto si un proyecto aún no tiene imagen */
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500/0 via-indigo-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}

              {/* CONTENIDO DE LA TARJETA (Encima del fondo con z-10) */}
              <div className="relative z-10">
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors mb-2 drop-shadow-md">
                    {p.title}
                  </h3>
                </a>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-normal drop-shadow-sm">
                  {p.description}
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-medium tracking-wider bg-zinc-900/90 text-zinc-200 rounded-md border border-zinc-700/50 backdrop-blur-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold tracking-wider uppercase text-blue-400 group-hover:text-blue-300 transition-colors"
                  >
                    Visitar Sitio Web{" "}
                    <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
