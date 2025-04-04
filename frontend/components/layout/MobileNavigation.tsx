"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MENU_ITEMS } from "@/constants/menu.const";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="cursor-pointer">
        {isOpen ? <X /> : <Menu />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {MENU_ITEMS.map(({ label, uri }, index) => (
          <DropdownMenuItem key={index} onClick={() => router.push(uri)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
