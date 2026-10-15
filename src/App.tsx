import { useEffect, useState } from "react";
import { copy, type Lang } from "./content";
import { extra } from "./extra";
import { Legend, Trace } from "./components/Trace";
import { EvalDiagram, ModelShare, Timeline } from "./components/Graphics";
import { Missions } from "./components/Missions";
import { PolicySim } from "./components/PolicySim";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    // stockage indisponible : on retombe sur la langue du navigateur
  }
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = copy[lang];
  const x = extra[lang];
  const [profileId, setProfileId] = useState(() => new URLSearchParams(location.search).get("p") ?? "conseil");
  const profile = t.profiles.find((p) => p.id === profileId) ?? t.profiles[0];
  const missions = profile.order.map((id) => t.missionsList.find((m) => m.id === id)!);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // sans effet : la langue n'est simplement pas mémorisée
    }
  }, [lang]);

  return (
    <>
      <header className="topbar">
        <a href="#top" className="brand">LDT</a>
        <nav aria-label="Navigation">
          <a href="#parcours">{x.nav.path}</a>
          <a href="#realisations">{x.nav.work}</a>
          <a href="#methode">{x.nav.method}</a>
          <a href="#os">{x.nav.os}</a>
          <a href="#contact">{x.nav.contact}</a>
          <button className="lang" onClick={() => setLang(lang === "fr" ? "en" : "fr")} aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}>
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <p className="kicker">{t.hero.kicker}</p>
          <h1>{t.hero.title}</h1>
          <p className="lead">{profile.lead}</p>
          <div className="profiles" role="group" aria-label="Profil">
            {t.profiles.map((p) => (
              <button
                key={p.id}
                aria-pressed={p.id === profile.id}
                onClick={() => {
                  setProfileId(p.id);
                  history.replaceState(null, "", `?p=${p.id}`);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <ul className="kpis">
            {x.kpis.map((k) => (
              <li key={k.l}>
                <strong>{k.v}</strong>
                <span>{k.l}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="parcours" className="wrap">
          <h2>{x.path.title}</h2>
          <p className="lead">{x.path.lead}</p>
          <Timeline items={x.path.items} kinds={x.path.kinds} />
        </section>

        <section id="realisations" className="wrap">
          <h2>{x.work.title}</h2>
          <p className="lead">{x.work.lead}</p>
          <Missions key={profile.id} t={t.missions} list={missions} headline={x.headline} open={x.work.open} close={x.work.close} />
        </section>

        <section id="methode" className="wrap">
          <h2>{x.share.title}</h2>
          <p className="lead">{x.share.lead}</p>
          <ModelShare missions={missions} labels={t.hero.legend} unit={x.share.unit} />
          <div className="split">
            <div>
              <h2>{x.evalD.title}</h2>
              <p className="lead">{x.evalD.lead}</p>
              <EvalDiagram t={x.evalD} />
            </div>
            <div>
              <h2 className="small">{t.hero.traceTitle}</h2>
              <Legend labels={t.hero.legend} />
              <Trace spans={t.spans} hint={t.hero.traceHint} />
            </div>
          </div>
        </section>

        <section id="os" className="wrap">
          <h2>{t.os.title}</h2>
          <p className="lead">{t.os.lead}</p>
          <ol className="flow">
            {x.flow.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ol>
          <PolicySim t={t.os} calls={t.calls} />
        </section>

        <section id="contact" className="wrap contact">
          <h2>{t.contact.title}</h2>
          <p className="lead">{t.contact.lead}</p>
          <p className="links">
            <a href="mailto:leandredurandterrasson@gmail.com">leandredurandterrasson@gmail.com</a>
            <a href="https://www.linkedin.com/in/leandre-dt">LinkedIn</a>
            <a href="https://github.com/Leandredt">GitHub</a>
          </p>
        </section>
      </main>
      <footer className="wrap foot">{t.footer}</footer>
    </>
  );
}
