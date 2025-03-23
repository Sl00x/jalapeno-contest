import {
  RiDashboardLine,
  RiGameLine,
  RiInformationLine,
  RiListCheck,
} from "react-icons/ri";

export interface MenuItem {
  name: string;
  icon: any;
  path: string;
  position?: "top" | "bottom";
  authRequired?: boolean;
}

export const menus = [
  {
    name: "discover",
    icon: RiGameLine,
    path: "/",
  },
  {
    name: "my_contests",
    icon: RiListCheck,
    path: "/mycontests",
    authRequired: true,
  },
  {
    name: "my_dashboard",
    icon: RiDashboardLine,
    path: "/dashboard",
    authRequired: true,
  },
  {
    name: "informations",
    icon: RiInformationLine,
    path: "/informations",
    position: "bottom",
  },
] satisfies MenuItem[];
