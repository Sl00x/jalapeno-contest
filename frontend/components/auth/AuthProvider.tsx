"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

type AuthProvider = "google";

interface AuthContextProps {
  supabaseUser: User | null;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signWithProvider: (provider: AuthProvider) => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider = ({ children }: Props) => {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);

  const getSupabaseUser = useCallback(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setSupabaseUser(user));
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange(getSupabaseUser);
  }, [getSupabaseUser]);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      const supabase = createClient();
      return supabase.auth
        .signInWithPassword({ email, password })
        .then(({ error }) => {
          if (error) {
            toast.error(error.message);
            return false;
          }
          return true;
        });
    },
    []
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      const supabase = createClient();
      return supabase.auth
        .signUp({
          email,
          password,
        })
        .then(({ error }) => {
          if (error) {
            toast.error(error.message);
            return false;
          }
          return true;
        });
    },
    []
  );

  const signWithProvider = useCallback(async (provider: AuthProvider) => {
    const supabase = createClient();
    return supabase.auth.signInWithOAuth({ provider }).then(({ error }) => {
      if (error) {
        toast.error(error.message);
        return false;
      }
      return true;
    });
  }, []);

  const signOut = useCallback(async () => {
    const supabase = createClient();
    return supabase.auth.signOut().then(({ error }) => {
      if (error) {
        toast.error(error.message);
        return false;
      }
      return true;
    });
  }, []);

  const memoedValue = useMemo(
    () => ({
      supabaseUser,
      signInWithEmail,
      signUpWithEmail,
      signWithProvider,
      signOut,
    }),
    [supabaseUser, signInWithEmail, signWithProvider]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
