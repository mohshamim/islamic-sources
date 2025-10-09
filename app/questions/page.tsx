"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  ChevronRight,
  HelpCircle,
  Bookmark,
  Download,
  Share2,
  Clock,
  Eye,
  User,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  // Fetch questions from Supabase
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("/api/questions?limit=100");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        // Only show published questions with answers
        const publishedQuestions = (data.questions || []).filter(
          (q: any) => q.published_at !== null && q.answer
        );
        setQuestions(publishedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  // Pagination
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              New Answers
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
                    <HelpCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    New Answers
                  </h1>
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Loading questions...
                      </p>
                    </div>
                  ) : questions.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        No questions found.
                      </p>
                    </div>
                  ) : (
                    currentQuestions.map((question) => (
                      <Card
                        key={question.id}
                        className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                      >
                        {/* Category Badge */}
                        {question.categories && (
                          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 px-4 py-2 border-b border-green-200 dark:border-green-800">
                            <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                              {question.categories.name || "General"}
                            </span>
                          </div>
                        )}

                        <CardContent className="p-6">
                          {/* Question Title */}
                          <Link href={`/questions/${question.slug}`}>
                            <div className="flex items-start gap-3 mb-4">
                              <MessageCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 leading-snug transition-colors">
                                {question.question}
                              </h3>
                            </div>
                          </Link>

                          {/* Summary/Answer Preview */}
                          {(question.summary || question.answer) && (
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed pl-8">
                              {question.summary ||
                                (question.answer &&
                                  question.answer.substring(0, 150) + "...")}
                            </p>
                          )}

                          {/* Scholar Info */}
                          {question.scholars && (
                            <div className="flex items-center gap-2 mb-4 pl-8">
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                                <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                                  {question.scholars.name}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Metadata */}
                          <div className="flex items-center flex-wrap gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-4 pl-8">
                            {question.created_at && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-primary-500" />
                                <span>
                                  {new Date(
                                    question.created_at
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            )}
                            {question.views !== undefined && (
                              <div className="flex items-center gap-1.5">
                                <span>•</span>
                                <Eye className="w-3.5 h-3.5 text-primary-500" />
                                <span>{question.views} views</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-700">
                            <Link href={`/questions/${question.slug}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium"
                              >
                                Read Answer →
                              </Button>
                            </Link>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 p-2"
                                title="Save"
                              >
                                <Bookmark className="w-4 h-4" />
                              </Button>
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
                {!loading && questions.length > questionsPerPage && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="disabled:opacity-50"
                    >
                      ← Previous
                    </Button>

                    {/* Page Info */}
                    <span className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400">
                      Page {currentPage} of {totalPages}
                    </span>

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="disabled:opacity-50"
                    >
                      Next →
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

                {/* Ask Question Card */}
                <Card className="mt-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Have a Question?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      Can&apos;t find what you&apos;re looking for? Submit your
                      question to our scholars.
                    </p>
                    <Link href="/questions/new">
                      <Button className="w-full bg-primary-600 hover:bg-primary-700">
                        Send a Question
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
                          Total Questions
                        </span>
                        <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
                          {questions.length}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          Answered
                        </span>
                        <span className="text-lg font-bold text-green-700 dark:text-green-300">
                          {
                            questions.filter(
                              (q) => q.answer && q.answer.length > 0
                            ).length
                          }
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
