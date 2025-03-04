import { IconCategory, IconDashboard } from "@tabler/icons-react";
import { RiBarChartLine } from "react-icons/ri";
export const links = [
  {
    label: "Dashboard",
    path: "/main/dashboard",
    icon: <IconDashboard size={20} />,
    roles: ["superAdmin", "manager", "employee"], // Accessible to all roles
  },
  {
    label: "Reports",
    icon: <RiBarChartLine size={20} />,
    roles: ["superAdmin", "manager"], // Accessible to superAdmin and manager
    subMenu: [
      {
        label: "Time Range Report",
        path: "/timeRangeReports",
        icon: <IconCategory size={20} />,
        roles: ["superAdmin", "manager"], // Submenu item roles match parent
      },
      {
        label: "Monthly Report",
        path: "/monthlyReports",
        icon: <IconCategory size={20} />,
        roles: ["superAdmin", "manager"],
      },
    ],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <IconCategory size={20} />,
    roles: ["superAdmin"], // Only superAdmin can access this
  },
];
