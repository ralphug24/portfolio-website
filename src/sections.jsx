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
              <span>Agentic AI · AI Technical Program Management · Clemson</span>
            </div>
            <h1 className="hero-title reveal" data-delay="1">
              Agentic AI programs<br />
              built for trust and<br />
              execution <span className="serif">at scale.</span>
            </h1>
            <p className="hero-lede reveal" data-delay="2">
              I&rsquo;m <strong>Ralph</strong> — an AI technical program manager and
              human-centered AI researcher who turns ambiguous opportunities into
              usable systems, clear roadmaps, and measurable outcomes. I work across
              agentic AI, LLM evaluation, enterprise data, and product execution.
            </p>
            <div className="hero-actions reveal" data-delay="3">
              <a href="#projects" className="btn btn-primary" onClick={(e) => go(e, "projects")}>
                See projects <Icon name="arrow" />
              </a>
              <a href={LINKS.cv} target="_self" rel="noreferrer" className="btn">
                <Icon name="download" /> Download CV
              </a>
              <a href={LINKS.email} className="btn btn-secondary">
                Let&rsquo;s connect <Icon name="mail" width="14" height="14" />
              </a>
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="hero-proof reveal" data-delay="3">
          <div className="hero-proof-label">What I bring to an AI team</div>
          <div className="hero-proof-grid">
            {VALUE_PROPS.map((v) => <div className="proof-card" key={v.label}><strong>{v.label}</strong><span>{v.text}</span></div>)}
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
              I&rsquo;m an <strong>Agentic AI and Human-Centered Computing researcher</strong> at
              Clemson University focused on building and operationalizing AI-enabled
              systems, enterprise applications, and data/reporting platforms.
            </p>
            <p>
              My work sits at the intersection of <strong>AI systems, product execution,
                enterprise technology, and human-computer interaction</strong>. I translate
              ambiguous stakeholder needs into requirements, workflows, dashboards,
              architecture recommendations, and execution-ready solutions.
            </p>
            <p>
              Currently, I work on <strong>Quizzibility</strong>, an AI-powered platform
              for interactive learning and assessment. I design LLM-powered submission
              analysis, misconception clustering, condition-based feature gating, and
              human-centered interaction improvements while studying how these systems
              influence user behavior.
            </p>
            <blockquote>
              The value of AI is not just in what it can do, but in how it changes
              what people do.
            </blockquote>
            <p>
              I&rsquo;m interested in AI/ML technical program management, AI product
              operations, LLM evaluation, AI systems, and enterprise AI automation —
              especially where technical depth, human-centered thinking, and disciplined
              execution matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, idx, onOpen }) {
  const ref = useR(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", (e.clientX - r.left) + "px");
    ref.current.style.setProperty("--my", (e.clientY - r.top) + "px");
  };
  return (
    <article ref={ref} className="project reveal project-clickable" data-delay={Math.min(idx, 3)} onMouseMove={onMove} onClick={() => onOpen(p)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(p); } }} tabIndex="0" role="button" aria-label={`Read case study: ${p.title}`}>
      <div className="project-head">
        <span>{p.tag}</span>
        <span className="project-status"><span className="now-ping" />{p.status}</span>
      </div>
      <div className="project-org">{p.org}</div>
      <h3 className="project-title">{p.title}</h3>
      <div className="project-role">{p.role}</div>
      <p className="project-desc">{p.desc}</p>
      {p.detail.impacts && <div className="project-proof-strip">{p.detail.impacts.map(i => <span key={i}>{i}</span>)}</div>}
      {p.capabilities && <div className="project-capabilities">{p.capabilities.map(c => <span key={c}>{c}</span>)}</div>}
      <div className="project-stack">
        {p.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}
      </div>
      <span className="project-open">Read case study <Icon name="arrow" width="13" height="13" /></span>
    </article>
  );
}

function ProjectDetail({ p, onBack }) {
  return (
    <article className="case-study reveal">
      <button className="case-back" onClick={onBack}><Icon name="arrow" width="13" height="13" /> Back to projects</button>
      <div className="case-kicker">{p.tag} · {p.status}</div>
      <h3 className="case-title">{p.title}</h3>
      <p className="case-lede">{p.desc}</p>
      <div className="case-meta-grid">
        <div><span>Organization</span><strong>{p.detail.organization}</strong></div>
        <div><span>Role</span><strong>{p.detail.role}</strong></div>
        <div><span>Duration</span><strong>{p.detail.duration}</strong></div>
        <div><span>Scope</span><strong>{p.scope}</strong></div>
      </div>
      {p.detail.impacts && <div className="case-impact-strip">{p.detail.impacts.map(i => <strong key={i}>{i}</strong>)}</div>}
      <div className="case-section case-wide"><span className="case-label">Executive summary</span><p>{p.detail.contribution}</p></div>
      <div className="case-grid">
        {[['problem','challenge'], ['what I owned','contribution'], ['approach','approach'], ['outcome','outcome'], ['takeaway','takeaway']].map(([label, key]) => (
          <div className="case-section" key={key}>
            <span className="case-label">{label}</span>
            <p>{p.detail[key]}</p>
          </div>
        ))}
      </div>
      {p.detail.workflow && <CaseFlow title="Workflow" items={p.detail.workflow} />}
      {p.detail.architecture && <CaseFlow title="Public-safe architecture" items={p.detail.architecture} />}
      {p.detail.decisions && <div className="case-section case-wide"><span className="case-label">Key technical decisions</span><ul className="case-list">{p.detail.decisions.map(d => <li key={d}>{d}</li>)}</ul></div>}
      {p.detail.demonstrates && <div className="case-section case-wide"><span className="case-label">What this demonstrates</span><div className="case-capabilities">{p.detail.demonstrates.map(d => <span key={d}>{d}</span>)}</div></div>}
      <div className="project-stack">{p.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}</div>
    </article>
  );
}

function CaseFlow({ title, items }) {
  return <div className="case-flow"><span className="case-label">{title}</span><div className="flow-track">{items.map((item, i) => <React.Fragment key={item}><div className="flow-node">{item}</div>{i < items.length - 1 && <span className="flow-arrow">↓</span>}</React.Fragment>)}</div></div>;
}

function ProjectGroup({ title, sub, projects, onOpen, featured, compact }) {
  return (
    <div className={`project-group ${featured ? "project-group-featured" : ""} ${compact ? "project-group-compact" : ""}`}>
      <div className="project-group-head"><h3>{title}</h3><span>{sub}</span></div>
      <div className="projects-grid">{projects.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} onOpen={onOpen} />)}</div>
    </div>
  );
}

function Projects() {
  const [selected, setSelected] = useS(null);
  const featured = PROJECTS.filter(p => p.featured);
  const research = PROJECTS.filter(p => !p.planned && !p.featured);
  const portfolio = PROJECTS.filter(p => p.planned);
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead num="02" title="Projects" sub="/ things I'm building" />
        {selected ? <ProjectDetail p={selected} onBack={() => setSelected(null)} /> : <>
          <p className="section-intro">Selected work and portfolio builds for Agentic AI, technical program management, human-centered AI, and enterprise data roles. Open a card to read the case study.</p>
          <ProjectGroup title="Featured professional work" sub="Evidence from the field" projects={featured} onOpen={setSelected} featured />
          <ProjectGroup title="Research & human-centered systems" sub="Selected systems work" projects={research} onOpen={setSelected} compact />
          <ProjectGroup title="Portfolio builds" sub="Planned / in development" projects={portfolio} onOpen={setSelected} />
        </>}
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
- Human-Centered Computing PhD researcher at Clemson University (2023 - 2027) with an M.S. in Computer Science (2023 - 2025).
- Based in Clemson, SC.
- Research and practice focus: AI-enabled systems, enterprise applications, data/reporting platforms, human-centered AI, and LLM evaluation.
- Current project: Quizzibility, an AI-powered platform for interactive learning and assessment (LLM submission analysis, misconception clustering, feature gating, and usability analysis).
- Professional experience includes AI systems development at Clemson, PMIS and enterprise reporting work at DC Water, digital banking and payments transformation at KPMG Nigeria, and business intelligence at INTELFORT Nigeria.
- Core skills: technical program management, requirements gathering, SQL, Python, Power BI, Tableau, REST APIs, Oracle Primavera Unifier, Oracle Integration Cloud, LLM APIs, React, TypeScript, and PostgreSQL.
- Technical interests: agentic systems, enterprise AI automation, AI copilots, developer tools, decision support, and trustworthy human-AI interaction.
- Career interests: AI/ML Technical Program Manager, AI Product Operations, LLM Evaluation, AI Systems, and Enterprise AI Automation.
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
  const [selected, setSelected] = useS(null);
  return (
    <section className="section" id="blog">
      <div className="container">
        <SectionHead num="04" title="Blog" sub="Notes from the work" />
        {!selected ? <div className="writing-list">
          {BLOG_POSTS.map((n, i) => (
            <article key={n.title} className="note note-clickable reveal" data-delay={Math.min(i, 3)} onClick={() => setSelected(n)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(n); } }} tabIndex="0" role="button">
              <span className="note-date">{n.date}</span>
              <span><span className="note-title">{n.title}</span><span className="note-excerpt">{n.intro}</span></span>
              <span className="note-read">{n.read} <Icon name="arrow" width="12" height="12" /></span>
            </article>
          ))}
        </div> : <article className="case-study reveal blog-detail">
          <button className="case-back" onClick={() => setSelected(null)}><Icon name="arrow" width="13" height="13" /> Back to write-ups</button>
          <div className="case-kicker">{selected.date} · {selected.read}</div>
          <h3 className="case-title">{selected.title}</h3>
          <p className="case-role">{selected.intro}</p>
          <div className="case-grid">{selected.sections.map((s) => <div className="case-section" key={s.label}><span className="case-label">{s.label}</span><p>{s.text}</p></div>)}</div>
        </article>}
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
            Agentic AI and human-centered computing researcher with experience leading
            technical programs, AI-enabled product work, enterprise data initiatives,
            and applied research. I translate ambiguous needs into structured
            requirements, architecture recommendations, dashboards, and execution-ready
            roadmaps.
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
