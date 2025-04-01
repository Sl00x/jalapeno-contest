import Footer from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
