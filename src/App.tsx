import { useEffect, useState } from "react";
import { copy, type Lang } from "./content";
import { extra } from "./extra";
import { Legend, Trace } from "./components/Trace";
import { EvalFlow, ModelShare, Timeline } from "./components/Graphics";
import { Missions } from "./components/Missions";
import { PolicySim } from "./components/PolicySim";
import { Reveal, Segmented } from "./components/ui";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    // stockage indisponible : on retombe sur la langue du navigateur
  }
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function Section({ id, title, lead, tone, children }: { id: string; title: string; lead: string; tone?: "alt"; children: React.ReactNode }) {
  return (
    <section id={id} className={`block ${tone ?? ""}`}>
      <div className="wrap">
        <Reveal>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
        </Reveal>
        <Reveal delay={0.05}>{children}</Reveal>
      </div>
    </section>
  );
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
        <div className="topInner">
          <a href="#top" className="brand">Léandre D.-T.</a>
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
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{t.hero.kicker}</p>
              <h1>{t.hero.title}</h1>
              <p className="sub">{profile.lead}</p>
              <Segmented
                id="profile"
                label="Profil"
                value={profile.id}
                options={t.profiles.map((p) => ({ id: p.id, label: p.label }))}
                onChange={(id) => {
                  setProfileId(id);
                  history.replaceState(null, "", `?p=${id}`);
                }}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="kpis">
                {x.kpis.map((k) => (
                  <li key={k.l}>
                    <strong>{k.v}</strong>
                    <span>{k.l}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <Section id="parcours" title={x.path.title} lead={x.path.lead} tone="alt">
          <Timeline items={x.path.items} />
        </Section>

        <Section id="realisations" title={x.work.title} lead={x.work.lead}>
          <Missions key={profile.id} t={t.missions} list={missions} headline={x.headline} open={x.work.open} close={x.work.close} />
        </Section>

        <Section id="methode" title={x.share.title} lead={x.share.lead} tone="alt">
          <ModelShare missions={missions} labels={t.hero.legend} unit={x.share.unit} />
          <div className="subhead">
            <h3>{x.evalD.title}</h3>
            <p className="lead">{x.evalD.lead}</p>
          </div>
          <EvalFlow t={x.evalD} />
          <div className="subhead">
            <h3>{t.hero.traceTitle}</h3>
          </div>
          <Legend labels={t.hero.legend} />
          <Trace spans={t.spans} hint={t.hero.traceHint} />
        </Section>

        <Section id="os" title={t.os.title} lead={t.os.lead}>
          <ol className="flow">
            {x.flow.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ol>
          <PolicySim t={t.os} calls={t.calls} />
        </Section>

        <section id="contact" className="block alt contact">
          <div className="wrap">
            <Reveal>
              <h2>{t.contact.title}</h2>
              <p className="lead">{t.contact.lead}</p>
              <p className="links">
                <a className="btn" href="mailto:leandredurandterrasson@gmail.com">E-mail</a>
                <a className="btn ghost" href="https://www.linkedin.com/in/leandre-dt">LinkedIn</a>
                <a className="btn ghost" href="https://github.com/Leandredt">GitHub</a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="foot">{t.footer}</footer>
    </>
  );
}
