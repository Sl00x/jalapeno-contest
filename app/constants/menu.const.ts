import { RiExchangeFundsLine, RiGameLine, RiListCheck } from "react-icons/ri";

export const menus = [
  { name: "Découvrir", icon: RiGameLine, path: "/", authRequired: false },
  {
    name: "Mes concours",
    icon: RiListCheck,
    path: "/mycontests",
    authRequired: true,
  },
  {
    name: "Mes transactions",
    icon: RiExchangeFundsLine,
    path: "/transactions",
    authRequired: true,
  },
];
