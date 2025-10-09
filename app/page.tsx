"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  Download,
  ArrowRight,
  Eye,
  User,
  TrendingUp,
} from "lucide-react";
import mockData from "@/lib/mock-data.json";

export default function HomePage() {
  return (
    <MainLayout>
      {/* Main Content Area - Two Column Layout - Updated */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trending Questions */}
              <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="w-6 h-6 text-primary-600" />
                      <CardTitle className="text-2xl">
                        Trending Questions
                      </CardTitle>
                    </div>
                    <Link href="/questions">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      >
                        More
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.questions.slice(0, 5).map((question) => (
                    <div
                      key={question.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                    >
                      <Link
                        href={`/questions/${question.slug}`}
                        className="block hover:bg-neutral-50 dark:hover:bg-neutral-700/50 p-3 rounded-md transition-all duration-200"
                      >
                        <h3 className="font-medium text-neutral-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400">
                          {question.question}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
                          <Badge className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                            {question.category}
                          </Badge>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{question.views.toLocaleString()}</span>
                            </div>
                            <span className="text-xs">
                              {new Date(question.date).toLocaleDateString(
                                "en-CA"
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Featured Articles */}
              <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-6 h-6 text-secondary-600" />
                      <CardTitle className="text-2xl">
                        Featured Articles
                      </CardTitle>
                    </div>
                    <Link href="/articles">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-900/20"
                      >
                        More
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.articles.slice(0, 5).map((article) => (
                    <div
                      key={article.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                    >
                      <Link
                        href={`/articles/${article.slug}`}
                        className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {article.readTime} read
                          </span>
                        </div>
                        <h3 className="font-medium text-neutral-900 dark:text-white mb-2 hover:text-secondary-600 dark:hover:text-secondary-400">
                          {article.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <User className="w-3 h-3" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            <span>
                              {new Date(article.date).toLocaleDateString(
                                "en-CA"
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar (1/3 width) */}
            <div className="space-y-6">
              {/* Course Announcement Card */}
              <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <CardTitle className="text-xl text-primary-800 dark:text-primary-300 font-bold">
                      Latest Courses
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Featured Course */}
                    <div className="relative h-56 overflow-hidden">
                      <div className="h-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-600 dark:via-primary-700 dark:to-primary-800 flex items-center justify-center relative">
                        {/* Decorative Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)",
                            }}
                          ></div>
                        </div>

                        <div className="text-center text-white p-6 relative z-10">
                          <div className="text-4xl mb-3 animate-bounce">📖</div>
                          <h3 className="font-bold text-2xl mb-2 drop-shadow-md">
                            Quran & Tafsir
                          </h3>
                          <p className="text-sm opacity-95 mb-6 font-medium">
                            Complete Study Course
                          </p>

                          {/* Enroll Now Button */}
                          <Button className="bg-white text-primary-600 hover:bg-primary-50 hover:scale-105 font-bold px-6 py-2.5 shadow-xl rounded-lg transition-all duration-200">
                            Enroll Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Books Section */}
              <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-800 dark:to-neutral-700 border-primary-200 dark:border-neutral-600 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <CardTitle className="text-2xl text-primary-800 dark:text-primary-300">
                      Books
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.media
                    .filter((m) => m.type === "PDF")
                    .slice(0, 3)
                    .map((book) => (
                      <div
                        key={book.id}
                        className="bg-white dark:bg-neutral-800 p-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex space-x-3">
                          <div className="w-16 h-20 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-300" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-1 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                              {book.title}
                            </h4>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                              {book.category}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-neutral-500">
                                {book.size}
                              </span>
                              <div className="flex items-center space-x-1 text-primary-600">
                                <Download className="w-3 h-3" />
                                <span>{book.downloads.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <Link href="/media">
                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-all duration-200">
                      View All Books
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Most Read Section */}
              <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                    <CardTitle className="text-xl">
                      Most Read Articles
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockData.articles
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((article, index) => (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="block hover:bg-neutral-50 dark:hover:bg-neutral-700/50 p-2 rounded-md transition-all duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-2 hover:text-accent-600 dark:hover:text-accent-400">
                              {article.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1 text-xs text-neutral-500">
                                <Eye className="w-3 h-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <span className="text-xs text-neutral-400">
                                •
                              </span>
                              <Badge
                                variant="secondary"
                                className="text-xs px-1.5 py-0"
                              >
                                {article.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
                  <CardTitle className="text-xl text-primary-800 dark:text-primary-300 font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Platform Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-4 rounded-xl text-center border border-primary-200 dark:border-primary-800 hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                      {mockData.stats.totalArticles}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      Articles
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-xl text-center border border-amber-200 dark:border-amber-800 hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                      {mockData.stats.totalQuestions}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      Questions
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl text-center border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {mockData.stats.totalBooks}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      Books
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-xl text-center border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      {mockData.stats.totalMedia}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      Media
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 dark:from-primary-800 dark:via-primary-700 dark:to-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Islamic Learning Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of Muslims worldwide learning authentic Islamic
            knowledge from qualified scholars.
          </p>
          <div className="flex justify-center">
            <Link href="/articles">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-neutral-100 shadow-lg rounded-md transition-all duration-200"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Content
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
