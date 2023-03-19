import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  useGetProfileQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../../features/api/auth-api";
import User from "../../features/models/user.model";
import { ErrorToast } from "../../utils/toast";

interface AuthContextType {
  user: User | undefined | null;
  loading: boolean;
  refetch: () => void;
  loginUser: (email: string, password: string, callback?: { onSuccess?: () => void }) => void;
  registerUser: (
    userInfos: {
      email: string;
      password: string;
      lastname: string;
      firstname: string;
      birthdate: string;
      referrerCode?: string;
    },
    callback?: { onSuccess?: () => void }
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const { data, refetch, isLoading } = useGetProfileQuery();

  const { t } = useTranslation("auth");

  useEffect(() => {
    if (!isLoading) setUser(data ?? null);
  }, [data, isLoading]);

  const loginUser = async (
    email: string,
    password: string,
    callback?: {
      onSuccess?: () => void;
    }
  ) => {
    setLoading(true);
    const response = await login({
      email,
      password,
    });
    if (response.hasOwnProperty("error")) {
      ErrorToast(t("unable_to_connect"));
    } else {
      const token = (response as { data: { access_token: string } }).data.access_token;
      localStorage.setItem("authenticated", token);
      refetch();
      setUser(data);

      // add callback methods if whant to add some feature when login is success
      if (callback && callback.onSuccess) {
        callback.onSuccess();
      }
    }
    setLoading(false);
  };

  const registerUser = async (
    userInfos: {
      email: string;
      password: string;
      lastname: string;
      firstname: string;
      birthdate: string;
      referrerCode?: string;
    },
    callback?: {
      onSuccess?: () => void;
    }
  ) => {
    const { password } = userInfos;
    setLoading(true);
    const response = await register(userInfos);
    if (response.hasOwnProperty("error")) {
      ErrorToast(t("invalid_informations"));
    } else {
      await loginUser((response as { data: User }).data.email, password, callback);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem("authenticated");
    setUser(null);
    setLoading(false);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      refetch,
      loginUser,
      registerUser,
      logout,
    }),
    [user, loading, loginUser, refetch, registerUser]
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
