// ============ Tweaks Panel ============
function TweaksPanel({ tweaks, setTweaks }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };

  if (!open) return null;

  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <span>Tweaks</span>
        <button className="tweaks-close" onClick={() => setOpen(false)}>✕</button>
      </div>

      <div className="tweak-row">
        <label className="tweak-label">Accent hue · {tweaks.accentHue}°</label>
        <input
          type="range" min="0" max="360" step="1"
          value={tweaks.accentHue}
          onChange={(e) => update({ accentHue: +e.target.value })}
        />
      </div>

      <div className="tweak-row">
        <label className="tweak-label">Font pairing</label>
        <div className="tweak-chips">
          {[
            { id: "inter-jetbrains", l: "Sans + Mono" },
            { id: "serif-mono", l: "Serif + Mono" },
            { id: "mono-only", l: "Mono only" },
          ].map(o => (
            <button key={o.id}
              className="tweak-chip"
              data-active={tweaks.fontPair === o.id}
              onClick={() => update({ fontPair: o.id })}
            >{o.l}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row tweak-toggle">
        <span className="tweak-label" style={{ margin: 0 }}>Film grain</span>
        <button
          className="tweak-switch"
          data-on={tweaks.grain}
          onClick={() => update({ grain: !tweaks.grain })}
        />
      </div>

      <div className="tweak-row tweak-toggle">
        <span className="tweak-label" style={{ margin: 0 }}>Italic serif accents</span>
        <button
          className="tweak-switch"
          data-on={tweaks.serifAccent}
          onClick={() => update({ serifAccent: !tweaks.serifAccent })}
        />
      </div>

      <div className="tweak-row tweak-toggle">
        <span className="tweak-label" style={{ margin: 0 }}>Default theme</span>
        <div className="tweak-chips">
          {["dark", "light"].map(t => (
            <button key={t}
              className="tweak-chip"
              data-active={tweaks.defaultTheme === t}
              onClick={() => update({ defaultTheme: t })}
            >{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
