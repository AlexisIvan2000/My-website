import { useLanguage } from "../context/useLanguage";
import { getData } from "../data";
import Header from "../components/Header";
import About from "../components/About";
import { ExperienceSection, EducationSection } from "../components/Experience";
import Skills from "../components/Skills";
import Project from "../components/Project";
import Contact from "../components/Contact";

export default function Home() {
  const { lang } = useLanguage();
  const { ui } = getData(lang);

  return (
    <>
      <Header />
      <main>
        <About />
        <ExperienceSection />
        <EducationSection />
        <Skills />
        <Project />
        <Contact />
      </main>
      <footer className="footer">
        <p>&copy; 2026 Alexis Moungang. {ui.footer}</p>
      </footer>
    </>
  );
}
