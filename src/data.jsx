// ============ data ============
const PROFILE = {
  name: "Ralph Ugboko",
  role: "PhD Student, Human-Centered Computing",
  org: "Clemson University",
  location: "Clemson, SC",
  email: "ralphugboko@gmail.com",
  blurb: "I design and study human–AI systems that improve how people think, learn, and make decisions.",
};

const LINKS = {
  github: "https://github.com/ralphug24",
  linkedin: "https://www.linkedin.com/in/ralphugboko/",
  email: "mailto:ralphugboko@gmail.com",
  cv: "assets/Ralph_Ugboko_Resume.pdf",
  photo: "assets/ralph_portrait.jpg",
};

const TOPICS = [
  "Human-AI Interaction", "Large Language Models", "Trust Calibration",
  "Applied AI", "Agentic Systems", "HCI", "Interpretability",
  "Developer Tools", "AI Evaluation", "Product Thinking",
];

const PUBLICATIONS = [
  {
    year: "2024",
    title: "Accessible Autonomous Vehicles as Symbiotic Autonomous Systems for Users with Disabilities: Preliminary Design Guidelines",
    venue: "IEEE Xplore",
    tags: ["AV", "Accessibility", "HCI"],
    url: "https://ieeexplore.ieee.org/abstract/document/10555877/",
  },
  {
    year: "2025",
    title: "Strengthening Security, Privacy, and Trust in Artificial Intelligence Software for Critical Infrastructure in the United States",
    venue: "Working paper",
    tags: ["AI Trust", "Policy"],
    url: "https://www.researchgate.net/profile/Oi-Omotosho/publication/391948684_Strengthening_security_privacy_and_trust_in_artificial_intelligence_software_for_critical_infrastructure_in_the_United_States/links/68361651be1b507dce9227fb/Strengthening-security-privacy-and-trust-in-artificial-intelligence-software-for-critical-infrastructure-in-the-United-States.pdf",
  },
  {
    year: "2025",
    title: "Optimizing Data Pipelines for Real-Time Healthcare Analytics in Distributed Systems: Architectural Strategies, Performance Trade-offs, and Emerging Paradigms",
    venue: "Working paper",
    tags: ["Systems", "Healthcare"],
    url: "https://www.researchgate.net/profile/Oluwafemi-Oloruntoba/publication/393870412_Optimizing_Data_Pipelines_for_Real-Time_Healthcare_Analytics_in_Distributed_Systems_Architectural_Strategies_Performance_Trade-offs_and_Emerging_Paradigms/links/687e5323f312d71d78c89bf2/Optimizing-Data-Pipelines-for-Real-Time-Healthcare-Analytics-in-Distributed-Systems-Architectural-Strategies-Performance-Trade-offs-and-Emerging-Paradigms.pdf",
  },
  {
    year: "2025",
    title: "Explainable Artificial Intelligence in Autonomous Vehicles: Methodologies, Challenges, and Prospective Directions",
    venue: "Working paper",
    tags: ["XAI", "AV"],
    url: "https://www.researchgate.net/profile/Oluwafemi-Oloruntoba/publication/394345124_Explainable_Artificial_Intelligence_in_Autonomous_Vehicles_Methodologies_Challenges_And_Prospective_Directions/links/68937bf78a487c1ea6d8ce52/Explainable-Artificial-Intelligence-in-Autonomous-Vehicles-Methodologies-Challenges-And-Prospective-Directions.pdf",
  },
];

const PROJECTS = [
  {
    title: "Quizzibility",
    status: "Active",
    desc: "AI-driven platform for interactive learning and assessment. I design LLM-based feedback, misconception analysis, and adaptive interaction flows, then study how those features shape user behavior.",
    stack: ["React", "LLMs", "Python", "PostgreSQL"],
    tag: "Applied Research",
  },
  {
    title: "Trust Calibration Probes",
    status: "In progress",
    desc: "Micro-interactions that measure and nudge how much users rely on an AI output — deployed inside decision-support and learning workflows to study over-reliance.",
    stack: ["React", "Anthropic API", "Study infra"],
    tag: "Research",
  },
  {
    title: "Misconception Atlas",
    status: "Prototype",
    desc: "Operator-facing tool that clusters LLM-labeled user errors into navigable misconception maps — designed for instructors but generalizes to any AI-graded domain.",
    stack: ["Clustering", "LLM labeling", "D3"],
    tag: "Tool",
  },
  {
    title: "Agent Scratchpad",
    status: "Side project",
    desc: "A minimal harness for running and inspecting agentic loops — visualizes tool calls, memory, and branch decisions so you can actually debug what the agent is doing.",
    stack: ["TypeScript", "Agents", "Observability"],
    tag: "Tool",
  },
];

const NOTES = [
  { date: "Apr 2026", title: "On over-reliance: when the scaffold becomes the answer", read: "6 min" },
  { date: "Mar 2026", title: "Designing feedback that teaches instead of tells", read: "9 min" },
  { date: "Feb 2026", title: "What I learned shipping LLM features to real users", read: "12 min" },
  { date: "Jan 2026", title: "What 'agentic' actually means to me this year", read: "5 min" },
  { date: "Dec 2025", title: "Three failure modes of AI copilots", read: "8 min" },
];

const EDUCATION = [
  {
    school: "Clemson University",
    location: "Clemson, SC",
    degree: "Ph.D., Human-Centered Computing",
    dates: "Aug 2023 — Aug 2027 (in progress)",
  },
  {
    school: "Clemson University",
    location: "Clemson, SC",
    degree: "M.S., Computer Science",
    dates: "Aug 2023 — Aug 2025",
  },
];

const EXPERIENCE = [
  {
    org: "DRIVE Lab, Clemson University",
    location: "Clemson, SC",
    role: "Research Assistant — Autonomous Vehicle HMI Program (NHTSA, ViPR GVSC)",
    dates: "Aug 2023 — Present",
    bullets: [
      "Re-architected backlogs, sprint cadences, and dependency flows across five partner organizations, accelerating multi-institution delivery timelines by ~30%.",
      "Led stakeholder workshops to define requirements, success metrics, and acceptance criteria, aligning technical constraints with program objectives.",
      "Built KPI dashboards in Tableau and SQL to track adoption, usability, and delivery risk — improving execution visibility by 40%.",
      "Translated user research and behavioral data into prioritized backlog items, reducing prototype rework by 65%.",
      "Standardized delivery documentation and workflows in Jira and Confluence, cutting clarification cycles by 35% and onboarding time by 40%.",
    ],
  },
  {
    org: "KPMG Nigeria",
    location: "Lagos, NG",
    role: "IT Program Manager — Digital Banking Transformation (Zenith Bank Plc)",
    dates: "Oct 2021 — Jun 2023",
    bullets: [
      "Delivered enterprise-scale digital transformation initiatives supporting 8,000+ users, coordinating engineering, operations, vendors, and client leadership.",
      "Translated business needs into prioritized work items and sprint goals using Agile methodologies — improving business/engineering alignment by 50%.",
      "Built executive dashboards in Power BI tracking financial, operational, and delivery KPIs, enabling 15% cost savings through early risk identification.",
      "Supported cloud-enabled platform upgrades and data integrations, improving reporting latency by 60% and strengthening audit readiness.",
      "Defined delivery roadmaps, governance workflows, and risk escalation paths to protect SLA and compliance outcomes.",
    ],
  },
  {
    org: "Intelfort Nig Ltd",
    location: "Lagos, NG",
    role: "Business Intelligence Analyst — Client: NIBSS",
    dates: "Mar 2021 — Oct 2021",
    bullets: [
      "Designed and operated Azure Data Factory ETL pipelines processing high-volume national payment data for real-time monitoring and capacity planning.",
      "Built SQL and Python validation workflows that reduced data quality errors by 45% and shortened reporting cycles by 35%.",
      "Delivered executive-facing dashboards used to guide infrastructure prioritization and operational decisions across national payment systems.",
      "Synthesized complex datasets into clear recommendations for technical and non-technical stakeholders.",
    ],
  },
];

const SKILLS = [
  { group: "Consulting & Delivery", items: ["Requirements gathering", "Stakeholder workshops", "Agile", "Jira", "Confluence", "Roadmap development"] },
  { group: "Data & Analytics", items: ["SQL", "Python", "Power BI", "Tableau", "KPI design", "Analytics storytelling"] },
  { group: "Cloud & Platforms", items: ["Azure Data Factory", "Cloud architectures", "Data pipelines", "Hybrid cloud"] },
  { group: "AI & Systems", items: ["LLM APIs", "AI-assisted workflows", "Metrics-driven experimentation", "Human-centered system design"] },
  { group: "Communication", items: ["Executive presentations", "Technical documentation", "Cross-functional collaboration"] },
];

Object.assign(window, { PROFILE, LINKS, TOPICS, PUBLICATIONS, PROJECTS, NOTES, EDUCATION, EXPERIENCE, SKILLS });
