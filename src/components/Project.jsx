import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

export default function Project() {
  const { lang } = useLanguage();
  const { ui, projects } = getData(lang);

  return (
    <section id="projects" className="projects">
      <AnimatedSection className="section-header anim-fade">
        <span className="section-label">{ui.projects.label}</span>
        <h2 className="section-title">{ui.projects.title}</h2>
      </AnimatedSection>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <AnimatedSection
            key={project.title}
            className="project-card anim-slide-up"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-inner"
            >
              <div className="project-img-wrap">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-body">
                <h4 className="project-title">{project.title}</h4>
                <p className="project-desc">{project.description}</p>
                <div className="project-techs">
                  {project.technologies.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
                <span className="project-cta">
                  {project.action}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </span>
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
