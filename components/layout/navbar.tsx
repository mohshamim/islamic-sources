"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReadingModeToggle } from "@/components/ui/reading-mode-toggle";
import { Menu, X, Search, BookOpen, User, Moon, Sun } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
}

export function Navbar({ isScrolled }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Check for saved dark mode preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-600/95 backdrop-blur-md shadow-lg border-b border-primary-200/20 dark:bg-neutral-900/95 dark:border-neutral-700"
          : "bg-primary-600/90 backdrop-blur-sm border-b border-primary-200/20 dark:bg-neutral-900/90 dark:border-neutral-700"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary-600 rounded-md flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Islamic Sources</h1>
              <p className="text-xs text-primary-100 -mt-1">
                Knowledge & Wisdom
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-xl ml-auto mr-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Islamic knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/90 border-white/30 focus:bg-white focus:border-white/50 transition-all duration-200 rounded-md"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Reading Mode Toggle */}
            <ReadingModeToggle />

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-md hover:bg-white/20 text-white transition-all duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-white" />
              )}
            </Button>

            {/* Dashboard Link */}
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="hidden sm:flex items-center space-x-2 border border-white/50 text-white hover:bg-white/20 hover:text-white transition-all duration-200 rounded-md"
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 rounded-md hover:bg-white/20 text-white transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-600/95 dark:bg-neutral-900/95 border-t border-primary-200/20 dark:border-neutral-700 py-4 space-y-4 animate-fade-in-up">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative px-4">
              <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Islamic knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/90 border-white/30 focus:bg-white focus:border-white/50 rounded-md"
              />
            </form>

            {/* Mobile Navigation */}
            <div className="px-4 space-y-2">
              {/* Mobile Reading Mode Toggle */}
              <div className="px-4 py-3">
                <ReadingModeToggle />
              </div>

              {/* Mobile Dashboard Link */}
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/20 rounded-md transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
