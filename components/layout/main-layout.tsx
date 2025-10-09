"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { PublicSidebar } from "./public-sidebar";
import { IslamicPattern } from "../ui/islamic-pattern";
import { useState, useEffect } from "react";
import { ScrollToTop } from "../ui/scroll-to-top";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/20 to-background dark:from-background dark:via-card/10 dark:to-background relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <IslamicPattern variant="styleOne" opacity={0.15} className="fixed" />

      <Navbar isScrolled={isScrolled} />
      <PublicSidebar />
      <main className="pt-16 lg:pl-64 relative z-10">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
