"use client";

import {
  API_TAGS,
  rootApi,
  useCreateUserMutation,
  useGetMeQuery,
} from "@/features/api/root-api";
import { useStoreDispatch } from "@/features/hooks/useStore";
import User from "@/features/models/user.model";
import { createClient } from "@/utils/supabase/client";
import {
  AuthChangeEvent,
  Session,
  User as SupabaseUser,
} from "@supabase/supabase-js";
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
  user: User | null;
  supabaseUser: SupabaseUser | null;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signWithProvider: (provider: AuthProvider) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider = ({ children }: Props) => {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const dispatch = useStoreDispatch();

  const [createUserApi] = useCreateUserMutation();
  const { data: user = null } = useGetMeQuery();

  const createUser = useCallback(
    async (userId: SupabaseUser["id"]) => {
      return createUserApi({ id: userId })
        .then(({ error }) => {
          if (error) {
            return false;
          }
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    [createUserApi]
  );

  const getSupabaseUser = useCallback(
    async (_event: AuthChangeEvent, session: Session | null) => {
      const supabase = createClient();
      const access_token = session?.access_token;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
      } else {
        localStorage.removeItem("access_token");
      }
      dispatch(rootApi.util.invalidateTags(API_TAGS));
      supabase.auth.getUser().then(async ({ data: { user } }) => {
        setSupabaseUser(user);
        if (user) {
          await createUser(user?.id);
        }
      });
    },
    [dispatch, createUser]
  );

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
        })
        .catch(() => {
          toast.error("Unable to register for the moment, please retry later.");
          return false;
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
        .then(async ({ data, error }) => {
          if (error) {
            toast.error(error.message);
            return false;
          }
          if (!data.user) {
            toast.error(
              "Unable to register for the moment, please retry later."
            );
            return false;
          }
          if ((data.user.identities?.length ?? 0) === 0) {
            toast.error("Email already taken.");
            return false;
          }
          toast.success("An email has been sent to validate your account.");
          return true;
        })
        .catch(() => {
          toast.error("Unable to register for the moment, please retry later.");
          return false;
        });
    },
    []
  );

  const signWithProvider = useCallback(async (provider: AuthProvider) => {
    const supabase = createClient();
    return supabase.auth
      .signInWithOAuth({ provider })
      .then(async ({ error }) => {
        if (error) {
          toast.error(error.message);
          return false;
        }
        return true;
      })
      .catch(() => {
        toast.error("Unable to register for the moment, please retry later.");
        return false;
      });
  }, []);

  const signOut = useCallback(async () => {
    const supabase = createClient();
    return supabase.auth
      .signOut()
      .then(({ error }) => {
        if (error) {
          toast.error(error.message);
          return false;
        }
        return true;
      })
      .catch(() => {
        toast.error("An error occured.");
        return false;
      });
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    const supabase = createClient();
    return supabase.auth
      .resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      .then(({ error }) => {
        if (error) {
          toast.error(error.message);
          return false;
        }
        toast.success(
          "If an account exists, an email has been sent. It can take some time.., please check your spams."
        );
        return true;
      })
      .catch(() => {
        toast.error("An error occured.");
        return false;
      });
  }, []);

  const resetPassword = useCallback(async (password: string) => {
    const supabase = createClient();
    return supabase.auth
      .updateUser({ password })
      .then(({ error }) => {
        if (error) {
          toast.error(error.message);
          return false;
        }
        toast.success("Successfully changed password.");
        return true;
      })
      .catch(() => {
        toast.error("Unable to change password.");
        return false;
      });
  }, []);

  const memoedValue = useMemo(
    () => ({
      user,
      supabaseUser,
      signInWithEmail,
      signUpWithEmail,
      signWithProvider,
      signOut,
      forgotPassword,
      resetPassword,
    }),
    [
      user,
      supabaseUser,
      signInWithEmail,
      signWithProvider,
      signUpWithEmail,
      signOut,
      forgotPassword,
      resetPassword,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
