import { useState, useEffect } from "react";
import { useTheme } from "../context/useTheme";
import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";

const sectionIds = ["about", "experience", "education", "skills", "projects", "contact"];

export default function Header() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const { ui } = getData(lang);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = sectionIds.map((id) => document.getElementById(id));
      let current = "";
      for (const sec of sections) {
        if (sec && sec.getBoundingClientRect().top <= 120) {
          current = sec.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`header-menu${menuOpen ? " open" : ""}`}>
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
              className="toggle-btn"
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <button
              className="toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
