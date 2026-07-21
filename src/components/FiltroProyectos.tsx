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

  // 💡 LÓGICA PARA EL EFECTO SPOTLIGHT Y TILT 3D
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Actualiza variables CSS para el foco radial (Spotlight)
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);

    // Inclinación suave en 3D
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="space-y-12">
      {/* Botones de Filtro Estilizados en Gruvbox */}
      <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
        <button
          onClick={() => setTagSeleccionado(null)}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono tracking-wide uppercase transition-all duration-300 shadow-sm ${
            tagSeleccionado === null
              ? "bg-[#fe8019] text-[#121314] shadow-[#fe8019]/20 shadow-lg"
              : "bg-[#282828] text-[#a89984] border border-[#3c3836] hover:text-[#ebdbb2] hover:border-[#504945]"
          }`}
        >
          Todos
        </button>
        {todasLasTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagSeleccionado(tag)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono tracking-wide uppercase transition-all duration-300 ${
              tagSeleccionado === tag
                ? "bg-[#fe8019] text-[#121314] shadow-[#fe8019]/20 shadow-lg"
                : "bg-[#282828] text-[#a89984] border border-[#3c3836] hover:text-[#ebdbb2] hover:border-[#504945]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid Animado con Tarjetas Gruvbox sobre Fondo Oscuro */}
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
                key={p.title}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex flex-col bg-[#282828] border border-[#3c3836] rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 ease-out hover:border-[#8ec07c]/60"
              >
                {/* 💡 CAPA DE LUZ SPOTLIGHT EN HOVER */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                  style={{
                    background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(254, 128, 25, 0.12), transparent 40%)`,
                  }}
                />

                {/* 🖼️ VISTA PREVIA DE LA IMAGEN DESTACADA */}
                {imageSrc ? (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#121314] border-b border-[#3c3836] z-10">
                    <img
                      src={imageSrc}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#282828]/90 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-[#121314] border-b border-[#3c3836] flex items-center justify-center z-10">
                    <span className="text-xs font-mono text-[#928374]">
                      // Sin vista previa
                    </span>
                  </div>
                )}

                {/* CONTENIDO DE LA TARJETA */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-5 z-20">
                  <div className="space-y-2">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="text-xl font-bold font-mono text-[#ebdbb2] tracking-tight group-hover:text-[#fe8019] transition-colors">
                        {p.title}
                      </h3>
                    </a>
                    <p className="text-[#a89984] text-sm leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider bg-[#121314] text-[#ebdbb2] rounded-md border border-[#3c3836]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Botón de Enlace */}
                    <div className="pt-3 border-t border-[#3c3836] flex items-center justify-between">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold font-mono tracking-wider uppercase text-[#8ec07c] group-hover:text-[#b8bb26] transition-colors"
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
