import { useState } from "react";
import type { Call } from "../content";

type Decision = "allow" | "approve" | "deny";
type Risk = Call["risk"];
interface Labels {
  policy: string;
  run: string;
  log: string;
  empty: string;
  timeout: string;
  outcome: Record<Decision, string>;
  risk: Record<Risk, string>;
  levels: Record<Decision, string>;
}

// Réglage par défaut de Jarvis OS (policies.yaml)
const DEFAULT: Record<Risk, Decision> = { read: "allow", write: "allow", external: "approve", destructive: "approve" };
const RISKS: Risk[] = ["read", "write", "external", "destructive"];

export function PolicySim({ t, calls }: { t: Labels; calls: Call[] }) {
  const [policy, setPolicy] = useState(DEFAULT);
  const [log, setLog] = useState<{ n: number; tool: string; risk: Risk; decision: Decision }[]>([]);

  const run = (c: Call) => setLog((l) => [{ n: l.length + 1, tool: c.tool, risk: c.risk, decision: policy[c.risk] }, ...l].slice(0, 6));

  return (
    <div className="sim">
      <fieldset>
        <legend>{t.policy}</legend>
        {RISKS.map((r) => (
          <div key={r} className="rule">
            <span className={`risk ${r}`}>{t.risk[r]}</span>
            <div role="group" aria-label={t.risk[r]}>
              {(["allow", "approve", "deny"] as Decision[]).map((d) => (
                <button key={d} className={policy[r] === d ? "on" : ""} aria-pressed={policy[r] === d} onClick={() => setPolicy({ ...policy, [r]: d })}>
                  {t.levels[d]}
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="hint">{t.timeout}</p>
      </fieldset>

      <ul className="calls">
        {calls.map((c) => (
          <li key={c.tool}>
            <span>
              {c.label}
              <code>{c.tool}</code>
            </span>
            <span className={`risk ${c.risk}`}>{t.risk[c.risk]}</span>
            <span className={`verdict ${policy[c.risk]}`}>{t.outcome[policy[c.risk]]}</span>
            <button onClick={() => run(c)}>{t.run}</button>
          </li>
        ))}
      </ul>

      <div className="log" aria-live="polite">
        <h3>{t.log}</h3>
        {log.length === 0 ? (
          <p className="hint">{t.empty}</p>
        ) : (
          <ol>
            {log.map((e) => (
              <li key={e.n}>
                <code>#{e.n}</code> {e.tool} <span className={`risk ${e.risk}`}>{t.risk[e.risk]}</span> → <b className={e.decision}>{t.outcome[e.decision]}</b>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
