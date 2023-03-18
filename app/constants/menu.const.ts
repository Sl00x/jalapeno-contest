import {
  RiDashboardLine,
  RiExchangeFundsLine,
  RiGameLine,
  RiInformationLine,
  RiListCheck,
} from "react-icons/ri";

export const menus = [
  { name: "Découvrir", icon: RiGameLine, path: "/", authRequired: false },
  {
    name: "Mes concours",
    icon: RiListCheck,
    path: "/mycontests",
    authRequired: true,
  },
  {
    name: "Mon dashboard",
    icon: RiDashboardLine,
    path: "/dashboard",
    authRequired: true,
  },
];
