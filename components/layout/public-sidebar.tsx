"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Music,
  ChevronDown,
  ChevronRight,
  Home,
  Folder,
  FileArchive,
  Menu,
  X,
} from "lucide-react";
import mockData from "@/lib/mock-data.json";

export function PublicSidebar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "New Answers", href: "/questions", icon: HelpCircle, badge: "New" },
    { name: "Articles", href: "/articles", icon: BookOpen },
    { name: "Posts", href: "/posts", icon: FileText },
    { name: "Media Library", href: "/media", icon: Music },
    { name: "Knowledge Files", href: "/media", icon: FileArchive },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden bg-green-600 hover:bg-green-700 text-white shadow-lg"
        size="icon"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 border-r border-green-200 dark:border-gray-700 overflow-y-auto z-40 transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-green-200 dark:hover:bg-gray-700 rounded-lg transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <Badge className="bg-green-600 text-white text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          <div className="border-t border-green-300 dark:border-gray-600"></div>

          {/* Categories */}
          <div className="space-y-2">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-green-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2 font-semibold">
                <Folder className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>Category wise</span>
              </div>
              {isCategoryOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isCategoryOpen && (
              <div className="space-y-1 pl-4">
                {mockData.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.name.toLowerCase().replace(/ /g, "-")}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-green-200 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <span className="group-hover:text-green-700 dark:group-hover:text-green-400">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
}

