import { useState } from "react";

interface Proyecto {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

interface Props {
  proyectosIniciales: Proyecto[];
}

export default function FiltroProyectos({ proyectosIniciales }: Props) {
  const [tagSeleccionado, setTagSeleccionado] = useState<string | null>(null);

  // Extraer todas las tecnologías únicas de tus proyectos
  const todasLasTags = Array.from(
    new Set(proyectosIniciales.flatMap((p) => p.tags)),
  );

  const proyectosFiltrados = tagSeleccionado
    ? proyectosIniciales.filter((p) => p.tags.includes(tagSeleccionado))
    : proyectosIniciales;

  return (
    <div className="space-y-8">
      {/* Botones de Filtro */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTagSeleccionado(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tagSeleccionado === null
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          Todos
        </button>
        {todasLasTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagSeleccionado(tag)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tagSeleccionado === tag
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid de Tarjetas de Proyectos */}
      <div className="grid gap-6 md:grid-cols-2">
        {proyectosFiltrados.map((p) => (
          <div
            key={p.title}
            className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-all"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                {p.description}
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs bg-zinc-800 text-zinc-400 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300"
              >
                Ver Código Código en GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
