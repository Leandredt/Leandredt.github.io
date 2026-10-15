import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Ressort critique (sans rebond) : réglage par défaut des interfaces fluides.
export const spring = { type: "spring", bounce: 0, duration: 0.45 } as const;
// Léger rebond, réservé aux gestes qui portent de l'élan.
export const springBouncy = { type: "spring", bounce: 0.2, duration: 0.5 } as const;

/** Apparition au défilement : fondu et léger glissement ; simple fondu si le mouvement est réduit. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={reduce ? { duration: 0.2 } : { ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Contrôle segmenté : la pastille suit la sélection par un ressort. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  id,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  id: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} aria-pressed={o.id === value} onClick={() => onChange(o.id)}>
          {o.id === value && <motion.span layoutId={`thumb-${id}`} className="thumb" transition={spring} />}
          <span className="segLabel">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
