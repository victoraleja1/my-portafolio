import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface Props {
  final: number;
  sufijo?: string;
  duracion?: number; // en milisegundos
}

export default function ContadorAnimado({
  final,
  sufijo = "+",
  duracion = 1200,
}: Props) {
  const [cuenta, setCuenta] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let inicio = 0;
      const incremento = final / (duracion / 16); // ~60fps

      const timer = setInterval(() => {
        inicio += incremento;
        if (inicio >= final) {
          setCuenta(final);
          clearInterval(timer);
        } else {
          setCuenta(Math.floor(inicio));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, final, duracion]);

  return (
    <span ref={ref}>
      {cuenta}
      {sufijo}
    </span>
  );
}
