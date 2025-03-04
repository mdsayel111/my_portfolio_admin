import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes/routes";
import {
  ThemeProvider,
  AuthContextProvider,
} from "@antopolis/admin-component-library/dist/contexts";
import { Toaster } from "@antopolis/admin-component-library/dist/ui";
import { CLRouterProvider } from "@antopolis/admin-component-library/dist/helper";
import "./index.css";
import "@antopolis/admin-component-library/dist/main.css";
import { AppContextProvider } from "./Context/AppContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AuthContextProvider>
      <AppContextProvider>
        <CLRouterProvider router={routes} />
        <Toaster />
      </AppContextProvider>
    </AuthContextProvider>
  </ThemeProvider>
  // </StrictMode>
);
