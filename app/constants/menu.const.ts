import { RiGameLine, RiListCheck } from "react-icons/ri";

export const menus = [
  { name: "Découvrir", icon: RiGameLine, path: "/", authRequired: false },
  {
    name: "Mes concours",
    icon: RiListCheck,
    path: "/mes-concours",
    authRequired: true,
  },
];
