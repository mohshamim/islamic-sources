"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  HelpCircle,
  Music,
  ChevronDown,
  ChevronRight,
  Home,
  Folder,
  Menu,
  X,
  Library,
  MessageSquarePlus,
  Users,
  MessageCircle,
  Send,
} from "lucide-react";
import mockData from "@/lib/mock-data.json";

export function PublicSidebar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isScholarOpen, setIsScholarOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form and close after 2 seconds
    setTimeout(() => {
      setFeedbackData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
      setFeedbackOpen(false);
    }, 2000);
  };

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "New Answers", href: "/questions", icon: HelpCircle, badge: "New" },
    { name: "Articles", href: "/articles", icon: BookOpen },
    { name: "Books", href: "/books", icon: Library },
    { name: "Media Library", href: "/media", icon: Music },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden bg-primary-600 hover:bg-primary-700 text-white shadow-lg rounded-md transition-all duration-200"
        size="icon"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 border-r border-primary-200 dark:border-neutral-700 overflow-y-auto z-40 transition-transform duration-300 ${
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
                className="flex items-center justify-between px-3 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-primary-200 dark:hover:bg-neutral-700 rounded-md transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <Badge className="bg-primary-600 text-white text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          <div className="border-t border-primary-300 dark:border-neutral-600"></div>

          {/* Categories */}
          <div className="space-y-2">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-primary-200 dark:hover:bg-neutral-700 rounded-md transition-all duration-200"
            >
              <div className="flex items-center space-x-2 font-semibold">
                <Folder className="w-5 h-5 text-primary-600 dark:text-primary-400" />
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
                    href={`/categories/${category.name
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-primary-200 dark:hover:bg-neutral-700 rounded-md transition-all duration-200 group"
                  >
                    <span className="group-hover:text-primary-700 dark:group-hover:text-primary-400">
                      {category.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Scholars */}
          <div className="space-y-2">
            <button
              onClick={() => setIsScholarOpen(!isScholarOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-primary-200 dark:hover:bg-neutral-700 rounded-md transition-all duration-200"
            >
              <div className="flex items-center space-x-2 font-semibold">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>Scholars wise</span>
              </div>
              {isScholarOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isScholarOpen && (
              <div className="space-y-1 pl-4">
                {mockData.scholars.map((scholar) => (
                  <Link
                    key={scholar.id}
                    href={`/scholars/${scholar.slug}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-primary-200 dark:hover:bg-neutral-700 rounded-md transition-all duration-200 group"
                  >
                    <span className="group-hover:text-primary-700 dark:group-hover:text-primary-400 line-clamp-1">
                      {scholar.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 flex-shrink-0 ml-2">
                      {scholar.count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-primary-300 dark:border-neutral-600"></div>

          {/* Send a Question */}
          <div className="pt-2 space-y-1">
            <Link
              href="/questions/new"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-primary-200 dark:hover:bg-neutral-700 rounded-md transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <MessageSquarePlus className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="font-medium">Send a question</span>
              </div>
            </Link>

            {/* Send us Feedback */}
            <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between px-3 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-primary-200 dark:hover:bg-neutral-700 rounded-md transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="font-medium">Send us feedback</span>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Send us Feedback</DialogTitle>
                  <DialogDescription>
                    We value your feedback! Let us know how we can improve.
                  </DialogDescription>
                </DialogHeader>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-lg">
                    <p className="text-primary-800 dark:text-primary-200 font-medium text-sm">
                      ✓ Thank you for your feedback! We appreciate your input.
                    </p>
                  </div>
                )}

                {/* Feedback Form */}
                {!isSubmitted && (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="feedback-name">Name</Label>
                      <Input
                        id="feedback-name"
                        type="text"
                        required
                        value={feedbackData.name}
                        onChange={(e) =>
                          setFeedbackData({
                            ...feedbackData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Your name"
                        className="bg-white dark:bg-neutral-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-email">Email</Label>
                      <Input
                        id="feedback-email"
                        type="email"
                        required
                        value={feedbackData.email}
                        onChange={(e) =>
                          setFeedbackData({
                            ...feedbackData,
                            email: e.target.value,
                          })
                        }
                        placeholder="your.email@example.com"
                        className="bg-white dark:bg-neutral-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-message">Message</Label>
                      <Textarea
                        id="feedback-message"
                        required
                        value={feedbackData.message}
                        onChange={(e) =>
                          setFeedbackData({
                            ...feedbackData,
                            message: e.target.value,
                          })
                        }
                        placeholder="Tell us what you think..."
                        rows={6}
                        className="bg-white dark:bg-neutral-900 resize-none"
                      />
                    </div>

                    <DialogFooter>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Feedback
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
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
