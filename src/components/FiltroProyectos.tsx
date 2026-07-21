import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Proyecto {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  image?: string;
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

      {/* Grid Animado con Tarjetas Destacadas */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {proyectosFiltrados.map((p, index) => {
            const imageSrc = p.image
              ? p.image.startsWith("http")
                ? p.image
                : `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.image.replace(/^\//, "")}`
              : null;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                key={p.title}
                className="group relative flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10"
              >
                {/* 🖼️ VISTA PREVIA DE LA IMAGEN DESTACADA (MARCO TIPO MOCKUP) */}
                {imageSrc ? (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-zinc-900 border-b border-zinc-800/80">
                    <img
                      src={imageSrc}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Sombra sutil para integrar la imagen con el contenido */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  </div>
                ) : (
                  /* Gradient decorativo por defecto si un proyecto no tiene imagen */
                  <div className="w-full h-32 bg-gradient-to-tr from-blue-900/20 via-zinc-900 to-indigo-900/20 border-b border-zinc-800/80 flex items-center justify-center">
                    <span className="text-xs font-mono text-zinc-600">
                      // Sin vista previa
                    </span>
                  </div>
                )}

                {/* CONTENIDO DE LA TARJETA */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-5">
                  <div className="space-y-2">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="text-xl font-bold font-mono text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                    </a>
                    <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider bg-zinc-900 text-zinc-300 rounded-md border border-zinc-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Botón de Enlace */}
                    <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold font-mono tracking-wider uppercase text-blue-400 group-hover:text-blue-300 transition-colors"
                      >
                        Visitar Sitio Web{" "}
                        <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform">
                          ↗
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
