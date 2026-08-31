import { useCallback, useEffect, useRef } from "react";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

const icons = {
  languages: <path d="M8 6 2 12l6 6M16 6l6 6-6 6" />,
  frontend: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M2.5 9.5h19M6 7h.01M8.5 7h.01" />
    </>
  ),
  backend: (
    <>
      <rect x="2.5" y="4" width="19" height="6" rx="1.5" />
      <rect x="2.5" y="14" width="19" height="6" rx="1.5" />
      <path d="M6 7h.01M6 17h.01" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9z" />
      <path d="M18.5 3.5v3M20 5h-3" />
    </>
  ),
  tools: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
    </>
  ),
  database: (
    <>
      <path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M20 12c0 1.7-3.6 3-8 3s-8-1.3-8-3" />
    </>
  ),
  testing: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  pm: (
    <>
      <rect x="3" y="4" width="4.5" height="16" rx="1" />
      <rect x="9.75" y="4" width="4.5" height="10" rx="1" />
      <rect x="16.5" y="4" width="4.5" height="13" rx="1" />
    </>
  ),
};

function SkillIcon({ id }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[id]}
    </svg>
  );
}

export default function Skills() {
  const { lang } = useLanguage();
  const { ui, skills } = getData(lang);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Le halo suit le curseur à l'intérieur de la carte survolée.
  const handleMove = useCallback((e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--px", `${((e.clientX - r.left) / r.width) * 100}%`);
    card.style.setProperty("--py", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);

  return (
    <section id="skills" className="skills">
      <div className="section-header">
        <span className="section-label">{ui.skills.label}</span>
        <h2 className="section-title">{ui.skills.title}</h2>
        <p className="section-intro">{ui.skills.intro}</p>
      </div>

      <div className="skills-bento" ref={gridRef}>
        {skills.map((cat, i) => (
          <article
            key={cat.id}
            className="skill-card"
            data-span={cat.span}
            style={{ "--i": i }}
            onPointerMove={handleMove}
          >
            <div className="skill-card-head">
              <span className="skill-card-icon">
                <SkillIcon id={cat.id} />
              </span>
              <h4 className="skill-card-title">{cat.name}</h4>
              <span className="skill-card-count">
                {String(cat.skills.length).padStart(2, "0")}
              </span>
            </div>

            <div className="skill-card-tags">
              {cat.skills.map((s) => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
