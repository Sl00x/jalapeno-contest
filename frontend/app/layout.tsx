import { ReduxProvider } from "@/components/layout/ReduxProvider";
import { Metadata } from "next";
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
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
