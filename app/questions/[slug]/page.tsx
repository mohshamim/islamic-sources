"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Share2,
  Search,
  Globe,
  Type,
  Bookmark,
  Download,
  Printer,
  ChevronDown,
  Check,
  Home,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import mockData from "@/lib/mock-data.json";
import { use, useState } from "react";

interface Question {
  id: number;
  slug: string;
  question: string;
  answer: string;
  summary?: string; // Optional summary field
  category: string;
  tags: string[];
  status: string;
  askedBy: string;
  answeredBy: string;
  views: number;
  date: string;
}

interface QuestionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function QuestionPage({ params }: QuestionPageProps) {
  const { slug } = use(params);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const languages = [
    { code: "EN", name: "English" },
    { code: "RM", name: "Roman" },
    { code: "HI", name: "Hindi" },
    { code: "NP", name: "Nepali" },
    { code: "UR", name: "Urdu" },
    { code: "AR", name: "Arabic" },
  ];
  const question = mockData.questions.find(
    (q) => q.slug === slug && q.status === "answered"
  ) as Question | undefined;

  if (!question) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation - Outside Box */}
        <nav className="flex items-center gap-2 mb-6 max-w-4xl mx-auto text-sm text-neutral-600 dark:text-neutral-400">
          <Link
            href="/"
            className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
          >
            <Home className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href="/questions"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Topics
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/questions?category=${question.category.toLowerCase()}`}
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            {question.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-500 dark:text-neutral-500 line-clamp-1">
            {question.question}
          </span>
        </nav>

        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
          <article className="w-full">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Tag variant="outline">{question.category}</Tag>
              </div>
              <h1 className="text-3xl font-bold mb-6">{question.question}</h1>
            </header>

            <Separator className="mb-8" />

            {/* Utility Bar */}
            <div className="mb-6">
              <div className="flex items-stretch bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Share this content"
                >
                  <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Share</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Search within content"
                >
                  <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Search</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Text formatting options"
                >
                  <Type className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Format</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Save for later"
                >
                  <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Save</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Download content"
                >
                  <Download className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Download</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Print this page"
                >
                  <Printer className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Print</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-6 py-3.5 rounded-none transition-all duration-200 group min-w-[90px]"
                      title="Change language"
                    >
                      <span className="text-sm font-semibold">
                        {selectedLanguage}
                      </span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 animate-none"
                    sideOffset={8}
                    alignOffset={0}
                  >
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <span>{lang.name}</span>
                        {selectedLanguage === lang.code && (
                          <Check className="w-4 h-4 text-primary-600" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Question Content */}
            <div className="mb-8">
              <div className="question-content bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="question-number text-yellow-800 dark:text-yellow-200 text-sm font-medium mb-3">
                  Question: {question.id}
                </div>
                <div
                  className="question-text islamic-content text-neutral-800 dark:text-neutral-200"
                  dangerouslySetInnerHTML={{ __html: question.question }}
                />
              </div>
            </div>

            {/* Summary Section (Optional) */}
            {question.summary && (
              <div className="mb-8">
                <div className="summary-header bg-primary-600 dark:bg-primary-700 text-white px-4 py-3 rounded-t-lg">
                  <h3 className="text-lg font-semibold">Summary of answer</h3>
                </div>
                <div className="summary-content bg-primary-50 dark:bg-primary-950/30 p-6 rounded-b-lg border border-primary-200 dark:border-primary-800 border-t-0">
                  <div
                    className="summary-text islamic-content text-neutral-800 dark:text-neutral-200"
                    dangerouslySetInnerHTML={{ __html: question.summary }}
                  />
                </div>
              </div>
            )}

            {/* Answer Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
                Answer
              </h2>
              <div className="answer-content">
                <div className="islamic-content mb-4">
                  <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-6">
                    Praise be to Allah, and blessings and peace be upon the
                    Messenger of Allah.
                  </p>
                </div>
                <div className="qa-content">
                  <div
                    className="answer islamic-content text-neutral-800 dark:text-neutral-200"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />
                </div>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Tags */}
            {question.tags && question.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Tag key={tag} variant="secondary">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Related Questions */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">
                Related Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* We&apos;ll implement related questions functionality later */}
                <Card>
                  <CardContent className="p-6">
                    <p className="text-neutral-500 dark:text-neutral-400 text-center">
                      Related questions will appear here
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to Action */}
            <Card className="mt-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                  Have a Question?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Can&apos;t find what you&apos;re looking for? Submit your
                  question to our scholars.
                </p>
                <Link href="/dashboard/questions/new">
                  <Button>Submit Your Question</Button>
                </Link>
              </CardContent>
            </Card>
          </article>
        </div>
      </div>
    </MainLayout>
  );
}
