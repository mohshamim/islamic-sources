"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  ChevronRight,
  FileText,
  Download,
  Share2,
  BookOpen,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Clock,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from Supabase
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles?limit=100");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAllArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setAllArticles([]);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

  // Get current page articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = allArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              href="/"
              className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
            >
              <Home className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-900 dark:text-neutral-100 font-medium">
              Articles
            </span>
          </nav>

          {/* Container Box */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Page Title */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    Articles
                  </h1>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loading ? (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Loading articles...
                      </p>
                    </div>
                  ) : allArticles.length === 0 ? (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        No articles found.
                      </p>
                    </div>
                  ) : (
                    currentArticles.map((article) => (
                      <Card
                        key={article.id}
                        className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                      >
                        {/* Category Badge */}
                        {article.categories && (
                          <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 px-4 py-2 border-b border-primary-200 dark:border-primary-800">
                            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wide">
                              {article.categories.name || "General"}
                            </span>
                          </div>
                        )}

                        <CardContent className="p-6">
                          {/* Article Title */}
                          <Link href={`/articles/${article.slug}`}>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-3 line-clamp-2 leading-snug transition-colors">
                              {article.title}
                            </h3>
                          </Link>

                          {/* Excerpt */}
                          {article.excerpt && (
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
                              {article.excerpt}
                            </p>
                          )}

                          {/* Metadata */}
                          <div className="flex items-center flex-wrap gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                            {article.read_time && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-primary-500" />
                                <span>{article.read_time}</span>
                              </div>
                            )}
                            {article.created_at && (
                              <div className="flex items-center gap-1">
                                <span>•</span>
                                <span>
                                  {new Date(
                                    article.created_at
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            )}
                            {article.views !== undefined && (
                              <div className="flex items-center gap-1.5">
                                <span>•</span>
                                <Eye className="w-3.5 h-3.5 text-primary-500" />
                                <span>{article.views}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-700">
                            <Link href={`/articles/${article.slug}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium"
                              >
                                Read More →
                              </Button>
                            </Link>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 p-2"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 p-2"
                                title="Share"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {!loading && allArticles.length > articlesPerPage && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-3 py-2 text-neutral-500"
                        >
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page as number)}
                          className={
                            currentPage === page
                              ? "bg-primary-600 text-white hover:bg-primary-700"
                              : ""
                          }
                        >
                          {page}
                        </Button>
                      )
                    )}

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="disabled:opacity-50"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1">
                {/* Featured Card */}
                <Card className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 border-amber-300 dark:border-amber-700 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">
                        Registration is now open
                      </h3>
                      <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-4">
                        Islamic Academy
                      </h2>

                      {/* Placeholder for image/logo */}
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-8 mb-4">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-xl">
                          <span className="text-5xl text-white">📚</span>
                        </div>
                      </div>

                      <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 shadow-lg">
                        Register now for free
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Explore More Card */}
                <Card className="mt-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      Explore More
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/questions">
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      >
                        Browse Questions
                      </Button>
                    </Link>
                    <Link href="/books">
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      >
                        Islamic Books
                      </Button>
                    </Link>
                    <Link href="/media">
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      >
                        Media Library
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card className="mt-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          Total Articles
                        </span>
                        <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
                          {allArticles.length}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          Categories
                        </span>
                        <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
                          12+
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
