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

/** Frise du parcours. */
export function Timeline({ items, kinds }: { items: Extra["path"]["items"]; kinds: Record<string, string> }) {
  return (
    <>
      <ul className="legend">
        {Object.entries(kinds).map(([k, v]) => (
          <li key={k}>
            <i className={`dot ${k}`} /> {v}
          </li>
        ))}
      </ul>
      <ol className="timeline">
        {items.map((it) => (
          <li key={it.when + it.what} className={it.kind}>
            <span className="when">{it.when}</span>
            <i className={`pin ${it.kind}`} />
            <b>{it.what}</b>
            <small>{it.where}</small>
          </li>
        ))}
      </ol>
    </>
  );
}

/** Protocole d'évaluation : orchestrateur → deux agents → trois juges → classement. */
export function EvalDiagram({ t }: { t: Extra["evalD"] }) {
  const box = (x: number, y: number, w: number, label: string, cls: string, sub?: string) => (
    <g key={label + x}>
      <rect x={x} y={y} width={w} height={sub ? 54 : 44} rx={10} className={`svgBox ${cls}`} />
      <text x={x + w / 2} y={y + (sub ? 24 : 27)} textAnchor="middle" className="svgT">{label}</text>
      {sub && <text x={x + w / 2} y={y + 42} textAnchor="middle" className="svgS">{sub}</text>}
    </g>
  );
  const line = (x1: number, y1: number, x2: number, y2: number) => <path key={`${x1}${y1}${x2}${y2}`} d={`M${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`} className="svgLine" />;
  return (
    <svg viewBox="0 0 760 250" role="img" aria-label={t.title} className="evalSvg">
      {line(150, 125, 230, 60)}
      {line(150, 125, 230, 190)}
      {[40, 125, 210].map((y) => [line(350, 60, 470, y + 22), line(350, 190, 470, y + 22)])}
      {[40, 125, 210].map((y) => line(590, y + 22, 650, 125))}
      {box(20, 98, 130, t.orch, "det", `${t.cases} · ${t.runs}`)}
      {box(230, 33, 120, t.a, "llm")}
      {box(230, 163, 120, t.b, "llm")}
      {[40, 125, 210].map((y, i) => box(470, y, 120, `J${i + 1}`, "llm", t.models))}
      {box(650, 103, 100, t.rank, "det")}
      <text x={530} y={20} textAnchor="middle" className="svgS">{t.judges}</text>
    </svg>
  );
}
