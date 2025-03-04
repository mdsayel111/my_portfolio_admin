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
  // {
  //   label: "Reports",
  //   icon: <RiBarChartLine size={20} />,
  //   subMenu: [
  //     {
  //       label: "Time Rang Report",
  //       path: "main/timeRangeReports",
  //       icon: <RiCalendarTodoLine size={20} />,
  //     },
  //     {
  //       label: "Monthly Report",
  //       path: "main/monthlyRoports",
  //       icon: <RiCalendarTodoLine size={20} />,
  //     },
  //   ],
  // },
  // {
  //   label: "Boards",
  //   path: "main/boards",
  //   icon: <FaRegClipboard size={20} />,
  // },
  {
    label: "Qualifications",
    path: "main/levels",
    icon: <FaLevelUpAlt size={20} />,
  },
  // {
  //   label: "Subjects",
  //   path: "main/subjects",
  //   icon: <FaBookOpen size={20} />,
  // },

  // {
  //   label: "Packages",
  //   path: "main/packages",
  //   icon: <GoPackage size={20} />,
  // },
  // {
  //   label: "Subject-Board",
  //   path: "main/subjectBoardMaps",
  //   icon: <MdAssignmentAdd size={20} />,
  // },
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
    label: "Applicants",
    path: "main/applicants",
    icon: <FaUsers size={20} />,
  },
  // {
  //   label: "Extra services",
  //   path: "main/extra-services",
  //   icon: <MdOutlineMiscellaneousServices size={20} color="#ffffff" />,
  // },
  {
    label: "Employees",
    path: "main/employees",
    icon: <MdAdminPanelSettings size={20} />,
  },

  {
    label: "Website Contents",
    icon: <RiSettings2Line size={20} />,
    subMenu: [
      // {
      //   label: "App Settings",
      //   path: "main/appSettings",
      //   icon: <RiSettings2Line size={20} />,
      // },
      // {
      //   label: "Hero Sliders",
      //   path: "main/heroSliders",
      //   icon: <RiProfileLine size={20} />,
      // },
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
