import { PlusCircleIcon } from "lucide-react";
import { ReactNode } from "react";

export interface MenuItem {
  label: string;
  uri: string;
  icon?: ReactNode;
}

export const MENU_ITEMS: MenuItem[] = [
  { label: "Browse", uri: "/" },
  { label: "Create contest", uri: "/contest/new", icon: <PlusCircleIcon /> },
  { label: "History", uri: "/history" },
];
