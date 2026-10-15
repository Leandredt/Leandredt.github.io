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

/** Protocole d'évaluation en colonnes : s'empile verticalement sur téléphone. */
export function EvalFlow({ t }: { t: Extra["evalD"] }) {
  return (
    <div className="evalFlow" role="img" aria-label={t.title}>
      <div className="col">
        <div className="node det">
          <b>{t.orch}</b>
          <small>{t.cases}<br />{t.runs}</small>
        </div>
      </div>
      <div className="col">
        <div className="node llm"><b>{t.a}</b></div>
        <div className="node llm"><b>{t.b}</b></div>
      </div>
      <div className="col">
        {[1, 2, 3].map((n) => (
          <div className="node llm" key={n}>
            <b>J{n}</b>
            <small>{t.models}</small>
          </div>
        ))}
      </div>
      <div className="col">
        <div className="node det"><b>{t.rank}</b></div>
      </div>
      <p className="evalCap">{t.judges}</p>
    </div>
  );
}
