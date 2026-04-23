// ============ shared UI bits ============
const { useEffect, useRef, useState, useCallback } = React;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(e => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  });
}

function Icon({ name, ...props }) {
  const paths = {
    sun: <g><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>,
    arrow: <path d="M7 17 17 7M7 7h10v10"/>,
    download: <g><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></g>,
    send: <path d="m3 11 18-8-8 18-2-8-8-2Z"/>,
    github: <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8 0-.7.4-1.1.7-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>,
    scholar: <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm0 13L5 12v4l7 4 7-4v-4l-7 4Z"/>,
    linkedin: <g><path d="M4 4h4v4H4zM4 10h4v10H4zM10 10h4v1.5c.7-1 1.9-1.8 3.5-1.8 2.8 0 4.5 1.8 4.5 5V20h-4v-5c0-1.4-.6-2-1.8-2s-2.2.8-2.2 2.3V20h-4V10Z"/></g>,
    mail: <g><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></g>,
    external: <g><path d="M7 17 17 7"/><path d="M8 7h9v9"/></g>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {paths[name]}
    </svg>
  );
}

function Nav({ theme, setTheme, active, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", n: "00", label: "Home" },
    { id: "about", n: "01", label: "About" },
    { id: "projects", n: "02", label: "Projects" },
    { id: "publications", n: "03", label: "Publications" },
    { id: "blog", n: "04", label: "Blog" },
    { id: "resume", n: "05", label: "Resume" },
  ];

  const go = (e, id) => { e.preventDefault(); navigate(id); };

  return (
    <nav className="nav" data-scrolled={scrolled}>
      <div className="nav-inner">
        <a href="#home" className="nav-brand" onClick={(e) => go(e, "home")}>
          <span className="nav-dot" />
          <span>Ralph Ugboko</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className="nav-link" data-active={active === l.id} onClick={(e) => go(e, l.id)}>
              <span className="n">{l.n}</span>{l.label}
            </a>
          ))}
        </div>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          <Icon name={theme === "dark" ? "sun" : "moon"} width="16" height="16" />
        </button>
      </div>
    </nav>
  );
}

function SectionHead({ num, title, sub }) {
  return (
    <div className="section-head reveal">
      <div className="section-num">§{num}</div>
      <h2 className="section-title">{title}</h2>
      {sub && <div className="section-sub">{sub}</div>}
    </div>
  );
}

Object.assign(window, { useReveal, Icon, Nav, SectionHead });
