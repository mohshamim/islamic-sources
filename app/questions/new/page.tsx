"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquarePlus, Send, Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import mockData from "@/lib/mock-data.json";
import { useState } from "react";

export default function NewQuestionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    question: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", category: "", question: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
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
              Send a Question
            </span>
          </nav>

          {/* Container Box */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <MessageSquarePlus className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    Send a Question
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Ask our scholars about Islamic matters
                  </p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-lg">
                <p className="text-primary-800 dark:text-primary-200 font-medium">
                  ✓ Your question has been submitted successfully! Our scholars
                  will review it soon.
                </p>
              </div>
            )}

            {/* Form Card */}
            <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-900 dark:text-neutral-100">
                  Question Submission Form
                </CardTitle>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                  Please provide as much detail as possible to help our scholars
                  give you an accurate answer.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-neutral-900 dark:text-neutral-100"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-neutral-900 dark:text-neutral-100"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600"
                    />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      We&apos;ll send the answer to this email address
                    </p>
                  </div>

                  {/* Category Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-neutral-900 dark:text-neutral-100"
                    >
                      Question Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                      required
                    >
                      <SelectTrigger className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockData.categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.name.toLowerCase()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Question Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="question"
                      className="text-neutral-900 dark:text-neutral-100"
                    >
                      Your Question <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="question"
                      name="question"
                      required
                      value={formData.question}
                      onChange={handleChange}
                      placeholder="Please describe your question in detail..."
                      rows={8}
                      className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 resize-none"
                    />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Minimum 50 characters. Be specific and provide context for
                      better answers.
                    </p>
                  </div>

                  {/* Guidelines */}
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-2">
                      Submission Guidelines:
                    </h3>
                    <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                      <li>• Questions should be clear and specific</li>
                      <li>
                        • Provide relevant context or background information
                      </li>
                      <li>
                        • Avoid asking multiple questions in one submission
                      </li>
                      <li>• Be respectful in your language and tone</li>
                      <li>
                        • Response time may vary (typically 3-7 business days)
                      </li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Question
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData({
                          name: "",
                          email: "",
                          category: "",
                          question: "",
                        })
                      }
                      className="text-neutral-700 dark:text-neutral-300"
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="mt-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                  📚 Before You Submit
                </h3>
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  Please check our{" "}
                  <Link
                    href="/questions"
                    className="underline hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    existing answers
                  </Link>{" "}
                  first - your question might already be answered! You can also
                  browse our{" "}
                  <Link
                    href="/articles"
                    className="underline hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    articles
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/books"
                    className="underline hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    books
                  </Link>{" "}
                  for in-depth Islamic knowledge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
