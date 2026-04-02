import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

export default function Skills() {
  const { lang } = useLanguage();
  const { ui, skills } = getData(lang);

  return (
    <section id="skills" className="skills">
      <AnimatedSection className="section-header anim-fade">
        <span className="section-label">{ui.skills.label}</span>
        <h2 className="section-title">{ui.skills.title}</h2>
      </AnimatedSection>
      <div className="skills-grid">
        {skills.map((cat, i) => (
          <AnimatedSection
            key={cat.name}
            className="skills-card anim-slide-up"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <h4 className="skills-card-title">{cat.name}</h4>
            <div className="skills-card-tags">
              {cat.skills.map((s) => (
                <span key={s} className="chip chip--skill">{s}</span>
              ))}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
