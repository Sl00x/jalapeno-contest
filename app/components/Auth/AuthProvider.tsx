import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useLoginMutation } from "../../features/api/auth-api";
import User from "../../features/models/user.model";

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (userInfos: {
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    birthdate: string;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = (email: string, password: string) => {
    setLoading(true);
    setLoading(false);
  };

  const register = (userInfos: {
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    birthdate: string;
  }) => {
    const { email, password, lastname, firstname, birthdate } = userInfos;
    setLoading(true);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem("authenticated");
    setLoading(false);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
