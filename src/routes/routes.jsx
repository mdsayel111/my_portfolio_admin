import { CLCreateBrowserRouter } from "@antopolis/admin-component-library/dist/helper";
import {
  AuthScreen,
  MainScreen,
} from "@antopolis/admin-component-library/dist/screens";
import Logo from "../assets/logo.png";
import authRoutes from "../Screens/AuthScreens/AuthRoutes";
import mainRoutes from "../Screens/MainScreens/MainRoutes";
import { links } from "./sideLinks";

const routes = CLCreateBrowserRouter([
  {
    path: "/",
    element: (
      <MainScreen links={links} logo={Logo} title={"AJ Exam Center"} />
      // <MainScreen links={links} logo={Logo} title={"Emerald Restaurant"} />
    ),
    children: mainRoutes,
  },
  {
    path: "/auth",
    element: <AuthScreen />,
    children: authRoutes,
  },
  {
    path: "/profile",
    element: (
      <>
        <p>Hello</p>
      </>
    ),
  },
]);

export default routes;
