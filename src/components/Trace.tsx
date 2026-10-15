import { useState } from "react";
import type { Kind, Span } from "../content";

export function Legend({ labels }: { labels: Record<Kind, string> }) {
  return (
    <ul className="legend" aria-label="Légende">
      {(Object.keys(labels) as Kind[]).map((k) => (
        <li key={k}>
          <i className={`dot ${k}`} /> {labels[k]}
        </li>
      ))}
    </ul>
  );
}

/** Trace façon outil d'observabilité : une barre par étape, la nature de l'étape donne la couleur. */
export function Trace({ spans, hint }: { spans: Span[]; hint: string }) {
  const [open, setOpen] = useState(2);
  const current = spans[open];
  return (
    <div className="trace">
      <ol>
        {spans.map((s, i) => (
          <li key={s.name}>
            <button className={i === open ? "on" : ""} onClick={() => setOpen(i)} aria-pressed={i === open}>
              <code>{s.name}</code>
              <span className="track">
                <span className={`bar ${s.kind}`} style={{ left: `${s.start}%`, width: `${s.dur}%`, animationDelay: `${i * 140}ms` }} />
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="note" aria-live="polite">
        <i className={`dot ${current.kind}`} /> <code>{current.name}</code> — {current.note}
      </p>
      <p className="hint">{hint}</p>
    </div>
  );
}
