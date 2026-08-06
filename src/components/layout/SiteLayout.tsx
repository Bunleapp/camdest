import { ReactNode } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
