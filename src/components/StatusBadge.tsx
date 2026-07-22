import { motion } from "framer-motion";

export default function StatusBadge() {
  return (
    <motion.a
      /* 👇 Ruta de tu PDF en la carpeta public/ */
      href="/my-portafolio/cv.pdf"
      download="CV_Victor_Aleja.pdf"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      /* 📍 Cambiado de right-6 / right-8 a left-6 / left-8 */
      className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#282828] border border-[#3c3836] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#fe8019] hover:bg-[#32302f] transition-colors group cursor-pointer"
    >
      <div className="flex items-center justify-center p-1.5 bg-[#121314] rounded-full group-hover:bg-[#fe8019]/10 transition-colors">
        {/* Ícono de Descarga */}
        <svg
          className="w-4 h-4 text-[#8ec07c] group-hover:text-[#fe8019] transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </div>

      <span className="text-sm font-bold font-mono text-[#ebdbb2] group-hover:text-[#fe8019] transition-colors tracking-wide">
        Descargar CV
      </span>
    </motion.a>
  );
}
