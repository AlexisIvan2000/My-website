import { useEffect, useRef } from "react";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

function Timeline({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <ol className="timeline" ref={ref}>
      {children}
    </ol>
  );
}

function TimelineEntry({ index, period, location, title, subtitle, note, badge, tasks, techs }) {
  return (
    <li className={`xp${badge ? " is-current" : ""}`} style={{ "--i": index }}>
      <div className="xp-when">
        <span className="xp-period">{period}</span>
        <span className="xp-location">{location}</span>
      </div>

      <div className="xp-rail" aria-hidden="true">
        <span className="xp-dot" />
      </div>

      <div className="xp-card">
        <div className="xp-head">
          <h4 className="xp-role">{title}</h4>
          {badge && (
            <span className="xp-badge">
              <i className="xp-badge-dot" />
              {badge}
            </span>
          )}
        </div>

        <p className="xp-company">{subtitle}</p>
        {note && <p className="xp-note">{note}</p>}

        {tasks && (
          <ul className="xp-tasks">
            {tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        {techs && (
          <div className="xp-techs">
            {techs.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export function ExperienceSection() {
  const { lang } = useLanguage();
  const { ui, experiences } = getData(lang);

  return (
    <section id="experience" className="experience">
      <div className="section-header">
        <span className="section-label">{ui.experience.label}</span>
        <h2 className="section-title">{ui.experience.title}</h2>
      </div>

      <Timeline>
        {experiences.map((exp, i) => (
          <TimelineEntry
            key={`${exp.company}-${exp.duration}`}
            index={i}
            period={exp.duration}
            location={exp.location}
            title={exp.position}
            subtitle={exp.company}
            badge={exp.current ? ui.experience.current : null}
            tasks={exp.description}
            techs={exp.technologies}
          />
        ))}
      </Timeline>
    </section>
  );
}

export function EducationSection() {
  const { lang } = useLanguage();
  const { ui, education } = getData(lang);

  return (
    <section id="education" className="experience">
      <div className="section-header">
        <span className="section-label">{ui.education.label}</span>
        <h2 className="section-title">{ui.education.title}</h2>
      </div>

      <Timeline>
        {education.map((edu, i) => (
          <TimelineEntry
            key={`${edu.school}-${edu.duration}`}
            index={i}
            period={edu.duration}
            location={edu.location}
            title={edu.degree}
            subtitle={edu.school}
            note={edu.subject}
          />
        ))}
      </Timeline>
    </section>
  );
}
