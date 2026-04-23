// ============ Sections ============
const { useEffect: useEff, useRef: useR, useState: useS, useCallback: useCB } = React;

function Home({ navigate }) {
  const go = (e, id) => { e.preventDefault(); navigate(id); };
  return (
    <header className="hero home" id="top">
      <div className="container">
        <div className="home-grid">
          <div>
            <div className="hero-eyebrow reveal">
              <span className="dot" />
              <span>PhD · Human-Centered Computing · Clemson</span>
            </div>
            <h1 className="hero-title reveal" data-delay="1">
              Designing <span className="serif">human–AI</span><br/>
              systems that make<br/>
              people think <span className="serif">better.</span>
            </h1>
            <p className="hero-lede reveal" data-delay="2">
              I&rsquo;m <strong>Ralph</strong> — a researcher and builder working at the
              intersection of AI, HCI, and system design. I build and study LLM-powered
              tools that support reasoning, learning, and decision-making, without
              quietly replacing the thinking they&rsquo;re meant to help.
            </p>
            <div className="hero-actions reveal" data-delay="3">
              <a href="#projects" className="btn btn-primary" onClick={(e) => go(e, "projects")}>
                See projects <Icon name="arrow" />
              </a>
              <a href={LINKS.cv} target="_self" rel="noreferrer" className="btn">
                <Icon name="download" /> Download CV
              </a>
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="topics reveal" data-delay="4">
          <div className="topics-track">
            {[...TOPICS, ...TOPICS].map((t, i) => (
              <span key={i} className="topics-item">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function SocialIcons() {
  const items = [
    { href: LINKS.email, label: "Email", icon: "mail", external: false },
    { href: LINKS.linkedin, label: "LinkedIn", icon: "linkedin", external: true },
    { href: LINKS.github, label: "GitHub", icon: "github", external: true },
  ];
  return (
    <div className="social-icons">
      {items.map(i => (
        <a
          key={i.label}
          href={i.href}
          target={i.external ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="icon-btn"
          aria-label={i.label}
          title={i.label}
        >
          <Icon name={i.icon} width="16" height="16" />
        </a>
      ))}
    </div>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead num="01" title="About" sub="/ whoami" />
        <div className="about">
          <div className="about-photo reveal">
            <img src={LINKS.photo} alt="Ralph Ugboko" loading="lazy" />
            <div className="about-photo-meta">
              <span className="now-ping" /> Clemson, SC
            </div>
          </div>
          <div className="prose reveal" data-delay="1">
            <p>
              I&rsquo;m a PhD student in <strong>Human-Centered Computing</strong> at
              Clemson University, where I focus on building and studying AI-powered
              systems that shape how people think, learn, and make decisions.
            </p>
            <p>
              My work sits at the intersection of <strong>AI, human-computer
              interaction, and system design</strong>. I&rsquo;m particularly interested
              in how large language models can be integrated into real-world tools in
              ways that support deeper understanding rather than shortcutting it.
            </p>
            <p>
              Currently, I work on <strong>Quizzibility</strong>, an AI-driven platform
              for interactive learning and assessment. Through this work, I design and
              implement features such as LLM-based feedback, misconception analysis,
              and adaptive interaction flows, while studying how these systems
              influence user behavior.
            </p>
            <blockquote>
              The value of AI is not just in what it can do, but in how it changes
              what people do.
            </blockquote>
            <p>
              More broadly, I&rsquo;m interested in building human–AI systems that
              improve reasoning, not replace it — with applications that extend beyond
              education into <strong>developer tools, productivity systems, and AI
              copilots</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, idx }) {
  const ref = useR(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", (e.clientX - r.left) + "px");
    ref.current.style.setProperty("--my", (e.clientY - r.top) + "px");
  };
  return (
    <article ref={ref} className="project reveal" data-delay={Math.min(idx, 3)} onMouseMove={onMove}>
      <div className="project-head">
        <span>{p.tag}</span>
        <span className="project-status"><span className="now-ping" />{p.status}</span>
      </div>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-desc">{p.desc}</p>
      <div className="project-stack">
        {p.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead num="02" title="Projects" sub="/ things I'm building" />
        <div className="projects-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function Publications() {
  return (
    <section className="section" id="publications">
      <div className="container">
        <SectionHead num="03" title="Publications" sub={`${PUBLICATIONS.length} selected`} />
        <div className="research-list">
          {PUBLICATIONS.map((p, i) => (
            <article key={i} className="pub reveal" data-delay={Math.min(i, 3)}>
              <div className="pub-year">{p.year}</div>
              <div>
                <h3 className="pub-title">
                  <a href={p.url} target="_blank" rel="noreferrer">{p.title}</a>
                </h3>
                <span className="pub-venue">{p.venue}</span>
              </div>
              <div className="pub-tags">
                {p.tags.map(t => <span key={t} className="pub-tag">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AskRalph() {
  const [q, setQ] = useS("");
  const [a, setA] = useS("");
  const [loading, setLoading] = useS(false);

  const ask = async (question) => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setA("");
    try {
      const ctx = `You are a friendly assistant embedded in Ralph Ugboko's personal portfolio site.
Answer questions about Ralph based ONLY on the bio below. If asked something outside it, say so and suggest contacting him.
Keep answers to 2-4 sentences. Conversational, third-person about Ralph.

BIO:
- PhD student, Human-Centered Computing at Clemson University (Aug 2023 - Aug 2027). Also M.S. Computer Science (2023-2025).
- Based in Clemson, SC.
- Research area: human-AI systems powered by LLMs; intersection of AI, HCI, and system design.
- Current project: Quizzibility, an AI-driven platform for interactive learning and assessment (LLM feedback, misconception analysis, adaptive interaction flows).
- 4+ years professional experience before PhD: Research Assistant at DRIVE Lab Clemson (AV HMI program, NHTSA/ViPR GVSC), IT Program Manager at KPMG Nigeria on Zenith Bank digital banking transformation (8000+ users), Business Intelligence Analyst at Intelfort (client NIBSS, Azure Data Factory pipelines).
- Core skills: requirements gathering, Agile delivery, SQL, Python, Power BI, Tableau, Azure, LLM APIs, React, analytics storytelling.
- Research questions: how AI systems can support learning/reasoning without encouraging over-reliance; interaction designs for deeper understanding; making AI outputs interpretable.
- Broader interests: AI copilots, developer tools, agentic systems, productivity, decision support, AI evaluation, trust calibration.
- Career interests: Business Transformation Consulting, AI Product Engineer/PM, Applied AI/LLM Engineer, Applied Scientist, Human-AI Interaction Researcher. Long-term: exploring his own products/startup in agentic AI.
- Eligible for CPT, no sponsorship required.
- Philosophy: "The value of AI is not just in what it can do, but in how it changes what people do."

QUESTION: ${question}`;
      const resp = await window.claude.complete(ctx);
      setA(resp);
    } catch (e) {
      setA("Hmm, couldn't reach the model right now. Try again, or just email Ralph directly.");
    } finally {
      setLoading(false);
    }
  };

  const chips = [
    "What does Ralph work on?",
    "What roles is he open to?",
    "What's Quizzibility?",
    "What's his industry experience?",
  ];

  return (
    <div className="ask reveal">
      <div className="ask-head">
        <h3 className="ask-title">Ask this site anything about Ralph</h3>
        <span className="ask-sub">powered by Claude · live</span>
      </div>
      <form className="ask-form" onSubmit={(e) => { e.preventDefault(); ask(q); }}>
        <input
          className="ask-input"
          type="text"
          placeholder="e.g. What kinds of AI systems does Ralph build?"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="ask-send" disabled={loading || !q.trim()}>
          {loading ? "Thinking…" : <>Send <Icon name="send" width="12" height="12" /></>}
        </button>
      </form>
      <div className="ask-suggest">
        {chips.map(c => (
          <button key={c} className="ask-chip" onClick={() => { setQ(c); ask(c); }}>{c}</button>
        ))}
      </div>
      {(a || loading) && (
        <div className="ask-answer">
          <span className="label">Response</span>
          {a}
          {loading && <span className="ask-caret" />}
        </div>
      )}
    </div>
  );
}

function Blog() {
  return (
    <section className="section" id="blog">
      <div className="container">
        <SectionHead num="04" title="Blog" sub="Notes from the work" />
        <div className="writing-list">
          {NOTES.map((n, i) => (
            <a key={i} href="#blog" className="note reveal" data-delay={Math.min(i, 3)} onClick={e => e.preventDefault()} title="Coming soon">
              <span className="note-date">{n.date}</span>
              <span className="note-title">{n.title}</span>
              <span className="note-read">{n.read}</span>
            </a>
          ))}
        </div>
        <AskRalph />
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="section" id="resume">
      <div className="container">
        <SectionHead num="05" title="Resume" sub="/ cv · snapshot" />
        <div className="resume-top reveal">
          <p className="resume-intro">
            PhD researcher with 4+ years driving business transformation through data,
            analytics, and technology delivery across banking, enterprise platforms,
            and applied research. I translate ambiguous needs into structured
            requirements, analytics-driven recommendations, and execution-ready roadmaps.
          </p>
          <a href={LINKS.cv} target="_self" rel="noreferrer" className="btn btn-primary">
            <Icon name="download" /> Download full CV
          </a>
        </div>

        <div className="resume-block reveal">
          <h3 className="resume-h">Education</h3>
          <div className="resume-list">
            {EDUCATION.map((e, i) => (
              <div key={i} className="resume-row">
                <div className="resume-col-dates">{e.dates}</div>
                <div>
                  <div className="resume-row-title">{e.degree}</div>
                  <div className="resume-row-sub">{e.school} · {e.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resume-block reveal">
          <h3 className="resume-h">Experience</h3>
          <div className="resume-list">
            {EXPERIENCE.map((x, i) => (
              <div key={i} className="resume-row resume-exp">
                <div className="resume-col-dates">{x.dates}</div>
                <div>
                  <div className="resume-row-title">{x.role}</div>
                  <div className="resume-row-sub">{x.org} · {x.location}</div>
                  <ul className="resume-bullets">
                    {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resume-block reveal">
          <h3 className="resume-h">Core skills</h3>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <div key={i} className="skills-col">
                <div className="skills-label">{s.group}</div>
                <div className="skills-tags">
                  {s.items.map(it => <span key={it} className="stack-tag">{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-final">
      <div className="container">
        <div className="footer-bottom">
          <span>© 2026 Ralph Ugboko</span>
          <span>Built with care · open to collaborators</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Home, About, Publications, Projects, Blog, Resume, Footer, SocialIcons });
