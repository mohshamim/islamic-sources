"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  HelpCircle,
  Library,
  Download,
  Eye,
  GraduationCap,
  Home,
  ChevronRight,
} from "lucide-react";
import mockData from "@/lib/mock-data.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

interface ScholarPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ScholarPage({ params }: ScholarPageProps) {
  const { slug } = use(params);

  // Find scholar by slug
  const scholar = mockData.scholars.find((s) => s.slug === slug);

  if (!scholar) {
    notFound();
  }

  // Filter content by scholar name
  const scholarArticles = mockData.articles.filter(
    (article) =>
      article.author.toLowerCase().includes(scholar.name.toLowerCase()) ||
      article.author.toLowerCase().includes(scholar.slug.replace("sheikh-", ""))
  );

  const scholarQuestions = mockData.questions.filter(
    (question) =>
      question.answeredBy?.toLowerCase().includes(scholar.name.toLowerCase()) ||
      question.answeredBy
        ?.toLowerCase()
        .includes(scholar.slug.replace("sheikh-", ""))
  );

  const scholarBooks = mockData.books.filter(
    (book) =>
      book.author.toLowerCase().includes(scholar.name.toLowerCase()) ||
      book.author.toLowerCase().includes(scholar.slug.replace("sheikh-", ""))
  );

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
            <Link
              href="/"
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              Scholars
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-900 dark:text-neutral-100 font-medium">
              {scholar.name}
            </span>
          </nav>

          {/* Container Box */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
            {/* Scholar Profile Header */}
            <div className="mb-8">
              <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Scholar Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-primary-600 dark:bg-primary-700 rounded-full flex items-center justify-center shadow-lg">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Scholar Info */}
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        {scholar.name}
                      </h1>
                      <p className="text-lg text-primary-700 dark:text-primary-300 font-medium mb-3">
                        {scholar.title}
                      </p>

                      {/* Specialty */}
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          <strong>Specialty:</strong> {scholar.specialty}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                        {scholar.bio}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg shadow-sm">
                          <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          <div>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                              {scholarArticles.length}
                            </div>
                            <div className="text-xs text-neutral-600 dark:text-neutral-400">
                              Articles
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg shadow-sm">
                          <HelpCircle className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                          <div>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                              {scholarQuestions.length}
                            </div>
                            <div className="text-xs text-neutral-600 dark:text-neutral-400">
                              Answers
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg shadow-sm">
                          <Library className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <div>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                              {scholarBooks.length}
                            </div>
                            <div className="text-xs text-neutral-600 dark:text-neutral-400">
                              Books
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="articles">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Articles ({scholarArticles.length})
                </TabsTrigger>
                <TabsTrigger value="questions">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Answers ({scholarQuestions.length})
                </TabsTrigger>
                <TabsTrigger value="books">
                  <Library className="w-4 h-4 mr-2" />
                  Books ({scholarBooks.length})
                </TabsTrigger>
              </TabsList>

              {/* Articles Tab */}
              <TabsContent value="articles">
                {scholarArticles.length === 0 ? (
                  <div className="text-center py-16">
                    <BookOpen className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-600 dark:text-neutral-400">
                      No articles found from this scholar
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {scholarArticles.map((article) => (
                      <Card
                        key={article.id}
                        className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-2 mb-3">
                            <Badge className="bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              {article.readTime} read
                            </span>
                          </div>

                          <Link href={`/articles/${article.slug}`}>
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                              {article.title}
                            </h3>
                          </Link>

                          <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <span>{article.date}</span>
                            </div>
                            <Link href={`/articles/${article.slug}`}>
                              <Button variant="ghost" size="sm">
                                Read More →
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Questions Tab */}
              <TabsContent value="questions">
                {scholarQuestions.length === 0 ? (
                  <div className="text-center py-16">
                    <HelpCircle className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-600 dark:text-neutral-400">
                      No answers found from this scholar
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {scholarQuestions.map((question) => (
                      <Card
                        key={question.id}
                        className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-2 mb-3">
                            <Badge className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                              {question.category}
                            </Badge>
                          </div>

                          <Link href={`/questions/${question.slug}`}>
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                              {question.question}
                            </h3>
                          </Link>

                          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{question.views.toLocaleString()}</span>
                              </div>
                              <span>{question.date}</span>
                            </div>
                            <Link href={`/questions/${question.slug}`}>
                              <Button variant="ghost" size="sm">
                                View Answer →
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Books Tab */}
              <TabsContent value="books">
                {scholarBooks.length === 0 ? (
                  <div className="text-center py-16">
                    <Library className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-600 dark:text-neutral-400">
                      No books found from this scholar
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {scholarBooks.map((book) => (
                      <Card
                        key={book.id}
                        className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200"
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-24 h-32 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-lg flex items-center justify-center shadow-md">
                                <BookOpen className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="text-xs">
                                  {book.category}
                                </Badge>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {book.size}
                                </span>
                              </div>

                              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
                                {book.title}
                              </h3>

                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                                {book.description}
                              </p>

                              <div className="flex items-center justify-between">
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </Button>
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
