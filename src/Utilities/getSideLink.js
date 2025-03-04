// import React from "react";
// import { IconDashboard } from "@tabler/icons-react";
// import {
//   RiArchiveDrawerLine,
//   RiBarChartLine,
//   RiCalendarTodoLine,
//   RiCaravanLine,
//   RiCoupon4Line,
//   RiFeedbackFill,
//   RiGridLine,
//   RiGroup2Line,
//   RiGroupLine,
//   RiMapPinLine,
//   RiOrderPlayLine,
//   RiPriceTag2Line,
//   RiProfileLine,
//   RiRestaurantLine,
//   RiSettings2Line,
// } from "react-icons/ri";
// import { useAuth } from "@antopolis/admin-component-library/dist/useAuth-ced69b84";

// export function useSidelink() {
//   const { member } = useAuth();
//   const links = {
//     superAdmin: [
//       {
//         label: "Dashboard",
//         path: "/main/dashboard",
//         icon: <IconDashboard size={20} />,
//       },
//       {
//         label: "Reports",
//         icon: <RiBarChartLine size={20} />,
//         subMenu: [
//           {
//             label: "Time Range Report",
//             path: "/main/timeRangeReports",
//             icon: <RiCalendarTodoLine size={20} />,
//           },
//           {
//             label: "Monthly Report",
//             path: "/main/monthlyReports",
//             icon: <RiCalendarTodoLine size={20} />,
//           },
//         ],
//       },
//       {
//         label: "Restaurants",
//         path: "/main/restaurants",
//         icon: <RiRestaurantLine size={20} />,
//       },
//       {
//         label: "Classification",
//         icon: <RiArchiveDrawerLine size={20} />,
//         subMenu: [
//           {
//             label: "Menu Categories",
//             path: "/main/categories",
//             icon: <RiGridLine size={20} />,
//           },
//           {
//             label: "Featured Branch Items",
//             path: "/main/featuredItems",
//             icon: <RiGridLine size={20} />,
//           },
//         ],
//       },
//       {
//         label: "Orders",
//         path: "/main/orders",
//         icon: <RiOrderPlayLine size={20} />,
//       },
//       {
//         label: "Users",
//         icon: <RiGroupLine size={20} />,
//         subMenu: [
//           {
//             label: "Customers",
//             path: "/main/customers",
//             icon: <RiGroup2Line size={20} />,
//           },
//           {
//             label: "Employees",
//             path: "/main/employees",
//             icon: <RiGroupLine size={20} />,
//           },
//           {
//             label: "Managers",
//             path: "/main/managers",
//             icon: <RiGroupLine size={20} />,
//           },
//           {
//             label: "Owners",
//             path: "/main/owners",
//             icon: <RiGroupLine size={20} />,
//           },
//         ],
//       },
//       {
//         label: "Website Contents",
//         icon: <RiSettings2Line size={20} />,
//         subMenu: [
//           {
//             label: "App Settings",
//             path: "/main/appSettings",
//             icon: <RiSettings2Line size={20} />,
//           },
//           {
//             label: "Hero Sliders",
//             path: "/main/heroSliders",
//             icon: <RiProfileLine size={20} />,
//           },
//           {
//             label: "Emerald Zones",
//             path: "/main/emeraldZones",
//             icon: <RiMapPinLine size={20} />,
//           },
//           {
//             label: "Feedback",
//             path: "/main/feedback",
//             icon: <RiFeedbackFill size={20} />,
//           },
//           {
//             label: "Delivery Fees",
//             path: "/main/deliveryFees",
//             icon: <RiCaravanLine size={20} />,
//           },
//           {
//             label: "Discount",
//             path: "/main/discount",
//             icon: <RiCoupon4Line size={20} />,
//           },
//           {
//             label: "Vats",
//             path: "/main/vats",
//             icon: <RiPriceTag2Line size={20} />,
//           },
//         ],
//       },
//     ],
//     owner: [
//       {
//         label: "Dashboard",
//         path: "/main/dashboard",
//         icon: <IconDashboard size={20} />,
//       },
//       {
//         label: "Reports",
//         path: "/main/reports",
//         icon: <RiBarChartLine size={20} />,
//       },
//       {
//         label: "Restaurants",
//         path: "/main/restaurants",
//         icon: <RiRestaurantLine size={20} />,
//       },
//       {
//         label: "Classification",
//         icon: <RiArchiveDrawerLine size={20} />,
//         subMenu: [
//           {
//             label: "Menu Categories",
//             path: "/main/categories",
//             icon: <RiGridLine size={20} />,
//           },
//         ],
//       },
//       {
//         label: "Orders",
//         path: "/main/orders",
//         icon: <RiOrderPlayLine size={20} />,
//       },
//     ],
//     branchManager: [
//       {
//         label: "Dashboard",
//         path: "/main/dashboard",
//         icon: <IconDashboard size={20} />,
//       },
//       {
//         label: "Orders",
//         path: "/main/orders",
//         icon: <RiOrderPlayLine size={20} />,
//       },
//       {
//         label: "Branch",
//         path: `/branchCategory`,
//         icon: <RiRestaurantLine size={20} />,
//       },
//     ],
//     employee: [
//       {
//         label: "Dashboard",
//         path: "/main/dashboard",
//         icon: <IconDashboard size={20} />,
//       },
//     ],
//   };

//   return links[member.role] || [];
// }
