"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Input } from "@/components/ui/input";
import {
  Library,
  Download,
  Share2,
  Search,
  BookOpen,
  Home,
  ChevronRight,
} from "lucide-react";
import mockData from "@/lib/mock-data.json";
import { useState } from "react";
import Link from "next/link";

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories from books
  const categories = [
    "All",
    ...Array.from(new Set(mockData.books.map((book) => book.category))),
  ];

  // Filter books based on search and category
  const filteredBooks = mockData.books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb - Outside Box */}
          <nav className="flex items-center gap-2 mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              href="/"
              className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
            >
              <Home className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-900 dark:text-neutral-100 font-medium">
              Books
            </span>
          </nav>

          {/* Container Box */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <Library className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    Books
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {mockData.stats.totalBooks} Islamic books available for
                    download
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search books by title, author, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Books Grid */}
            {filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                  No books found matching your search
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                  <Card
                    key={book.id}
                    className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Book Thumbnail */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-32 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-lg flex items-center justify-center shadow-md">
                            <BookOpen className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>

                        {/* Book Info */}
                        <div className="flex-1 min-w-0">
                          {/* Category and Size */}
                          <div className="flex items-center gap-2 mb-2">
                            <Tag
                              variant="outline"
                              className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800"
                            >
                              {book.category}
                            </Tag>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              {book.size}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
                            {book.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                            {book.description}
                          </p>

                          {/* Author */}
                          {book.author && (
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-4">
                              By {book.author}
                            </p>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                              >
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                              </Button>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                              <Download className="w-4 h-4" />
                              <span>{book.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Results Count */}
            {filteredBooks.length > 0 && (
              <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
                Showing {filteredBooks.length} of {mockData.books.length} books
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
