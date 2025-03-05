import Dashboard from "./Dashboard/Dashboard";
import Exams from "./Exams/Exams";
import ExtraServices from "./ExtraServices/ExtraServices";
import Inquiries from "./Inquiries/Inquiries";

import Levels from "./Levels/Levels";
import Packages from "./Packages/Packages";
import SubjectBoardMaps from "./SubjectBoardMap/SubjectBoardMaps";
import Subjects from "./Subjects/Subjects";
import Employees from "./Users/Employees/Employees";
import Venues from "./Venues/Venues";
import Testimonials from "./WebsiteContents/Testimonials/Testimonials";

import ContactUs from "./ContactUs/ContactUs";
import GetinTouch from "./FooterContents/GetinTouch/GetinTouch";
import Timings from "./FooterContents/Timing/Timings";
import SubLevel from "./Levels/components/subLevel/SubLevelScreen";
import Projects from "./Projects/Projects";
import Resume from "./Resume/Resume";
import UcasMocks from "./UcasMocks/UcasMocks";
import UserContacts from "./UserContact/UserContact";
import SocialLinks from "./WebsiteContents/SocialLinks/SocialLinks";
import Subscribers from "./WebsiteContents/Subscribers/Subscribers";
// import Resume from "./Resume/Resume"

const main = "main/";

const routesConfig = [
  { path: "dashboard", element: <Dashboard /> },
  // { path: "timeRangeReports", element: <TimelyRangOrderReports /> },
  // { path: "monthlyRoports", element: <MonthlyOrderReports /> },
  { path: "resume", element: <Resume />},
  { path: "levels", element: <Levels /> },
  { path: "levels/subjects/:subLevelId", element: <Subjects /> },
  { path: "levels/packages/:subLevelId", element: <Packages /> },
  { path: "subjectBoardMaps", element: <SubjectBoardMaps /> },
  { path: "venues", element: <Venues /> },
  { path: "inquiries", element: <Inquiries /> },
  { path: "exams", element: <Exams /> },
  { path: "ucas-mocks", element: <UcasMocks /> },
  { path: "projects", element: <Projects /> },
  { path: "extra-services", element: <ExtraServices /> },
  { path: "employees", element: <Employees /> },
  { path: "testimonials", element: <Testimonials /> },
  { path: "social-links", element: <SocialLinks /> },
  { path: "subscribers", element: <Subscribers /> },
  { path: "levels/:id", element: <SubLevel /> },
  { path: "contact-us", element: <ContactUs /> },
  { path: "user-contacts", element: <UserContacts /> },
  { path: "timings", element: <Timings /> },
  { path: "get-in-touch", element: <GetinTouch /> },
  // { path: "categories", element: <Categories /> },

  // { path: "appSettings", element: <AppSettings /> },
  // { path: "heroSliders", element: <HeroSliders /> },

  // { path: "feedback", element: <FeedBacks /> },
  // { path: "discount", element: <Discount /> },
];

const mainRoutes = routesConfig.map((route) => ({
  path: main + route.path,
  element: route.element,
}));

export default mainRoutes;
