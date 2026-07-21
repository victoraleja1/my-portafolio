import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusBadge() {
  const [desplegado, setDesplegado] = useState(false);

  return (
    // Se cambió 'hidden md:block' por un posicionamiento que se ajusta a móvil y escritorio
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-5 sm:left-5 z-40">
      <motion.div
        layout
        onClick={() => setDesplegado(!desplegado)}
        className="bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-md p-2.5 rounded-2xl shadow-2xl cursor-pointer hover:border-zinc-700 transition-all select-none group w-full sm:max-w-xs"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Indicador de Estado / Avatar Mini */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse absolute -top-0.5 -right-0.5 z-10 border border-zinc-950"></span>
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-bold text-xs text-blue-400 group-hover:scale-105 transition-transform">
                VA
              </div>
            </div>

            {/* Información Principal */}
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white font-mono">
                  Victor Alejá
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  GT 🇬🇹
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <span>●</span> Disponible
              </p>
            </div>
          </div>

          <span className="text-xs text-zinc-500 font-mono pl-1">
            {desplegado ? "✕" : "ℹ"}
          </span>
        </div>

        {/* Panel Desplegable sutil */}
        <AnimatePresence>
          {desplegado && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-3 mt-3 border-t border-zinc-800/60 font-mono text-xs space-y-2 overflow-hidden"
            >
              <div className="flex justify-between text-zinc-400">
                <span>Rol:</span>
                <span className="text-zinc-200 font-semibold">Dev</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Ubicación:</span>
                <span className="text-zinc-200">Quetzaltenango</span>
              </div>

              <a
                href="#contacto"
                className="block w-full text-center py-2 mt-2 bg-blue-600/20 border border-blue-500/40 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold"
              >
                Contactar ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
