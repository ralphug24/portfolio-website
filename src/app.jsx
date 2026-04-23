// ============ App root ============
const PAGES = ["home", "about", "projects", "publications", "blog", "resume"];

function App() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || window.TWEAKS.defaultTheme || "dark";
  });
  const [page, setPage] = React.useState(() => {
    const h = (location.hash || "").replace("#", "");
    return PAGES.includes(h) ? h : "home";
  });
  const [tweaks, setTweaks] = React.useState(window.TWEAKS);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent-h", tweaks.accentHue);
    document.documentElement.dataset.fontpair = tweaks.fontPair;
    document.documentElement.dataset.serif = String(tweaks.serifAccent);
    document.body.dataset.grain = String(tweaks.grain);
  }, [tweaks]);

  const navigate = React.useCallback((p) => {
    setPage(p);
    history.replaceState(null, "", "#" + p);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  React.useEffect(() => {
    const onHash = () => {
      const h = (location.hash || "").replace("#", "");
      if (PAGES.includes(h) && h !== page) setPage(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [page]);

  useReveal();

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} active={page} navigate={navigate} />
      <main key={page} className="page-fade">
        {page === "home" && <Home navigate={navigate} />}
        {page === "about" && <About />}
        {page === "projects" && <Projects />}
        {page === "publications" && <Publications />}
        {page === "blog" && <Blog />}
        {page === "resume" && <Resume />}
      </main>
      <Footer navigate={navigate} />
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
