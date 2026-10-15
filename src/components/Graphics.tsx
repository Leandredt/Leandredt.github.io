import type { Kind, Mission } from "../content";
import type { Extra } from "../extra";

const KINDS: Kind[] = ["det", "llm", "human"];

/** Barres empilées : la répartition code / modèle / humain de chaque pipeline. */
export function ModelShare({ missions, labels, unit }: { missions: Mission[]; labels: Record<Kind, string>; unit: string }) {
  return (
    <div className="share">
      <ul className="legend">
        {KINDS.map((k) => (
          <li key={k}>
            <i className={`dot ${k}`} /> {labels[k]}
          </li>
        ))}
      </ul>
      {missions.map((m) => {
        const n = (k: Kind) => m.nodes.filter((x) => x.kind === k).length;
        return (
          <div className="shareRow" key={m.id}>
            <span className="shareName">{m.title}</span>
            <div className="shareBar" role="img" aria-label={KINDS.map((k) => `${n(k)} ${labels[k]}`).join(", ")}>
              {KINDS.map((k) => n(k) > 0 && (
                <span key={k} className={`seg ${k}`} style={{ flex: n(k) }}>
                  {n(k)}
                </span>
              ))}
            </div>
            <span className="shareN">{m.nodes.length} {unit}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Frise du parcours : points sobres, le dernier jalon en accent. */
export function Timeline({ items }: { items: Extra["path"]["items"] }) {
  return (
    <ol className="timeline">
      {items.map((it, i) => (
        <li key={it.when + it.what} className={i === items.length - 1 ? "last" : ""}>
          <span className="when">{it.when}</span>
          <i className="pin" />
          <b>{it.what}</b>
          <small>{it.where}</small>
        </li>
      ))}
    </ol>
  );
}

/** Protocole d'évaluation en quatre chiffres, puis les réflexes communs à tous les projets. */
export function EvalSteps({ t }: { t: Extra["evalD"] }) {
  return (
    <>
      <ol className="evalSteps">
        {t.steps.map((s) => (
          <li key={s.l}>
            <strong>{s.n}</strong>
            <b>{s.l}</b>
            <span>{s.d}</span>
          </li>
        ))}
      </ol>
      <h4 className="principlesTitle">{t.principlesTitle}</h4>
      <ul className="principles">
        {t.principles.map((p) => (
          <li key={p.t}>
            <b>{p.t}</b>
            <span>{p.d}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Jarvis OS en un coup d'œil : l'escalade du risque et ce qui se passe à chaque niveau. */
export function Jarvis({ t }: { t: Extra["jarvis"] }) {
  return (
    <div className="jarvis">
      <ul className="jfacts">
        {t.facts.map((f) => (
          <li key={f.l}>
            <strong>{f.v}</strong>
            <span>{f.l}</span>
          </li>
        ))}
      </ul>
      <ol className="ladder">
        {t.levels.map((l, i) => (
          <li key={l.name}>
            <span className="meter" aria-hidden="true">
              {t.levels.map((_, k) => (
                <i key={k} className={k <= i ? (l.free ? "on" : "on hot") : ""} />
              ))}
            </span>
            <span className="lname">{l.name}</span>
            <span className="lex">{l.example}</span>
            <span className={`verdictPill ${l.free ? "free" : "human"}`}>{l.verdict}</span>
          </li>
        ))}
      </ol>
      <p className="hint">{t.note}</p>
    </div>
  );
}
