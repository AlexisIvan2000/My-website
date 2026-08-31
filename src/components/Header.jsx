import { useState, useEffect, useRef } from "react";
import { Moon, Sun1 } from "iconsax-reactjs";
import { useTheme } from "../context/useTheme";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

const sectionIds = ["about", "experience", "education", "skills", "projects", "contact"];

export default function Header() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const { ui } = getData(lang);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);

      // Progression de lecture, écrite en variable CSS pour éviter un rendu React
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.setProperty("--progress", max > 0 ? window.scrollY / max : 0);
      }

      let current = "";
      for (const id of sectionIds) {
        const sec = document.getElementById(id);
        if (sec && sec.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };

    // Le handler tournait à chaque événement de scroll : on le cale sur le rendu
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}${menuOpen ? " header--open" : ""}`}>
      <div className="header-inner">
        <a href="#" className="header-logo">
          AM<span className="header-logo-dot">.</span>
        </a>

        <button
          className="header-burger"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="header-menu"
          aria-label={ui.header.menu}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="header-menu" className={`header-menu${menuOpen ? " open" : ""}`}>
          <nav className="header-nav">
            {sectionIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`header-nav-link${active === id ? " active" : ""}`}
                onClick={handleNavClick}
              >
                {ui.header[id]}
              </a>
            ))}
          </nav>

          <div className="header-toggles">
            <button
              type="button"
              className="switch switch--lang"
              role="switch"
              aria-checked={lang === "en"}
              aria-label={ui.header.toggle_lang}
              onClick={toggleLang}
            >
              <span className="switch-knob" aria-hidden="true" />
              <span className="switch-face">FR</span>
              <span className="switch-face">EN</span>
            </button>

            <button
              type="button"
              className="switch switch--theme"
              role="switch"
              aria-checked={theme === "dark"}
              aria-label={ui.header.toggle_theme}
              onClick={toggleTheme}
            >
              <span className="switch-knob" aria-hidden="true" />
              <span className="switch-face">
                <Sun1 size={13} variant="Bold" />
              </span>
              <span className="switch-face">
                <Moon size={13} variant="Bold" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <span ref={barRef} className="header-progress" aria-hidden="true" />
    </header>
  );
}
