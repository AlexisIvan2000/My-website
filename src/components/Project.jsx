import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

function hostOf(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
}

function ProjectCase({ project, index, ui }) {
  const [shot, setShot] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const hovering = useRef(false);

  const num = String(index + 1).padStart(2, "0");
  const shots = project.shots;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Défilement automatique des captures, uniquement quand le bloc est visible
  // et que le curseur n'est pas dessus.
  useEffect(() => {
    if (!inView || shots.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!hovering.current) setShot((s) => (s + 1) % shots.length);
    }, 5200);
    return () => clearInterval(id);
  }, [inView, shots.length]);

  const handleMove = useCallback((e) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    stage.style.setProperty("--px", `${px * 100}%`);
    stage.style.setProperty("--py", `${py * 100}%`);
    stage.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
    stage.style.setProperty("--rx", `${(0.5 - py) * 9}deg`);
  }, []);

  const handleEnter = () => {
    hovering.current = true;
    stageRef.current?.classList.add("is-live");
  };

  const handleLeave = () => {
    hovering.current = false;
    const stage = stageRef.current;
    if (!stage) return;
    stage.classList.remove("is-live");
    stage.style.setProperty("--rx", "0deg");
    stage.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={rootRef}
      className="case"
      data-type={project.type}
      style={{ "--accent": project.accent }}
    >
      <span className="case-ghost" aria-hidden="true">{num}</span>

      <div className="case-body">
        <div className="case-head">
          <span className="case-index">{num}</span>
          <span className="case-status">
            <i className="case-status-dot" />
            {project.status}
          </span>
          <span className="case-year">{project.year}</span>
        </div>

        <h3 className="case-title">{project.title}</h3>
        <p className="case-tagline">{project.tagline}</p>
        <p className="case-desc">{project.description}</p>

        <ul className="case-metrics">
          {project.metrics.map((m) => (
            <li key={m.label} className="case-metric">
              <span className="case-metric-value">{m.value}</span>
              <span className="case-metric-label">{m.label}</span>
            </li>
          ))}
        </ul>

        <div className="case-block">
          <h4 className="case-block-title">{ui.projects.highlights}</h4>
          <ul className="case-highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <div className="case-block">
          <h4 className="case-block-title">{ui.projects.stack}</h4>
          <div className="case-techs">
            {project.technologies.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        <a
          className="case-cta"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{project.action}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      <div className="case-visual">
        <div className="case-tabs" role="tablist" aria-label={`${project.title}, ${ui.projects.shots}`}>
          {shots.map((s, i) => (
            <button
              key={s.src}
              role="tab"
              type="button"
              aria-selected={i === shot}
              className={`case-tab${i === shot ? " is-active" : ""}`}
              onClick={() => setShot(i)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          className="case-stage"
          ref={stageRef}
          onPointerMove={handleMove}
          onPointerEnter={handleEnter}
          onPointerLeave={handleLeave}
        >
          <span className="case-halo" aria-hidden="true" />
          <div className="case-frame">
            {project.type === "web" && (
              <div className="case-chrome" aria-hidden="true">
                <span className="case-chrome-dot" />
                <span className="case-chrome-dot" />
                <span className="case-chrome-dot" />
                <span className="case-chrome-url">{hostOf(project.link)}</span>
              </div>
            )}
            <div className="case-media">
              {shots.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={`${project.title}, ${s.label}`}
                  loading="lazy"
                  decoding="async"
                  className={`case-shot${i === shot ? " is-active" : ""}`}
                />
              ))}
              <span className="case-sheen" aria-hidden="true" />
            </div>
          </div>
          <span
            className="case-reflection"
            aria-hidden="true"
            style={{ backgroundImage: `url("${shots[shot].src}")` }}
          />
        </div>

        <div className="case-progress" aria-hidden="true">
          {shots.map((s, i) => (
            <span key={s.src} className={`case-progress-bar${i === shot ? " is-active" : ""}`} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Project() {
  const { lang } = useLanguage();
  const { ui, projects } = getData(lang);

  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <span className="section-label">{ui.projects.label}</span>
        <h2 className="section-title">{ui.projects.title}</h2>
        <p className="section-intro">{ui.projects.intro}</p>
      </div>

      <div className="cases">
        {projects.map((project, i) => (
          <ProjectCase key={project.id} project={project} index={i} ui={ui} />
        ))}
      </div>
    </section>
  );
}
