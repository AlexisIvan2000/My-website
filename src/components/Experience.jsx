import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

export function ExperienceSection() {
  const { lang } = useLanguage();
  const { ui, experiences } = getData(lang);

  return (
    <section id="experience" className="experience">
      <AnimatedSection className="section-header anim-fade">
        <span className="section-label">{ui.experience.label}</span>
        <h2 className="section-title">{ui.experience.title}</h2>
      </AnimatedSection>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <AnimatedSection key={i} className="timeline-item anim-slide-up" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-meta">
                <span className="timeline-period">{exp.duration}</span>
                <span className="timeline-location">{exp.location}</span>
              </div>
              <h4 className="timeline-role">{exp.position}</h4>
              <p className="timeline-company">{exp.company}</p>
              <ul className="timeline-desc">
                {exp.description.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              <div className="timeline-techs">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="chip">{tech}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

export function EducationSection() {
  const { lang } = useLanguage();
  const { ui, education } = getData(lang);

  return (
    <section id="education" className="experience">
      <AnimatedSection className="section-header anim-fade">
        <span className="section-label">{ui.education.label}</span>
        <h2 className="section-title">{ui.education.title}</h2>
      </AnimatedSection>

      <div className="timeline">
        {education.map((edu, i) => (
          <AnimatedSection key={i} className="timeline-item anim-slide-up" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-meta">
                <span className="timeline-period">{edu.duration}</span>
                <span className="timeline-location">{edu.location}</span>
              </div>
              <h4 className="timeline-role">{edu.degree}</h4>
              <p className="timeline-company">{edu.school}</p>
              <p className="timeline-subject">{edu.subject}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
