"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-card/20 to-background dark:from-background dark:via-card/10 dark:to-background">
      <Navbar isScrolled={isScrolled} />
      <main className="pt-16">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
