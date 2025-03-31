"use client";

import { AccountButton } from "@/components/auth/AccountButton";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MENU_ITEMS } from "@/constants/menu.const";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between items-center px-20 pt-8">
      <div className="flex-1 flex flex-row items-center space-x-4">
        <Image
          src="https://picsum.photos/200"
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="w-full max-w-1/3">
          <Input
            type="text"
            placeholder="Search.."
            icon={<SearchIcon size={16} />}
          />
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {MENU_ITEMS.map(({ label, uri, icon }, index) => (
              <NavigationMenuItem key={index}>
                <Link href={uri} legacyBehavior passHref>
                  <NavigationMenuLink active={pathname === uri}>
                    <div className="flex items-center space-x-2">
                      <span>{label}</span>
                      {icon}
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <AccountButton />
    </div>
  );
};
