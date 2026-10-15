import type { Lang } from "./content";

export interface Extra {
  nav: { path: string; work: string; method: string; os: string; contact: string };
  kpis: { v: string; l: string }[];
  headline: Record<string, { v: string; l: string }>;
  path: { title: string; lead: string; items: { when: string; what: string; where: string; kind: "school" | "work" | "research" }[]; kinds: Record<string, string> };
  work: { title: string; lead: string; open: string; close: string };
  share: { title: string; lead: string; unit: string };
  evalD: { title: string; lead: string; orch: string; a: string; b: string; judges: string; models: string; rank: string; cases: string; runs: string };
  flow: string[];
}

export const extra: Record<Lang, Extra> = {
  fr: {
    nav: { path: "Parcours", work: "Réalisations", method: "Méthode", os: "Jarvis OS", contact: "Contact" },
    kpis: [
      { v: "~10 · ~15", l: "agents et skills livrés (Eight Advisory)" },
      { v: "−40 %", l: "temps de revue de code (CI/CD)" },
      { v: "7 × 10 × 3", l: "cas · exécutions · juges d'évaluation" },
      { v: "+14 %", l: "rappel sur la fraude" },
    ],
    headline: {
      eight: { v: "~10 · ~15", l: "agents · skills" },
      editorial: { v: "3", l: "agents éditoriaux" },
      ci: { v: "−40 %", l: "temps de revue" },
      fraud: { v: "+14 %", l: "rappel" },
    },
    path: {
      title: "Parcours",
      lead: "De la prépa aux agents déployés : l'ordre dans lequel les choses se sont passées.",
      kinds: { school: "Formation", work: "Mission", research: "Recherche" },
      items: [
        { when: "2022 – 2024", what: "Classes préparatoires", where: "Lycée du Parc, Lyon", kind: "school" },
        { when: "2024 – 2027", what: "Cycle ingénieur Data Science & IA", where: "ESILV, Paris – La Défense", kind: "school" },
        { when: "Févr. – juil. 2025", what: "Détection de fraude", where: "Hanyang University, Séoul", kind: "research" },
        { when: "Sept. 2025 – janv. 2026", what: "Agent de revue de code", where: "Safran (contributeur externe)", kind: "work" },
        { when: "2025 – 2026", what: "Agent éditorial", where: "Magazines de luxe", kind: "work" },
        { when: "Été 2026", what: "Agent vocal, évaluation, formation", where: "Eight Advisory", kind: "work" },
      ],
    },
    work: { title: "Réalisations", lead: "Quatre projets. Cliquez pour ouvrir le détail : problème, pipeline, garde-fous.", open: "Voir le détail", close: "Fermer" },
    share: { title: "Où j'utilise un modèle", lead: "Pour chaque projet : nombre d'étapes garanties par le code, confiées à un modèle, ou validées par un humain.", unit: "étapes" },
    evalD: {
      title: "Comment j'évalue un agent",
      lead: "Protocole mis en place chez Eight Advisory pour comparer deux agents sans se fier à un seul avis.",
      orch: "Orchestrateur",
      a: "Agent A",
      b: "Agent B",
      judges: "3 juges anonymes",
      models: "modèles différents",
      rank: "Classement",
      cases: "7 cas d'usage",
      runs: "10 exécutions chacun",
    },
    flow: ["Agent", "Politique de risque", "Outil MCP", "Journal d'audit"],
  },
  en: {
    nav: { path: "Path", work: "Work", method: "Method", os: "Jarvis OS", contact: "Contact" },
    kpis: [
      { v: "~10 · ~15", l: "agents and skills delivered (Eight Advisory)" },
      { v: "−40%", l: "code review time (CI/CD)" },
      { v: "7 × 10 × 3", l: "use cases · runs · evaluation judges" },
      { v: "+14%", l: "recall on fraud" },
    ],
    headline: {
      eight: { v: "~10 · ~15", l: "agents · skills" },
      editorial: { v: "3", l: "editorial agents" },
      ci: { v: "−40%", l: "review time" },
      fraud: { v: "+14%", l: "recall" },
    },
    path: {
      title: "Path",
      lead: "From preparatory classes to deployed agents, in the order it happened.",
      kinds: { school: "Education", work: "Mission", research: "Research" },
      items: [
        { when: "2022 – 2024", what: "Preparatory classes", where: "Lycée du Parc, Lyon", kind: "school" },
        { when: "2024 – 2027", what: "Engineering degree, Data Science & AI", where: "ESILV, Paris – La Défense", kind: "school" },
        { when: "Feb. – Jul. 2025", what: "Fraud detection", where: "Hanyang University, Seoul", kind: "research" },
        { when: "Sep. 2025 – Jan. 2026", what: "Code review agent", where: "Safran (external contributor)", kind: "work" },
        { when: "2025 – 2026", what: "Editorial agent", where: "Luxury magazines", kind: "work" },
        { when: "Summer 2026", what: "Voice agent, evaluation, training", where: "Eight Advisory", kind: "work" },
      ],
    },
    work: { title: "Work", lead: "Four projects. Click to open the detail: problem, pipeline, guardrails.", open: "See detail", close: "Close" },
    share: { title: "Where I use a model", lead: "For each project: number of steps guaranteed by code, left to a model, or signed off by a human.", unit: "steps" },
    evalD: {
      title: "How I evaluate an agent",
      lead: "Protocol set up at Eight Advisory to compare two agents without trusting a single opinion.",
      orch: "Orchestrator",
      a: "Agent A",
      b: "Agent B",
      judges: "3 anonymous judges",
      models: "different models",
      rank: "Ranking",
      cases: "7 use cases",
      runs: "10 runs each",
    },
    flow: ["Agent", "Risk policy", "MCP tool", "Audit log"],
  },
};
