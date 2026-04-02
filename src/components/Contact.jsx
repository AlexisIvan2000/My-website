import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

export default function Contact() {
  const { lang } = useLanguage();
  const { ui, socials } = getData(lang);

  return (
    <AnimatedSection className="contact anim-fade">
      <section id="contact">
        <span className="section-label">{ui.contact.label}</span>
        <h2 className="section-title">{ui.contact.title}</h2>
        <p className="contact-text">{ui.contact.text}</p>
        <div className="contact-links">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="contact-btn"
            >
              <img src={s.icon} alt="" className="contact-btn-icon" />
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
