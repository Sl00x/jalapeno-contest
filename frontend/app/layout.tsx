import { RootStore } from "@/features/store/root-store";
import { Metadata } from "next";
import { Provider } from "react-redux";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smokey Contest",
  description: "Smokey Contest webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={RootStore}>{children}</Provider>
      </body>
    </html>
  );
}
