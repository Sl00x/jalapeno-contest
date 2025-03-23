"use client";

import { RootStore } from "@/features/store/root-store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}

export const ReduxProvider = ({ children }: Props) => {
  return <Provider store={RootStore}>{children}</Provider>;
};
