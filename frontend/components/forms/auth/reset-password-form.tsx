"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const { resetPassword } = useAuth();
  const router = useRouter();

  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    confirmPasswordRef.current?.setCustomValidity(
      password !== confPassword ? "Passwords do not match." : ""
    );
  }, [confirmPasswordRef.current, password, confPassword]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">RESET PASSWORD</CardTitle>
        </CardHeader>
        <CardContent>
          {!params.get("error") ? (
            <form
              onSubmit={async (event) => {
                setLoading(true);
                event.preventDefault();
                if (await resetPassword(password)) {
                  router.push("/");
                }
                setLoading(false);
              }}
            >
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Confirmation Password</Label>
                    <Input
                      id="confpassword"
                      type="password"
                      required
                      ref={confirmPasswordRef}
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Spinner /> : "Reset Password"}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {params.get("error_description") || "Error"}
                </AlertDescription>
              </Alert>
              <Button
                className="mt-4 w-full"
                onClick={() => router.push("/auth/login")}
              >
                Back to sign in
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
