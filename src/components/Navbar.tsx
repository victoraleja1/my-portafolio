import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const enlaces = [
    { name: "Inicio", href: "#" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Habilidades", href: "#habilidades" },
    { name: "Educación", href: "#educacion" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#121314]/85 border-b border-[#3c3836] px-6 py-4 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo / Monograma Gruvbox */}
        <motion.a
          href="#"
          className="text-xl font-black bg-gradient-to-r from-[#fe8019] to-[#fabd2f] bg-clip-text text-transparent font-mono tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          V.
        </motion.a>

        {/* Menú de Escritorio */}
        <div className="hidden md:flex items-center gap-8">
          {enlaces.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-mono font-medium text-[#a89984] hover:text-[#ebdbb2] transition-colors relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#fe8019] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Botón Móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#a89984] hover:text-[#ebdbb2] focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menú Móvil Desplegable Oscuro */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-[#1c1e1f]/95 border-b border-[#3c3836] px-6 py-6 flex flex-col gap-4 md:hidden backdrop-blur-lg shadow-2xl"
          >
            {enlaces.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-mono font-semibold text-[#a89984] hover:text-[#fe8019] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
