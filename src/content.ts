export type Lang = "fr" | "en";
export type Kind = "det" | "llm" | "human";

export interface Node {
  kind: Kind;
  label: string;
  why: string;
}
export interface Mission {
  id: string;
  tag: string;
  title: string;
  client: string;
  problem: string;
  constraint: string;
  nodes: Node[];
  guardrails: string[];
  result: string;
  stack: string;
  link?: { href: string; label: string };
}
export interface Span {
  name: string;
  kind: Kind;
  start: number;
  dur: number;
  note: string;
}
export interface Call {
  label: string;
  tool: string;
  risk: "read" | "write" | "external" | "destructive";
}

interface Copy {
  nav: { missions: string; os: string; rigor: string; contact: string };
  hero: { kicker: string; title: string; lead: string; cta: string; legend: Record<Kind, string>; traceTitle: string; traceHint: string };
  missions: { title: string; lead: string; labels: { problem: string; constraint: string; pipeline: string; guardrails: string; result: string; stack: string }; ratio: (d: number, l: number, h: number) => string; clickHint: string };
  os: { title: string; lead: string; policy: string; run: string; log: string; empty: string; timeout: string; outcome: Record<"allow" | "approve" | "deny", string>; risk: Record<Call["risk"], string>; levels: Record<"allow" | "approve" | "deny", string> };
  rigor: { title: string; lead: string; rows: { value: string; label: string; note: string }[] };
  contact: { title: string; lead: string; cv: string };
  footer: string;
  missionsList: Mission[];
  spans: Span[];
  calls: Call[];
  profiles: { id: string; label: string; lead: string; order: string[] }[];
}

export const copy: Record<Lang, Copy> = {
  fr: {
    nav: { missions: "Missions", os: "Mon OS d'agents", rigor: "Mesures", contact: "Contact" },
    hero: {
      kicker: "Léandre Durand-Terrasson · Paris",
      title: "Je mets des agents IA là où ils doivent tenir : chez le client, sous contrainte.",
      lead: "Élève-ingénieur Data Science & IA (ESILV). Mon réflexe : décider, étape par étape, ce que le modèle fait et ce que le code garantit.",
      cta: "Voir les missions",
      legend: { det: "Code déterministe", llm: "Modèle appris", human: "Humain dans la boucle" },
      traceTitle: "Une requête, vue de l'intérieur (trace illustrative et simplifiée)",
      traceHint: "Cliquez une étape.",
    },
    missions: {
      title: "Missions",
      lead: "Trois terrains, une même question : qu'est-ce qu'on laisse au modèle ?",
      labels: { problem: "Problème", constraint: "Contrainte", pipeline: "Pipeline", guardrails: "Garde-fous", result: "Résultat", stack: "Pile" },
      ratio: (d, l, h) => `${d} par le code · ${l} par un modèle · ${h} par un humain`,
      clickHint: "Cliquez une étape pour lire le choix.",
    },
    os: {
      title: "Mon OS d'agents",
      lead: "Jarvis OS : un noyau local qui fait agir des agents via MCP, sous gouvernance. Réglez la politique, lancez des actions : voyez ce qui passe, ce qui attend un humain, ce qui est refusé.",
      policy: "Politique par niveau de risque",
      run: "Lancer",
      log: "Journal d'audit",
      empty: "Aucune action lancée.",
      timeout: "Sans réponse sous 300 s, une demande d'approbation est refusée.",
      outcome: { allow: "exécutée, journalisée", approve: "en attente d'un humain", deny: "refusée" },
      risk: { read: "lecture", write: "écriture", external: "externe", destructive: "destructif" },
      levels: { allow: "libre", approve: "approbation", deny: "refus" },
    },
    rigor: {
      title: "Ce que je mesure",
      lead: "Les chiffres des dépôts, avec leur périmètre. Les mauvais aussi.",
      rows: [
        { value: "−40 %", label: "temps de revue de code", note: "Agent CI/CD, projet aéronautique (version publique anonymisée)." },
        { value: "+14 %", label: "rappel sur la fraude", note: "Modèle hybride contre autoencodeur, données déséquilibrées." },
        { value: "81 %", label: "précision", note: "Prédiction d'effets secondaires de médicaments, projet d'équipe." },
        { value: "0,10", label: "MRR, TransE", note: "Graphe de connaissances Jazz (~50 000 triplets). DistMult : 0,08. Publié tel quel." },
      ],
    },
    contact: { title: "Parlons-en", lead: "Je cherche un rôle tourné vers le déploiement d'IA générative chez des clients : Forward Deployed Engineer, AI Solutions Engineer.", cv: "Télécharger le CV" },
    footer: "Fait main, sans traceur.",
    missionsList: [
      {
        id: "eight",
        tag: "Conseil",
        title: "Agent vocal avec avatar et RAG",
        client: "Eight Advisory, équipe Data & IA (stage, été 2026)",
        problem: "Donner à une service line un agent que l'on interroge à la voix, qui répond à la voix et s'appuie sur sa base de connaissances interne.",
        constraint: "Documents clients confidentiels ; des utilisateurs métier qui n'adoptent un outil que s'il s'insère dans leur travail.",
        nodes: [
          { kind: "human", label: "Entretiens utilisateurs", why: "Le besoin est cadré avec la service line avant d'écrire du code." },
          { kind: "llm", label: "Voix → texte", why: "Reconnaissance vocale en entrée." },
          { kind: "det", label: "Recherche RAG", why: "Les réponses s'appuient sur la base interne de la service line, pas sur la mémoire du modèle." },
          { kind: "llm", label: "Agent", why: "Le modèle rédige la réponse à partir des passages retrouvés." },
          { kind: "llm", label: "Texte → voix + avatar", why: "Restitution vocale et avatar, derrière une interface de marque." },
        ],
        guardrails: ["Évaluation indépendante : 2 agents, 7 cas d'usage, 10 exécutions, 3 juges anonymes sur des modèles différents", "Agent de gouvernance : suppression des métadonnées résiduelles avant export PDF", "Pilote sur un groupe test avant déploiement des formations"],
        result: "Environ 10 agents et 15 skills livrés, 3 modules de formation, un agent vocal construit de bout en bout.",
        stack: "Python, FastAPI, Next.js / React, STT / TTS, RAG",
      },
      {
        id: "editorial",
        tag: "Presse de luxe",
        title: "Agent éditorial pour des magazines",
        client: "Rédaction de magazines alpins de luxe",
        problem: "Relire et traduire des articles en appliquant la charte typographique de la rédaction, sans réécrire le style des journalistes.",
        constraint: "Des règles de charte non négociables ; une correctrice qui doit pouvoir accepter ou refuser chaque correction.",
        nodes: [
          { kind: "det", label: "Import PDF / DOCX", why: "L'extraction de texte n'a rien d'une décision de modèle." },
          { kind: "llm", label: "Passe 1 : fond", why: "Orthographe, grammaire, répétitions : le modèle est bon, avec consigne d'intervention minimale." },
          { kind: "llm", label: "Passe 2 : charte", why: "Une seconde passe, avec une charte rédigée dans la langue du texte." },
          { kind: "det", label: "Normalisation", why: "Les règles dures (par exemple le gras réservé aux titres) sont appliquées par le code : le modèle ne peut pas les oublier." },
          { kind: "human", label: "Revue de la correctrice", why: "Chaque correction est expliquée, acceptée ou refusée. Le modèle propose, la rédaction décide." },
        ],
        guardrails: ["Règles dures appliquées par le code, pas par le prompt", "Intervention minimale demandée au modèle", "Journal d'usage et de coûts (tokens) exposé en métriques", "Accès protégé ; déploiement dev → staging, main → production, avec retour arrière"],
        result: "Trois agents (relecture FR, traduction FR→EN, relecture EN), deux modèles comparables dans l'interface. Prévu pour l'hébergement chez le client.",
        stack: "Python, FastAPI, Streamlit, Docker, Caddy, SQLite, Claude, GPT",
      },
      {
        id: "ci",
        tag: "Aéronautique",
        title: "Agent de revue de code en CI/CD",
        client: "Contributeur externe, environnement industriel réglementé",
        problem: "Faire respecter PEP8 et maintenir la documentation sur de grands dépôts Python, sans freiner les développeurs.",
        constraint: "Environnement industriel réglementé : empêcher les hallucinations dans le code poussé ; pouvoir rester en inférence locale.",
        nodes: [
          { kind: "det", label: "Webhook push / MR", why: "L'agent s'invoque seul, invisible tant qu'il n'a rien à dire." },
          { kind: "det", label: "autopep8 + analyse AST", why: "Tout ce qui est corrigeable mécaniquement l'est sans modèle." },
          { kind: "llm", label: "Docstrings", why: "Le modèle ne reçoit que le contexte AST utile et ne génère que la documentation manquante." },
          { kind: "det", label: "Repli strict", why: "Architecture sans état, avec repli si la sortie du modèle est inexploitable." },
          { kind: "human", label: "Revue ou commit", why: "L'agent pousse un commit ou poste une revue : le développeur garde la main." },
        ],
        guardrails: ["Déterministe d'abord, modèle ensuite", "Architecture sans état avec repli strict", "Routage du modèle : inférence locale (Ollama) ou API selon la sensibilité"],
        result: "Environ 40 % de temps de revue manuelle en moins. Dépôt public : version anonymisée du projet industriel.",
        stack: "Python, FastAPI, Git APIs, Ollama, Mistral / Llama 3, GitLab / GitHub CI",
        link: { href: "https://github.com/Leandredt/AgentIASafranTech", label: "Dépôt public (anonymisé)" },
      },
      {
        id: "fraud",
        tag: "Recherche",
        title: "Détection de fraude bancaire",
        client: "Hanyang University, Séoul (échange)",
        problem: "Détecter des transactions frauduleuses dans un jeu de données de cartes bancaires très déséquilibré.",
        constraint: "Données fortement déséquilibrées : l'exactitude brute est un mauvais indicateur.",
        nodes: [
          { kind: "det", label: "Prétraitement + SMOTE", why: "Rééquilibrage et séparation des données avant tout apprentissage." },
          { kind: "llm", label: "Autoencodeur / hybride", why: "Réseaux de neurones : détection d'anomalies sans étiquettes, puis modèle hybride." },
          { kind: "det", label: "Comparaison à XGBoost", why: "Un modèle supervisé classique sert de référence honnête." },
          { kind: "human", label: "Lecture des métriques", why: "ROC-AUC, précision-rappel : choisir selon le coût d'une fraude manquée." },
        ],
        guardrails: ["Métriques adaptées au déséquilibre (rappel, précision-rappel)", "Référence supervisée pour ne pas surestimer l'approche non supervisée"],
        result: "+14 % de rappel avec le modèle hybride, par rapport aux autoencodeurs seuls.",
        stack: "Python, PyTorch, scikit-learn, XGBoost, SMOTE",
        link: { href: "https://github.com/Leandredt/ML_Project_HYU", label: "Dépôt" },
      },
    ],
    spans: [
      { name: "ingest", kind: "det", start: 0, dur: 12, note: "Extraction du texte du PDF. Aucun modèle." },
      { name: "retrieve", kind: "det", start: 12, dur: 18, note: "Charte et règles de la rédaction chargées pour la langue du texte." },
      { name: "draft", kind: "llm", start: 30, dur: 40, note: "Le modèle corrige le fond avec consigne d'intervention minimale." },
      { name: "verify", kind: "det", start: 70, dur: 10, note: "Le code applique les règles dures. Une sortie qui les viole est corrigée ici." },
      { name: "review", kind: "human", start: 80, dur: 20, note: "La correctrice accepte ou refuse chaque correction." },
    ],
    calls: [
      { label: "Lire un fichier du Bureau", tool: "read_file", risk: "read" },
      { label: "Enregistrer une note", tool: "write_file", risk: "write" },
      { label: "Piloter une application (AppleScript)", tool: "run_applescript", risk: "external" },
      { label: "Supprimer un dossier", tool: "delete_path", risk: "destructive" },
      { label: "Oublier un souvenir", tool: "memory_forget", risk: "destructive" },
    ],
    profiles: [
      { id: "conseil", label: "Conseil & ESN", lead: "Cadrer, prototyper en quelques semaines, mesurer, faire adopter : l'IA générative au plus près des équipes métier.", order: ["eight", "editorial", "ci", "fraud"] },
      { id: "finance", label: "Banque & assurance", lead: "Des agents que l'on peut auditer : évaluation indépendante, garde-fous dans le code, humain dans la boucle.", order: ["eight", "ci", "fraud", "editorial"] },
      { id: "industrie", label: "Industrie, mobilité & défense", lead: "Déterministe d'abord, modèle ensuite, repli strict, inférence locale possible : l'IA là où l'erreur coûte cher.", order: ["ci", "eight", "fraud", "editorial"] },
    ],
  },
  en: {
    nav: { missions: "Missions", os: "My agent OS", rigor: "Metrics", contact: "Contact" },
    hero: {
      kicker: "Léandre Durand-Terrasson · Paris",
      title: "I put AI agents where they have to hold up: on the client's side, under constraints.",
      lead: "Data Science & AI engineering student (ESILV). My habit: decide, step by step, what the model does and what the code guarantees.",
      cta: "See the missions",
      legend: { det: "Deterministic code", llm: "Learned model", human: "Human in the loop" },
      traceTitle: "One request, seen from the inside (illustrative, simplified trace)",
      traceHint: "Click a step.",
    },
    missions: {
      title: "Missions",
      lead: "Three settings, one question: what do we leave to the model?",
      labels: { problem: "Problem", constraint: "Constraint", pipeline: "Pipeline", guardrails: "Guardrails", result: "Result", stack: "Stack" },
      ratio: (d, l, h) => `${d} by code · ${l} by a model · ${h} by a human`,
      clickHint: "Click a step to read the reasoning.",
    },
    os: {
      title: "My agent OS",
      lead: "Jarvis OS: a local kernel that runs agents through MCP, under governance. Set the policy, run actions: see what goes through, what waits for a human, what is refused.",
      policy: "Policy per risk level",
      run: "Run",
      log: "Audit log",
      empty: "No action run yet.",
      timeout: "With no answer within 300 s, an approval request is refused.",
      outcome: { allow: "executed, logged", approve: "waiting for a human", deny: "refused" },
      risk: { read: "read", write: "write", external: "external", destructive: "destructive" },
      levels: { allow: "free", approve: "approval", deny: "deny" },
    },
    rigor: {
      title: "What I measure",
      lead: "Figures from the repositories, with their scope. The poor ones too.",
      rows: [
        { value: "−40%", label: "code review time", note: "CI/CD agent, aerospace project (anonymised public version)." },
        { value: "+14%", label: "recall on fraud", note: "Hybrid model versus autoencoder, imbalanced data." },
        { value: "81%", label: "accuracy", note: "Drug side-effect prediction, team project." },
        { value: "0.10", label: "MRR, TransE", note: "Jazz knowledge graph (~50,000 triples). DistMult: 0.08. Published as is." },
      ],
    },
    contact: { title: "Let's talk", lead: "I am looking for a role focused on deploying generative AI at clients: Forward Deployed Engineer, AI Solutions Engineer.", cv: "Download the CV" },
    footer: "Handmade, no trackers.",
    missionsList: [
      {
        id: "eight",
        tag: "Consulting",
        title: "Voice agent with avatar and RAG",
        client: "Eight Advisory, Data & AI team (internship, summer 2026)",
        problem: "Give a service line an agent it can talk to, that answers by voice and relies on the line's internal knowledge base.",
        constraint: "Confidential client documents; business users who only adopt a tool that fits into their work.",
        nodes: [
          { kind: "human", label: "User interviews", why: "The need is scoped with the service line before any code is written." },
          { kind: "llm", label: "Speech → text", why: "Speech recognition on the way in." },
          { kind: "det", label: "RAG retrieval", why: "Answers rely on the service line's internal base, not on the model's memory." },
          { kind: "llm", label: "Agent", why: "The model writes the answer from the retrieved passages." },
          { kind: "llm", label: "Text → speech + avatar", why: "Spoken output and avatar, behind a branded interface." },
        ],
        guardrails: ["Independent evaluation: 2 agents, 7 use cases, 10 runs, 3 anonymous judges on different models", "Governance agent: removes residual metadata before PDF export", "Pilot on a test group before rolling out the training modules"],
        result: "About 10 agents and 15 skills delivered, 3 training modules, one voice agent built end to end.",
        stack: "Python, FastAPI, Next.js / React, STT / TTS, RAG",
      },
      {
        id: "editorial",
        tag: "Luxury press",
        title: "Editorial agent for magazines",
        client: "Editorial team of luxury alpine magazines",
        problem: "Proofread and translate articles while applying the newsroom's typographic charter, without rewriting the journalists' style.",
        constraint: "Non-negotiable charter rules; a proofreader who must be able to accept or reject every correction.",
        nodes: [
          { kind: "det", label: "PDF / DOCX import", why: "Text extraction is not a model decision." },
          { kind: "llm", label: "Pass 1: substance", why: "Spelling, grammar, repetitions: the model is good at it, with a minimal-intervention instruction." },
          { kind: "llm", label: "Pass 2: charter", why: "A second pass, with a charter written in the language of the text." },
          { kind: "det", label: "Normalisation", why: "Hard rules (for instance bold reserved for headlines) are applied by code: the model cannot forget them." },
          { kind: "human", label: "Proofreader review", why: "Each correction is explained, accepted or rejected. The model proposes, the newsroom decides." },
        ],
        guardrails: ["Hard rules enforced by code, not by the prompt", "Minimal intervention requested from the model", "Usage and cost journal (tokens) exposed as metrics", "Password-protected; dev → staging, main → production, with rollback"],
        result: "Three agents (FR proofreading, FR→EN translation, EN proofreading), two models selectable in the interface. Intended for hosting on the client's side.",
        stack: "Python, FastAPI, Streamlit, Docker, Caddy, SQLite, Claude, GPT",
      },
      {
        id: "ci",
        tag: "Aerospace",
        title: "Code review agent in CI/CD",
        client: "External contributor, regulated industrial environment",
        problem: "Enforce PEP8 and keep documentation up to date across large Python repositories, without slowing developers down.",
        constraint: "Regulated industrial environment: prevent hallucinations in pushed code; be able to stay on local inference.",
        nodes: [
          { kind: "det", label: "Push / MR webhook", why: "The agent triggers itself, invisible until it has something to say." },
          { kind: "det", label: "autopep8 + AST analysis", why: "Anything that can be fixed mechanically is, without a model." },
          { kind: "llm", label: "Docstrings", why: "The model only receives the relevant AST context and only writes the missing documentation." },
          { kind: "det", label: "Strict fallback", why: "Stateless architecture, with a fallback when the model output is unusable." },
          { kind: "human", label: "Review or commit", why: "The agent pushes a commit or posts a review: the developer stays in control." },
        ],
        guardrails: ["Deterministic first, model second", "Stateless architecture with strict fallback", "Model routing: local inference (Ollama) or API depending on sensitivity"],
        result: "About 40% less manual review time. The public repository is an anonymised version of the industrial project.",
        stack: "Python, FastAPI, Git APIs, Ollama, Mistral / Llama 3, GitLab / GitHub CI",
        link: { href: "https://github.com/Leandredt/AgentIASafranTech", label: "Public repository (anonymised)" },
      },
      {
        id: "fraud",
        tag: "Research",
        title: "Credit card fraud detection",
        client: "Hanyang University, Seoul (exchange)",
        problem: "Detect fraudulent transactions in a very imbalanced credit card dataset.",
        constraint: "Heavily imbalanced data: raw accuracy is a poor indicator.",
        nodes: [
          { kind: "det", label: "Preprocessing + SMOTE", why: "Rebalancing and data splitting before any training." },
          { kind: "llm", label: "Autoencoder / hybrid", why: "Neural models: label-free anomaly detection, then a hybrid model." },
          { kind: "det", label: "XGBoost baseline", why: "A classic supervised model serves as an honest reference." },
          { kind: "human", label: "Reading the metrics", why: "ROC-AUC, precision-recall: choose according to the cost of a missed fraud." },
        ],
        guardrails: ["Metrics suited to imbalance (recall, precision-recall)", "Supervised baseline so the unsupervised approach is not overrated"],
        result: "+14% recall with the hybrid model compared to autoencoders alone.",
        stack: "Python, PyTorch, scikit-learn, XGBoost, SMOTE",
        link: { href: "https://github.com/Leandredt/ML_Project_HYU", label: "Repository" },
      },
    ],
    spans: [
      { name: "ingest", kind: "det", start: 0, dur: 12, note: "Text extraction from the PDF. No model." },
      { name: "retrieve", kind: "det", start: 12, dur: 18, note: "Newsroom charter and rules loaded for the language of the text." },
      { name: "draft", kind: "llm", start: 30, dur: 40, note: "The model fixes the substance with a minimal-intervention instruction." },
      { name: "verify", kind: "det", start: 70, dur: 10, note: "Code applies the hard rules. An output that breaks them is fixed here." },
      { name: "review", kind: "human", start: 80, dur: 20, note: "The proofreader accepts or rejects each correction." },
    ],
    calls: [
      { label: "Read a file on the Desktop", tool: "read_file", risk: "read" },
      { label: "Save a note", tool: "write_file", risk: "write" },
      { label: "Drive an application (AppleScript)", tool: "run_applescript", risk: "external" },
      { label: "Delete a folder", tool: "delete_path", risk: "destructive" },
      { label: "Forget a memory", tool: "memory_forget", risk: "destructive" },
    ],
    profiles: [
      { id: "conseil", label: "Consulting", lead: "Scope, prototype within weeks, measure, drive adoption: generative AI close to the business teams.", order: ["eight", "editorial", "ci", "fraud"] },
      { id: "finance", label: "Banking & insurance", lead: "Agents you can audit: independent evaluation, guardrails in code, human in the loop.", order: ["eight", "ci", "fraud", "editorial"] },
      { id: "industrie", label: "Industry, mobility & defence", lead: "Deterministic first, model second, strict fallback, local inference possible: AI where an error is costly.", order: ["ci", "eight", "fraud", "editorial"] },
    ],
  },
};
