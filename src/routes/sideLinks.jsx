import { IconDashboard } from "@tabler/icons-react";
import {
  FaFileContract,
  FaLevelUpAlt,
  FaPhone,
  FaUsers
} from "react-icons/fa";

import { FaMapLocationDot } from "react-icons/fa6";
import { MdAddLink, MdAdminPanelSettings, MdOutlineRateReview } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { RiSettings2Line } from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";

export const links = [
  {
    label: "Dashboard",
    path: "/main/dashboard",
    icon: <IconDashboard size={20} />,
  },
  {
    label: "Qualifications",
    path: "main/levels",
    icon: <FaLevelUpAlt size={20} />,
  },
  {
    label: "Venues",
    path: "main/venues",
    icon: <FaMapLocationDot size={20} />,
  },
  {
    label: "Exams",
    path: "main/exams",
    icon: <PiExam size={20} />,
  },
  {
    label: "Ucas & Mocks",
    path: "main/ucas-mocks",
    icon: <PiExam size={20} />,
  },
  {
    label: "Projects",
    path: "main/projects",
    icon: <FaUsers size={20} />,
  },
  {
    label: "Resume",
    path: "main/resume",
    icon: <MdAdminPanelSettings size={20} />,
  },

  {
    label: "Website Contents",
    icon: <RiSettings2Line size={20} />,
    subMenu: [
      {
        label: "Inquiries",
        path: "main/inquiries",
        icon: <TbMessageQuestion size={20} />,
      },
      {
        label: "Testimonials",
        path: "main/testimonials",
        icon: <MdOutlineRateReview size={20} />,
      },
      {
        label: "Social Links",
        path: "main/social-links",
        icon: <MdAddLink size={20} />,
      },
      {
        label: "Subscribers",
        path: "main/subscribers",
        icon: <FaUsers size={20} />,
      },
      {
        label: "Contact Us",
        path: "main/contact-us",
        icon: <FaPhone size={20} />,
      },
      {
        label: "User Contacts",
        path: "main/user-contacts",
        icon: <FaFileContract size={20} />,
      },
    ],
  },

  {
    label: "Footer Contents",
    icon: <RiSettings2Line size={20} />,
    subMenu: [
      {
        label: "Get In Touch",
        path: "main/get-in-touch",
        icon: <RiSettings2Line size={20} />,
      },
      {
        label: "Timings",
        path: "main/timings",
        icon: <RiSettings2Line size={20} />,
      },
    ],
  },
];
