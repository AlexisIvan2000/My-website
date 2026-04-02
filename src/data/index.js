import frUi from "./fr/ui.json";
import enUi from "./en/ui.json";
import frExperience from "./fr/experience.json";
import enExperience from "./en/experience.json";
import frEducation from "./fr/education.json";
import enEducation from "./en/education.json";
import frProjects from "./fr/projects.json";
import enProjects from "./en/projects.json";
import frSkills from "./fr/skills.json";
import enSkills from "./en/skills.json";
import socials from "./socials.json";

const data = {
  fr: {
    ui: frUi,
    experiences: frExperience.experiences,
    education: frEducation.education,
    projects: frProjects.projects,
    skills: frSkills.skills,
    socials: socials.socials,
  },
  en: {
    ui: enUi,
    experiences: enExperience.experiences,
    education: enEducation.education,
    projects: enProjects.projects,
    skills: enSkills.skills,
    socials: socials.socials,
  },
};

export function getData(lang) {
  return data[lang] || data.fr;
}
