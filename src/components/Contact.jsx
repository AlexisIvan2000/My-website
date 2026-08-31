import { useCallback, useRef } from "react";
import { Sms } from "iconsax-reactjs";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

const EMAIL = "alexiskombou75@gmail.com";

export default function Contact() {
  const { lang } = useLanguage();
  const { ui, socials } = getData(lang);
  const cardRef = useRef(null);

  // Le halo de la carte suit le curseur
  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--py", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);

  const brandLinks = socials.filter((s) => !s.href.startsWith("mailto"));

  return (
    <section id="contact" className="contact">
      <AnimatedSection className="anim-fade">
        <div className="contact-head">
          <span className="section-label">{ui.contact.label}</span>
          <h2 className="contact-title">{ui.contact.title}</h2>
          <p className="contact-text">{ui.contact.text}</p>
        </div>

        <div className="contact-card" ref={cardRef} onPointerMove={handleMove}>
          <span className="contact-card-glow" aria-hidden="true" />

          <span className="contact-status">
            <i className="contact-status-dot" />
            {ui.contact.available}
          </span>

          <a href={`mailto:${EMAIL}`} className="contact-cta">
            <Sms size={17} variant="Bold" />
            <span>{ui.contact.cta}</span>
          </a>

          <div className="contact-socials">
            <span className="contact-socials-label">{ui.contact.elsewhere}</span>
            <div className="contact-socials-list">
              {brandLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social"
                >
                  <img src={s.icon} alt="" className="contact-social-icon" />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
