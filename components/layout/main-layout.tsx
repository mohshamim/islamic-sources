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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card/20 to-background dark:from-background dark:via-card/10 dark:to-background flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-islamic-gold border-b-transparent rounded-full animate-spin-slow mx-auto"></div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Islamic Sources
          </h2>
          <p className="text-muted-foreground">Loading knowledge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/20 to-background dark:from-background dark:via-card/10 dark:to-background">
      <Navbar isScrolled={isScrolled} />
      <main className="pt-16">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
