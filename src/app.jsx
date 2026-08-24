// ============ App root ============
const PAGES = ["home", "about", "projects", "publications", "blog", "resume"];
const pageFromLocation = () => {
  const hash = (location.hash || "").replace("#", "");
  if (PAGES.includes(hash)) return hash;
  const path = location.pathname.replace(/^\/+|\/+$/g, "");
  return PAGES.includes(path) ? path : "home";
};

function App() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || window.TWEAKS.defaultTheme || "dark";
  });
  const [page, setPage] = React.useState(pageFromLocation);
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
    history.replaceState(null, "", p === "home" ? "/" : "/" + p);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  React.useEffect(() => {
    const onLocationChange = () => {
      const nextPage = pageFromLocation();
      if (nextPage !== page) setPage(nextPage);
    };
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("hashchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, [page]);

  useReveal();

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} active={page} navigate={navigate} />
      <main key={page} className="page-fade">
        {page === "home" && <Home navigate={navigate} />}
        {page === "about" && <About navigate={navigate} />}
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
