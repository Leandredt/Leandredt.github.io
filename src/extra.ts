import type { Lang } from "./content";

export interface Extra {
  nav: { path: string; work: string; method: string; os: string; contact: string };
  kpis: { v: string; l: string }[];
  headline: Record<string, { v: string; l: string }>;
  path: { title: string; lead: string; items: { when: string; what: string; where: string; kind: "school" | "work" | "research" }[]; kinds: Record<string, string> };
  work: { title: string; lead: string; open: string; close: string };
  share: { title: string; lead: string; unit: string };
  evalD: {
    title: string;
    lead: string;
    steps: { n: string; l: string; d: string }[];
    principlesTitle: string;
    principles: { t: string; d: string }[];
  };
  trace: { title: string; caption: string };
  jarvis: {
    title: string;
    lead: string;
    facts: { v: string; l: string }[];
    levels: { name: string; example: string; free: boolean; verdict: string }[];
    note: string;
  };
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
      lead: "Un agent ne se juge pas sur un bel exemple. Voici le protocole utilisé chez Eight Advisory, puis les réflexes que j'applique partout.",
      steps: [
        { n: "7", l: "cas réels", d: "issus du travail quotidien, pas d'exemples choisis" },
        { n: "10", l: "exécutions par cas", d: "un agent est irrégulier : on mesure la variance" },
        { n: "3", l: "juges à l'aveugle", d: "des modèles différents, sans savoir quel agent a répondu" },
        { n: "1", l: "classement", d: "reproductible, donc défendable devant les équipes" },
      ],
      principlesTitle: "Les mêmes réflexes sur tous mes projets",
      principles: [
        { t: "Le code vérifie ce qui peut l'être", d: "Format, règles de charte, repli : jamais confiés au modèle." },
        { t: "Une référence simple d'abord", d: "Un modèle classique (XGBoost) avant de conclure sur un réseau de neurones." },
        { t: "La métrique suit le coût de l'erreur", d: "Le rappel plutôt que l'exactitude quand une fraude manquée coûte cher." },
        { t: "L'humain tranche", d: "Chaque correction est relue ; les coûts et les tokens sont suivis." },
      ],
    },
    trace: { title: "Le trajet d'une correction", caption: "Exemple simplifié de l'agent éditorial. Durées indicatives." },
    jarvis: {
      title: "Jarvis OS",
      lead: "Mon système d'agents personnel : un noyau local qui fait agir des agents via MCP. Chaque action est classée par risque ; les plus sensibles attendent mon accord.",
      facts: [
        { v: "7", l: "agents" },
        { v: "4", l: "niveaux de risque" },
        { v: "1", l: "arrêt d'urgence" },
      ],
      levels: [
        { name: "Lecture", example: "Lire un fichier", free: true, verdict: "Libre, journalisée" },
        { name: "Écriture", example: "Enregistrer une note", free: true, verdict: "Libre, journalisée" },
        { name: "Externe", example: "Piloter une application", free: false, verdict: "Mon accord" },
        { name: "Destructif", example: "Supprimer un dossier", free: false, verdict: "Mon accord" },
      ],
      note: "Sans réponse en 300 secondes, la demande est refusée. Tout est consigné dans un journal d'audit.",
    },
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
      lead: "An agent is not judged on one nice example. Here is the protocol used at Eight Advisory, then the habits I apply everywhere.",
      steps: [
        { n: "7", l: "real use cases", d: "from daily work, not hand-picked examples" },
        { n: "10", l: "runs per case", d: "agents are inconsistent: we measure variance" },
        { n: "3", l: "blind judges", d: "different models, never told which agent answered" },
        { n: "1", l: "ranking", d: "reproducible, hence defensible in front of the teams" },
      ],
      principlesTitle: "The same habits on every project",
      principles: [
        { t: "Code checks what can be checked", d: "Format, style rules, fallback: never left to the model." },
        { t: "A simple baseline first", d: "A classic model (XGBoost) before concluding about a neural network." },
        { t: "The metric follows the cost of error", d: "Recall rather than accuracy when a missed fraud is expensive." },
        { t: "The human decides", d: "Every correction is reviewed; costs and tokens are tracked." },
      ],
    },
    trace: { title: "How one correction travels", caption: "Simplified example from the editorial agent. Durations are indicative." },
    jarvis: {
      title: "Jarvis OS",
      lead: "My personal agent system: a local kernel that runs agents through MCP. Every action is ranked by risk; the most sensitive ones wait for my approval.",
      facts: [
        { v: "7", l: "agents" },
        { v: "4", l: "risk levels" },
        { v: "1", l: "kill switch" },
      ],
      levels: [
        { name: "Read", example: "Read a file", free: true, verdict: "Free, logged" },
        { name: "Write", example: "Save a note", free: true, verdict: "Free, logged" },
        { name: "External", example: "Drive an application", free: false, verdict: "My approval" },
        { name: "Destructive", example: "Delete a folder", free: false, verdict: "My approval" },
      ],
      note: "With no answer within 300 seconds, the request is refused. Everything is recorded in an audit log.",
    },
  },
};
