"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  X,
  Search,
  BookOpen,
  User,
  Moon,
  Sun,
} from "lucide-react";

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
          ? "bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary/20 dark:bg-card/95 dark:border-border"
          : "bg-primary/90 backdrop-blur-sm border-b border-primary/20 dark:bg-card/90 dark:border-border"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Islamic Sources
              </h1>
              <p className="text-xs text-gray-800 dark:text-white/90 -mt-1">
                Knowledge & Wisdom
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-xl ml-auto mr-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Islamic knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/90 border-white/30 focus:bg-white focus:border-white/50 transition-all duration-200"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/20 text-gray-900 dark:text-white transition-colors duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
            </Button>

            {/* Dashboard Link */}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden sm:flex items-center space-x-2 border-gray-800 dark:border-white/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 hover:text-gray-700 dark:hover:text-white/90 transition-all duration-200"
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
              className="md:hidden w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/20 text-gray-900 dark:text-white transition-colors duration-200"
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
           <div className="md:hidden bg-primary/95 dark:bg-card/95 border-t border-primary/20 dark:border-border py-4 space-y-4 animate-fade-in-up">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative px-4">
              <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Islamic knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/90 border-white/30 focus:bg-white focus:border-white/50"
              />
            </form>

            {/* Mobile Navigation */}
            <div className="px-4 space-y-2">
              {/* Mobile Dashboard Link */}
              <Link
                 href="/dashboard"
                 onClick={() => setIsMenuOpen(false)}
                 className="flex items-center space-x-3 px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 rounded-lg transition-colors duration-200"
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
