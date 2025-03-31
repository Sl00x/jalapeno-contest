import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SignInButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { supabaseUser, signOut } = useAuth();

  const hasSearchParams = searchParams.size > 0;

  return (
    <div className="flex items-center space-x-2">
      {!supabaseUser && (
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
      )}
      <Button
        onClick={async () => {
          if (supabaseUser) {
            await signOut();
          } else {
            router.push(
              `/auth/login?from=${pathname}${
                hasSearchParams ? "?" : ""
              }${searchParams.toString()}`
            );
          }
        }}
      >
        {supabaseUser ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};
