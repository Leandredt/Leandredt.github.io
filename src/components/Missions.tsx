import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Mission } from "../content";
import { spring } from "./ui";

interface Labels {
  labels: { problem: string; constraint: string; pipeline: string; guardrails: string; result: string; stack: string };
  ratio: (d: number, l: number, h: number) => string;
  clickHint: string;
}

function Detail({ m, t }: { m: Mission; t: Labels }) {
  const [step, setStep] = useState(0);
  const count = (k: string) => m.nodes.filter((n) => n.kind === k).length;
  const node = m.nodes[step];
  return (
    <div className="detail">
      <dl className="facts">
        <div>
          <dt>{t.labels.problem}</dt>
          <dd>{m.problem}</dd>
        </div>
        <div>
          <dt>{t.labels.constraint}</dt>
          <dd>{m.constraint}</dd>
        </div>
      </dl>
      <h4>{t.labels.pipeline}</h4>
      <ol className="pipe">
        {m.nodes.map((n, i) => (
          <li key={n.label}>
            <button className={`${n.kind} ${i === step ? "on" : ""}`} onClick={() => setStep(i)} aria-pressed={i === step}>
              {n.label}
            </button>
          </li>
        ))}
      </ol>
      <p className="note" aria-live="polite">
        <i className={`dot ${node.kind}`} /> {node.why}
      </p>
      <p className="hint">
        {t.ratio(count("det"), count("llm"), count("human"))}. {t.clickHint}
      </p>
      <div className="two">
        <div>
          <h4>{t.labels.guardrails}</h4>
          <ul>
            {m.guardrails.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t.labels.result}</h4>
          <p>{m.result}</p>
          <p className="stack">
            <b>{t.labels.stack} :</b> {m.stack}
          </p>
          {m.link && (
            <a href={m.link.href} className="ext">
              {m.link.label} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Cartes d'un coup d'œil. Un clic déploie la carte en feuille : elle part de sa place (même identité
 * de mise en page) et y retourne à la fermeture, avec un ressort sans rebond.
 */
export function Missions({ t, list, headline, open, close }: { t: Labels; list: Mission[]; headline: Record<string, { v: string; l: string }>; open: string; close: string }) {
  const [id, setId] = useState<string | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const current = list.find((m) => m.id === id) ?? null;

  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setId(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger.current?.focus();
    };
  }, [id]);

  return (
    <>
      <div className="cards">
        {list.map((m) => {
          const h = headline[m.id];
          return (
            <motion.article
              key={m.id}
              layoutId={`card-${m.id}`}
              transition={spring}
              className="mcard"
              style={{ borderRadius: 28 }}
              tabIndex={0}
              role="button"
              aria-label={`${m.title} — ${open}`}
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setId(m.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  trigger.current = e.currentTarget;
                  setId(m.id);
                }
              }}
            >
              <small className="tag">{m.tag}</small>
              <h3>{m.title}</h3>
              <p className="client">{m.client}</p>
              <div className="big">
                <strong>{h.v}</strong>
                <span>{h.l}</span>
              </div>
              <div className="mini" aria-hidden="true">
                {m.nodes.map((n) => (
                  <span key={n.label} className={`seg ${n.kind}`} />
                ))}
              </div>
              <p className="problem">{m.problem}</p>
              <span className="more">{open} ›</span>
            </motion.article>
          );
        })}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div className="scrim" key="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setId(null)}>
            <motion.div
              layoutId={`card-${current.id}`}
              transition={spring}
              className="sheet"
              style={{ borderRadius: 28 }}
              role="dialog"
              aria-modal="true"
              aria-label={current.title}
              onClick={(e) => e.stopPropagation()}
            >
              <button ref={closeBtn} className="closeBtn" onClick={() => setId(null)} aria-label={close}>
                ×
              </button>
              <small className="tag">{current.tag}</small>
              <h3>{current.title}</h3>
              <p className="client">{current.client}</p>
              <div className="big">
                <strong>{headline[current.id].v}</strong>
                <span>{headline[current.id].l}</span>
              </div>
              <Detail m={current} t={t} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
