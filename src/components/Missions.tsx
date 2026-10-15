import { useState } from "react";
import type { Mission } from "../content";

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

/** Cartes visibles d'un coup d'œil ; le détail s'ouvre à la demande. */
export function Missions({ t, list, headline, open, close }: { t: Labels; list: Mission[]; headline: Record<string, { v: string; l: string }>; open: string; close: string }) {
  const [id, setId] = useState<string | null>(null);
  return (
    <div className="cards">
      {list.map((m) => {
        const h = headline[m.id];
        const isOpen = id === m.id;
        return (
          <article key={m.id} className={`mcard ${isOpen ? "open" : ""}`}>
            <header>
              <small className="tag">{m.tag}</small>
              <h3>{m.title}</h3>
              <p className="client">{m.client}</p>
            </header>
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
            <p className="stack">{m.stack}</p>
            <button className="more" aria-expanded={isOpen} onClick={() => setId(isOpen ? null : m.id)}>
              {isOpen ? close : open} {isOpen ? "↑" : "↓"}
            </button>
            {isOpen && <Detail m={m} t={t} />}
          </article>
        );
      })}
    </div>
  );
}
