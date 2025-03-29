import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SignInButton = () => {
  const router = useRouter();
  const { supabaseUser, signOut } = useAuth();

  return (
    <Button
      onClick={async () => {
        if (supabaseUser) {
          await signOut();
        } else {
          router.push("/auth/login");
        }
      }}
    >
      {supabaseUser ? "Sign out" : "Sign in"}
    </Button>
  );
};
