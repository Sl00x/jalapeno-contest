import { AuthProvider } from "@/components/auth/AuthProvider";
import { ReduxProvider } from "@/components/layout/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
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
        <main>
          <ContextProvider cookies={cookies}>
            <ReduxProvider>
              <AuthProvider>{children}</AuthProvider>
            </ReduxProvider>
          </ContextProvider>
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
