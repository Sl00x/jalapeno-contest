import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { UserCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const AccountButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { supabaseUser, signOut } = useAuth();
  const { isConnected, address } = useAppKitAccount();
  const { open: openConnectWallet } = useAppKit();

  const truncatedAddress = `${address?.substring(0, 7)}...${address?.substring(
    address.length - 4
  )}`;

  const hasSearchParams = searchParams.size > 0;

  return (
    <div className="flex items-center space-x-2">
      {!supabaseUser ? (
        <>
          <Button
            onClick={() => {
              router.push(
                `/auth/register?from=${pathname}${
                  hasSearchParams ? "?" : ""
                }${searchParams.toString()}`
              );
            }}
            variant="link"
          >
            Sign up
          </Button>
          <Button
            onClick={async () => {
              router.push(
                `/auth/login?from=${pathname}${
                  hasSearchParams ? "?" : ""
                }${searchParams.toString()}`
              );
            }}
          >
            Sign in
          </Button>
        </>
      ) : (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="cursor-pointer">
            <UserCircle />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-xs">
              {supabaseUser.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openConnectWallet()}>
              {isConnected ? truncatedAddress : "Connect Wallet"}
            </DropdownMenuItem>
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
