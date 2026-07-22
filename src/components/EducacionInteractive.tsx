import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ItemEducacion {
  id: string;
  tipo: "Ingeniería" | "Certificación" | "Formación";
  titulo: string;
  institucion: string;
  periodo: string;
  estado: "En Curso" | "Completado";
  detalles: string;
  modulos: string[];
  icono: string;
}

const datosEducacion: ItemEducacion[] = [
  {
    id: "umg-master",
    tipo: "Ingeniería",
    titulo:
      "Ingeniería en Sistemas de Información y Ciencias de la Computación",
    institucion: "Universidad Mariano Gálvez",
    periodo: "2020 - Presente",
    estado: "En Curso",
    detalles:
      "Proyectos de TI, arquitectura de sistemas, infraestructura y metodologías de ingeniería de software.",
    modulos: [
      "Gestión de Proyectos de TI",
      "Arquitectura y Diseño de Software",
      "CMMI y Estándares de Calidad",
      "Bases de Datos",
    ],
    icono: "🎓",
  },
  {
    id: "html-css",
    tipo: "Certificación",
    titulo: "HTML & CSS",
    institucion: "Google",
    periodo: "2024 - 2025",
    estado: "Completado",
    detalles: "Fundamentos básicos, intermedio y avanzado.",
    modulos: ["Desarrollo Web", "HTML", "CSS"],
    icono: "👈",
  },
  {
    id: "linux",
    tipo: "Formación",
    titulo: "Infraestructura Linux & Redes",
    institucion: "Autodidacta / Entorno Linux & GNS3",
    periodo: "2022 - Presente",
    estado: "Completado",
    detalles:
      "Simulación y despliegue práctico de arquitectura de redes, enrutamiento MikroTik, administración de servidores Linux y contenedorización con Docker.",
    modulos: [
      "Administración Linux",
      "Simulación de Redes en GNS3",
      "Enrutamiento MikroTik & RouterOS",
      "Despliegue y Virtualización con Docker",
    ],
    icono: "🐧",
  },
];

export default function EducacionInteractive() {
  const [itemSeleccionado, setItemSeleccionado] = useState<ItemEducacion>(
    datosEducacion[0],
  );

  return (
    <div className="bg-[#1c1e1f] border border-[#3c3836] rounded-2xl overflow-hidden shadow-2xl">
      {/* Encabezado Superior de Terminal */}
      <div className="bg-[#282828] border-b border-[#3c3836] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#fb4934] inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#fabd2f] inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#b8bb26] inline-block"></span>
          <span className="ml-3 font-mono text-xs text-[#a89984]">
            victor@arch: ~/academic_records.sh
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#8ec07c] hidden sm:block">
          STATUS: ACTIVE
        </span>
      </div>

      {/* Contenido Split: Menú a la Izquierda + Panel de Detalle a la Derecha */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
        {/* Selector Izquierdo */}
        <div className="md:col-span-5 bg-[#121314]/60 border-b md:border-b-0 md:border-r border-[#3c3836] p-4 space-y-2">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#928374] px-3 py-1">
            // SELECCIONAR REGISTRO
          </p>
          {datosEducacion.map((item) => {
            const estaActivo = itemSeleccionado.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setItemSeleccionado(item)}
                className={`w-full text-left p-3.5 rounded-xl font-mono text-xs transition-all duration-200 flex items-center gap-3 border ${
                  estaActivo
                    ? "bg-[#282828] text-[#fe8019] border-[#fe8019]/60 shadow-lg"
                    : "bg-transparent text-[#a89984] border-transparent hover:bg-[#282828]/50 hover:text-[#ebdbb2]"
                }`}
              >
                <span className="text-lg">{item.icono}</span>
                <div className="overflow-hidden">
                  <span className="block font-bold truncate">
                    {item.titulo}
                  </span>
                  <span className="text-[10px] text-[#928374] block">
                    {item.institucion}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel Estilizado de Detalles */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#1c1e1f]">
          <AnimatePresence mode="wait">
            <motion.div
              key={itemSeleccionado.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Badge + Fechas */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 text-[11px] font-mono font-bold uppercase bg-[#fe8019]/10 text-[#fe8019] border border-[#fe8019]/30 rounded-md">
                  {itemSeleccionado.tipo}
                </span>
                <span className="text-xs font-mono text-[#8ec07c]">
                  [{itemSeleccionado.periodo}]
                </span>
              </div>

              {/* Título e Institución */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#ebdbb2]">
                  {itemSeleccionado.titulo}
                </h3>
                <p className="text-xs font-mono text-[#fe8019] font-semibold">
                  ❯ {itemSeleccionado.institucion}
                </p>
              </div>

              {/* Descripción */}
              <p className="text-sm text-[#a89984] leading-relaxed">
                {itemSeleccionado.detalles}
              </p>

              {/* Tags de Módulos Clave */}
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-mono font-bold text-[#928374] uppercase tracking-wider">
                  // Módulos & Conocimientos Clave:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {itemSeleccionado.modulos.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-[#121314] border border-[#3c3836] rounded-lg text-xs font-mono text-[#ebdbb2]"
                    >
                      <span className="text-[#b8bb26] font-bold">✔</span>
                      <span className="truncate">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer del Inspeccionador */}
          <div className="pt-6 border-t border-[#3c3836] mt-6 flex items-center justify-between text-[11px] font-mono text-[#928374]">
            <span>STATUS: {itemSeleccionado.estado.toUpperCase()}</span>
            <span className="text-[#8ec07c]">OK 200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
