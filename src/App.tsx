import { useEffect, useState } from "react";
import AskGDG from "./components/AskGDG";
import DataRain from "./components/ui/data-rain";
import { ParallaxComponent } from "./components/ui/parallax-scrolling";

/* TODO: replace placeholders with real content/assets from Figma */
const LIGHT_PALETTE = { calm: "#0891b2", mid: "#6d28d9", hot: "#db2777" };
const USER_NAME = "Pratiksha";
const TEAM_PHOTO = "/team.jpg";
const EVENT_IMG = ""; // e.g. "/event.jpg" (file in /public)
const NAV = [
  ["Home", "#home", "blue"], ["Team", "#team", "red"], ["Events", "#events", "yellow"],
  ["Gallery", "#team", "green"], ["Portfolio", "#home", "purple"], ["More", "#faqs", "blue"],
] as const;
const FAQS = [
  ["What is GDG RBU?", "GDG RBU is focused on empowering students through hands-on workshops, tech talks, hackathons, and real-world project collaboration."],
  ["How to join GDG?", "TODO: add answer from design."],
  ["What does a GDG Lead do?", "TODO: add answer from design."],
  ["How is GDG related to Google?", "TODO: add answer from design."],
  ["How to reach us?", "Email gdso@rknec.edu."],
];

function Arm({ x1, y1, x2, y2, c }: { x1: number; y1: number; x2: number; y2: number; c: string }) {
  return (
    <g strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000" strokeWidth="13" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="8.5" />
    </g>
  );
}

function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size * 1.6} height={size} viewBox="0 0 64 40" aria-hidden="true">
      <Arm x1={14} y1={20} x2={26} y2={8} c="#EA4335" />
      <Arm x1={14} y1={20} x2={26} y2={32} c="#4285F4" />
      <Arm x1={50} y1={20} x2={38} y2={8} c="#34A853" />
      <Arm x1={50} y1={20} x2={38} y2={32} c="#FBBC04" />
    </svg>
  );
}

function Header({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <header className="nav">
      <a href="#home" aria-label="GDG RBU home"><Logo size={64} /></a>
      <nav aria-label="Main"><ul>
        {NAV.map(([l, h, c]) => <li key={l}><a className={`pill ${c}`} href={h}>{l}</a></li>)}
      </ul></nav>
      <div className="user">
        <span className="upill"><span className="avatar" aria-hidden="true">{USER_NAME[0]}</span><span className="uname">{USER_NAME}</span><span aria-hidden="true">⌄</span></span>
        <button className="theme" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero" data-parallax-layers>
      <div className="hero-text" data-parallax-layer="4">
        <h1>Google Developer Groups, RBU</h1>
        <p>Empowering students with cutting-edge tech skills, community, and resources for a future in technology</p>
        <div className="btns">
          <a className="btn" href="#events">Learn more</a>
          <a className="btn" href="#team">Profile</a>
        </div>
        <span className="tag">GDG • RBU</span>
      </div>
      <div className="blob-wrap" data-parallax-layer="2">
          <div className="blob" aria-hidden="true">
            <svg className="blob-shape" viewBox="0 0 368 256"><path d="M190,0H340Q368,0 368,28V170Q368,198 340,198H294Q272,198 272,220V228Q272,256 244,256H28Q0,256 0,228V84Q0,56 28,56H140Q162,56 162,34V28Q162,0 190,0Z" /></svg>
            <span className="blob-pill"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#999" strokeWidth="1.5"><circle cx="5" cy="5" r="3.5" /><path d="M8 8l3 3" /></svg>gdgr</span>
          </div>
        </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="events reveal">
      <h2>Upcoming Event</h2>
      <div className="ev-grid">
        <article className="ev-card" style={EVENT_IMG ? { backgroundImage: `linear-gradient(rgba(0,0,0,.15),rgba(0,0,0,.85)), url(${EVENT_IMG})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
          <span className="chip">Upcoming</span>
          <div className="ev-body">
            <h3>GDG Orientation</h3>
            <p>Google Developer Groups (GDG) – Student Chapter is a community of students passionate about technology, innovation, and learning. We bring students together to learn, build, and grow through technical workshops, hands-on sessions, hackathons, projects, and networking.</p>
            <a className="round" href="#faqs" aria-label="About GDG Orientation">↗</a>
          </div>
        </article>
        <aside className="ev-new">
          <h3>New Event</h3>
          <small>Date &amp; Time</small>
          <p>Oct 7, 2026<br />3:00 PM</p>
          <a className="btn dark" href="#faqs">Register Now</a>
        </aside>
      </div>
    </section>
  );
}

function Team() {
  const items = [
    ["Passionate Community Leaders", "Our organizers build an inclusive environment where developers can connect, share knowledge, and grow together."],
    ["Empowering Developers", "We host meetups and codelabs to help developers stay current with modern tools and best practices."],
  ];
  return (
    <section id="team" className="team reveal">
      <div className="team-text">
        <h2>Meet the Google Developer Group Team</h2>
        <p>Google Developer Groups (GDG) are open and volunteer-run communities for developers interested in Google technologies. Our team focuses on learning, networking, and collaboration through events and hands-on sessions.</p>
        {items.map(([t, d]) => (
          <div className="feat" key={t}><span aria-hidden="true">✓</span><div><h4>{t}</h4><p>{d}</p></div></div>
        ))}
      </div>
      {TEAM_PHOTO
        ? <img src={TEAM_PHOTO} alt="The GDG RBU team posing together" loading="lazy" />
        : <div className="photo" role="img" aria-label="Team photo placeholder">Add team photo</div>}
    </section>
  );
}

function Faqs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faqs" className="faqs reveal">
      <h2>FAQs</h2>
      <div className="faq-list">
        {FAQS.map(([q, a], i) => (
          <div key={q}>
            <button className="faq-q" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
              {q}<span className="chev" aria-hidden="true">⌄</span>
            </button>
            <div id={`faq-${i}`} role="region" className={`faq-a${open === i ? " open" : ""}`}><div><p className="faq-box">{a}</p></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="f-card reveal">
        <Logo size={48} />
        <h2>Google Developer Groups</h2>
        <p className="sub">On Campus • Ramdeobaba University</p>
        <hr />
        <div className="f-grid">
          <div className="f-left">
            <address className="box blue">📍 <span>Ramdeobaba University<br />Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013</span></address>
            <a className="box yellow" href="mailto:gdso@rknec.edu">✉ gdso@rknec.edu</a>
          </div>
          <div className="box purple follow">
            <strong>Follow Us:</strong>
            <div>
              {[["Instagram", "ig", "red"], ["LinkedIn", "in", "blue"], ["X", "x", "green"]].map(([n, s, c]) => (
                <a key={n} className={`soc ${c}`} href="#" aria-label={n}>{s}</a> /* TODO: real URLs */
              ))}
            </div>
          </div>
        </div>
      </div>
      <svg className="confetti" viewBox="0 0 1000 160" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle cx="-5" cy="95" r="45" fill="#EA4335" />
        <rect x="55" y="55" width="190" height="48" rx="3" fill="#34A853" transform="rotate(28 150 79)" />
        <circle cx="120" cy="165" r="75" fill="#FBBC04" />
        <path d="M180 160A55 55 0 0 1 290 160Z" fill="#4285F4" />
        <rect x="215" y="40" width="46" height="46" fill="#FBBC04" transform="rotate(45 238 63)" />
        <rect x="330" y="30" width="34" height="130" fill="#EA4335" transform="rotate(-22 347 95)" />
        <circle cx="440" cy="110" r="68" fill="#FBBC04" />
        <rect x="520" y="55" width="105" height="105" fill="#34A853" transform="rotate(45 572 107)" />
        <path d="M650 160A70 70 0 0 1 790 160Z" fill="#4285F4" />
        <path d="M700 160V70A90 90 0 0 1 790 160Z" fill="#EA4335" />
        <circle cx="835" cy="85" r="32" fill="#FBBC04" />
        <circle cx="880" cy="125" r="20" fill="#EA4335" />
        <rect x="880" y="20" width="150" height="40" fill="#34A853" transform="rotate(-50 955 40)" />
        <path d="M930 165A75 75 0 0 1 1060 165Z" fill="#4285F4" />
      </svg>
      <p className="credit">Built by <a href="#home"><strong>Pratiksha Bhatt</strong></a> for GDG RBU Recruitment 2026-27</p>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  return (
    <>
      <DataRain key={theme} palette={theme === "dark" ? undefined : LIGHT_PALETTE} />
      {!reduced && <ParallaxComponent />}
      <a className="skip" href="#main">Skip to content</a>
      <Header theme={theme} toggle={() => { const t = theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = t; setTheme(t); }} />
      <main id="main"><Hero /><Events /><Team /><Faqs /></main>
      <Footer />
      <AskGDG />
    </>
  );
}