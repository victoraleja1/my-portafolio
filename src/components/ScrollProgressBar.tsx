import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const calcularScroll = () => {
      const scrollTotal =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const actual = (window.scrollY / scrollTotal) * 100;
        setProgreso(actual);
      }
    };

    window.addEventListener("scroll", calcularScroll);
    calcularScroll(); // Cálculo inicial

    return () => window.removeEventListener("scroll", calcularScroll);
  }, []);

  return (
    /* Carril de fondo zinc oscuro */
    <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900/90 z-[9999] pointer-events-none">
      {/* Barra de progreso neón */}
      <div
        className="h-full bg-gradient-to-r from-zinc-500 via-zinc-200 to-white transition-all duration-75 ease-out rounded-r-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        style={{ width: `${progreso}%` }}
      />
    </div>
  );
}
