import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  useGetProfileQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../../features/api/auth-api";
import User from "../../features/models/user.model";
import { ErrorToast, SuccessToast } from "../../utils/toast";

interface AuthContextType {
  user: User | undefined;
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
  const [user, setUser] = useState<User>();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const { data, refetch } = useGetProfileQuery();

  useEffect(() => {
    setUser(data);
  }, [data]);

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
      ErrorToast("Impossible de vous connecter, réessayer !");
    } else {
      //inform user about succes of login
      SuccessToast(`Bonjour, ${email}`);
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
      ErrorToast("Les informations rentrées sont invalide.");
    } else {
      SuccessToast(`Bienvenue parmis nous ${(response as { data: User }).data.email}`);
      await loginUser((response as { data: User }).data.email, password, callback);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem("authenticated");
    setUser(undefined);
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
    [user, loading]
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
