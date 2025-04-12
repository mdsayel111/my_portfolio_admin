import Dashboard from "./Dashboard/Dashboard";
// import Exams from "./Exams/Exams";
import ExtraServices from "./ExtraServices/ExtraServices";
import Inquiries from "./Inquiries/Inquiries";

import Levels from "./Levels/Levels";
import SubjectBoardMaps from "./SubjectBoardMap/SubjectBoardMaps";
// import Subjects from "./Subjects/Subjects";
import Employees from "./Users/Employees/Employees";
// import Venues from "./Venues/Venues";
import Testimonials from "./WebsiteContents/Testimonials/Testimonials";

// import ContactUs from "./ContactUs/ContactUs";
import GetinTouch from "./FooterContents/GetinTouch/GetinTouch";
import Timings from "./FooterContents/Timing/Timings";
import Hero from "./Hero/Hero";
import SubLevel from "./Levels/components/subLevel/SubLevelScreen";
import Projects from "./Projects/Projects";
import Resume from "./Resume/Resume";
import UcasMocks from "./UcasMocks/UcasMocks";
import UserContacts from "./UserContact/UserContact";
import SocialLinks from "./WebsiteContents/SocialLinks/SocialLinks";
import Subscribers from "./WebsiteContents/Subscribers/Subscribers";
import HeroAnimationText from "./Hero/HeroAnimationText/HeroAnimationText";
import AboutMe from "./AboutMe/AboutMe";
import Experiences from "./Experience/Experience";
import Educations from "./Education/Education";
import Skills from "./skills/Skills";
import Contact from "./Contact/Contact";
import SocialIcon from "./SocialIcon/SocialIcon";

const main = "main/";

const routesConfig = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "resume", element: <Resume /> },
  { path: "projects", element: <Projects /> },
  { path: "hero", element: <Hero /> },
  { path: "heroAnimationText/:heroId", element: <HeroAnimationText /> },
  { path: "aboutMe", element: <AboutMe /> },
  { path: "experience", element: <Experiences /> },
  { path: "education", element: <Educations /> },
  { path: "skill", element: <Skills /> },
  { path: "contact", element: <Contact /> },
  { path: "socialIcon", element: <SocialIcon /> },


  { path: "levels", element: <Levels /> },
  // { path: "levels/subjects/:subLevelId", element: <Subjects /> },
  { path: "subjectBoardMaps", element: <SubjectBoardMaps /> },
  // { path: "venues", element: <Venues /> },
  { path: "inquiries", element: <Inquiries /> },
  // { path: "exams", element: <Exams /> },
  { path: "ucas-mocks", element: <UcasMocks /> },
  { path: "extra-services", element: <ExtraServices /> },
  { path: "employees", element: <Employees /> },
  { path: "testimonials", element: <Testimonials /> },
  { path: "social-links", element: <SocialLinks /> },
  { path: "subscribers", element: <Subscribers /> },
  { path: "levels/:id", element: <SubLevel /> },
  // { path: "contact-us", element: <ContactUs /> },
  { path: "user-contacts", element: <UserContacts /> },
  { path: "timings", element: <Timings /> },
  { path: "get-in-touch", element: <GetinTouch /> },
];

const mainRoutes = routesConfig.map((route) => ({
  path: main + route.path,
  element: route.element,
}));

export default mainRoutes;