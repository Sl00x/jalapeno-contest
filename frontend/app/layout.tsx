import { Navigation } from "@/components/layout/navigation";
import { ReduxProvider } from "@/components/layout/ReduxProvider";
import ContextProvider from "@/context";
import { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smokey Contest",
  description: "Smokey Contest webapp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body className={`${geistMono.className} antialiased`}>
        <ContextProvider cookies={cookies}>
          <ReduxProvider>
            <Navigation />
            {children}
          </ReduxProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
