/* styles.css - Colorful theme, responsive layout, and tab styles.
   Uses Google Fonts (Poppins for headings, Inter for body).
   Edit variables at the top to tweak colors.
*/

/* Theme variables */
:root{
  --bg-grad-1: #071021;
  --bg-grad-2: #0b3a43;
  --accent-1: #7b61ff;
  --accent-2: #27d2d2;
  --highlight: #b7ff2f;
  --card-bg: rgba(255,255,255,0.04);
  --glass: rgba(255,255,255,0.03);
  --muted: rgba(255,255,255,0.85);
  --text: #ffffff;
  --surface: rgba(255,255,255,0.03);
  --glass-strong: rgba(255,255,255,0.07);
  --success: #34d399;
}

/* Base reset */
* { box-sizing: border-box; }
html,body { height: 100%; margin: 0; padding: 0; }
body {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, var(--bg-grad-1) 0%, var(--bg-grad-2) 100%);
  background-attachment: fixed;
  line-height: 1.5;
  min-height: 100vh;
}

/* Container */
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.25rem;
}

/* Skip link */
.skip-link { position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden; }
.skip-link:focus { left: 1rem; top: 1rem; width: auto; height: auto; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.85); color: #fff; border-radius: 6px; z-index:9999; }

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0.5rem 0;
  backdrop-filter: blur(8px);
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.header-inner { display:flex; align-items:center; justify-content:space-between; gap:1rem; }

/* Brand */
.brand { display:flex; align-items:center; gap:0.6rem; }
.logo-mark { font-size:1.45rem; background: linear-gradient(90deg,var(--accent-1),var(--accent-2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.brand-title { font-family: "Poppins", "Inter", sans-serif; font-weight:700; font-size:1.05rem; }
.brand-sub { font-size:0.82rem; color: rgba(255,255,255,0.85); }

/* Top tab navigation */
.top-tabs { display:flex; align-items:center; gap:0.5rem; }
.tablist { display:flex; gap:0.35rem; align-items:center; }
.tab {
  background: transparent;
  color: var(--muted);
  border: 0;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  font-weight:600;
  font-family: inherit;
  transition: transform 140ms ease, background 160ms ease;
}
.tab[aria-selected="true"] {
  color: white;
  background: linear-gradient(90deg, rgba(123,97,255,0.18), rgba(39,210,210,0.08));
  box-shadow: 0 6px 20px rgba(11,24,55,0.28);
  transform: translateY(-2px);
}

/* Mobile nav toggle */
.nav-toggle { display:none; background: transparent; border:0; font-size:1.25rem; color:var(--muted); }
@media (max-width:920px){
  .tablist { display:none; }
  .nav-toggle { display:inline-flex; }
  .top-tabs.open .tablist { display:flex; position: absolute; right: 1.2rem; top: 64px; flex-direction: column; background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.25)); padding: 0.75rem; border-radius: 12px; z-index: 1200; }
}

/* Panels */
.panel { padding: 1.6rem 0; }
.hero { padding: 1rem 0 0; }
.hero h1 {
  font-family: "Poppins", sans-serif;
  font-weight:700;
  font-size: clamp(2rem, 6vw, 4rem);
  margin: 0 0 .4rem 0;
  line-height:1;
  color: #fff;
}
.lead { color: rgba(255,255,255,0.9); font-weight:500; }

/* Home grid */
.home-grid { display:grid; gap:1rem; grid-template-columns: repeat(3, 1fr); margin-top: 1rem; }
.card {
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  padding: 1rem; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.18);
  transition: transform 160ms ease;
}
.card:hover { transform: translateY(-6px); }

/* Course layout */
.course-shell { display:flex; gap:1rem; align-items:flex-start; }
.course-nav { width: 220px; background: var(--glass); padding: 0.75rem; border-radius: 12px; }
.units-title { font-weight:700; margin-bottom:0.5rem; font-family: "Poppins", sans-serif; }
.units-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem; }
.unit-tab {
  background: transparent; border: 0; color: var(--muted); text-align:left; padding:0.6rem; border-radius:8px; cursor: pointer; width: 100%;
}
.unit-tab[aria-selected="true"] { background: linear-gradient(90deg, rgba(123,97,255,0.12), rgba(39,210,210,0.06)); color: white; transform: translateY(-2px); }

/* Unit panels */
.unit-panels { flex: 1 1 auto; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding: 1rem; border-radius: 12px; box-shadow: 0 8px 28px rgba(0,0,0,0.2); }
.unit-panel { padding: 0.4rem 0; }
.unit-panel h2 { margin: 0 0 .6rem 0; font-family: "Poppins", sans-serif; }

/* Projects Grid */
.projects-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-top:1rem; }
.project-card { background: var(--card-bg); padding:1rem; border-radius:10px; }

/* Contact form */
.contact-form { display:flex; flex-direction:column; gap:0.6rem; max-width:640px; }
.contact-form label { display:flex; flex-direction:column; gap:0.25rem; font-size:0.95rem; color:var(--muted); }
.contact-form input, .contact-form textarea { padding:0.6rem; border-radius:8px; border:1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); color:var(--text); }

/* Floating AI tutor UI */
.ai-toggle {
  position: fixed;
  right: 1rem;
  bottom: 1.1rem;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  z-index: 1200;
  background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
  color: white;
  border: 0;
}
.ai-panel {
  position: fixed;
  right: 1rem;
  bottom: 5.6rem;
  width: min(420px, 92vw);
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 0.6rem;
  gap: 0.6rem;
  z-index: 1200;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.04);
}
.ai-header { display:flex; align-items:center; justify-content:space-between; gap:0.5rem; }
.ai-log { overflow:auto; padding: 0.4rem; flex: 1 1 auto; min-height: 6rem; }
.ai-message { margin: 0.45rem 0; line-height:1.4; padding: 0.45rem; border-radius: 8px; }
.ai-message.user { text-align: right; font-weight:600; background: rgba(255,255,255,0.02); }
.ai-message.bot { text-align: left; background: rgba(0,0,0,0.04); color: #fff; }
.ai-controls { display:flex; gap:0.5rem; align-items:center; }
.ai-input { flex:1 1 auto; min-width:0; padding:0.5rem; border-radius:8px; border:1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.04); color: inherit; }
.ai-suggestions { display:flex; gap:0.4rem; flex-wrap:wrap; }

/* Footer */
.site-footer { margin-top: 2rem; padding: 1rem 0; color: var(--muted); }

/* Focus ring improvements */
:focus { outline: 3px solid rgba(123,97,255,0.14); outline-offset: 2px; border-radius: 6px; }

/* Small screens */
@media (max-width: 920px) {
  .home-grid { grid-template-columns: 1fr; }
  .course-shell { flex-direction: column; }
  .course-nav { width: 100%; order: 2; }
  .unit-panels { order: 1; }
  .ai-panel { right: .6rem; left: .6rem; bottom: 5.6rem; width: auto; max-height: 60vh; }
}

/* Utility */
.hidden { display: none !important; }
.small { font-size: 0.9rem; color: var(--muted); }
.center { text-align:center; }
