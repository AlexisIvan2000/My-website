import { useEffect, useRef } from "react";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

export default function About() {
  const ref = useRef(null);
  const { lang } = useLanguage();
  const { ui, projects } = getData(lang);
  const t = ui.about;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-watermark" aria-hidden="true">FULL STACK</div>
      <span className="about-badge">
        <i className="about-badge-dot" aria-hidden="true" />
        {t.badge}
      </span>
      <p className="about-greeting">{t.greeting}</p>
      <h1 className="about-name">
        <span className="about-name-wrap">
          <span className="about-name-first">Alexis</span>
          <span className="about-name-last">Moungang</span>
        </span>
      </h1>
      <h2 className="about-role">{t.role}</h2>
      <p className="about-desc">{t.description}</p>
      <div className="about-cta">
        <a href="#contact" className="btn-neon">{t.cta_contact}</a>
        <a href="#projects" className="btn-ghost">{t.cta_projects}</a>
      </div>

      <div className="about-stats">
        <div className="about-stat">
          <span className="about-stat-number">{t.stats.experience.value}</span>
          <span className="about-stat-label">{t.stats.experience.label}</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-number">{projects.length}</span>
          <span className="about-stat-label">{t.stats.projects.label}</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-number">{t.stats.techs.value}</span>
          <span className="about-stat-label">{t.stats.techs.label}</span>
        </div>
      </div>
    </section>
  );
}
