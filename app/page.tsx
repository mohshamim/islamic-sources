"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Download,
  ArrowRight,
  Sparkles,
  Eye,
  Calendar,
  User,
  TrendingUp,
} from "lucide-react";
import mockData from "@/lib/mock-data.json";

export default function HomePage() {

  return (
    <MainLayout>

      {/* Main Content Area - Two Column Layout - Updated */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Main Content (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Trending Questions */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="w-6 h-6 text-green-600" />
                      <CardTitle className="text-2xl">🔥 Trending Questions</CardTitle>
                    </div>
                    <Link href="/questions">
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                        More
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.questions.slice(0, 5).map((question) => (
                    <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                      <Link href={`/questions/${question.slug}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-green-600 dark:hover:text-green-400">
                          {question.question}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            {question.category}
                          </Badge>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{question.views.toLocaleString()}</span>
                            </div>
                            <span className="text-xs">{new Date(question.date).toLocaleDateString('en-CA')}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Featured Articles */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                      <CardTitle className="text-2xl">📰 Featured Articles</CardTitle>
                    </div>
                    <Link href="/articles">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        More
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.articles.map((article) => (
                    <div key={article.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                        <Link href={`/articles/${article.slug}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{article.readTime} read</span>
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
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
                            <span>{new Date(article.date).toLocaleDateString('en-CA')}</span>
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
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-blue-200 dark:border-gray-600 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <CardTitle className="text-xl text-blue-800 dark:text-blue-300">Latest Courses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Featured Course */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <div className="text-2xl mb-2">📖</div>
                          <h3 className="font-bold text-lg mb-1">Quran & Tafsir</h3>
                          <p className="text-sm opacity-90">Complete Study Course</p>
                        </div>
                      </div>
                      
                      {/* Enroll Now Button */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-4 py-2 shadow-lg">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Books Section */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border-green-200 dark:border-gray-600">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <CardTitle className="text-2xl text-green-800 dark:text-green-300">📚 Books</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.media.filter(m => m.type === "PDF").slice(0, 3).map((book) => (
                    <div key={book.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex space-x-3">
                        <div className="w-16 h-20 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-300" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 line-clamp-2 hover:text-green-600 dark:hover:text-green-400 cursor-pointer">
                            {book.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{book.category}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">{book.size}</span>
                            <div className="flex items-center space-x-1 text-green-600">
                              <Download className="w-3 h-3" />
                              <span>{book.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link href="/media">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      View All Books
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Most Read Section */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    <CardTitle className="text-xl">📊 Most Read</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockData.posts.sort((a, b) => b.views - a.views).slice(0, 5).map((post, index) => (
                    <Link key={post.id} href={`/posts/${post.slug}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                      <div className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400">
                            {post.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Eye className="w-3 h-3" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <Badge variant="secondary" className="text-xs px-1.5 py-0">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 border-blue-200 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800 dark:text-blue-300">📈 Platform Stats</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mockData.stats.totalPosts}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Posts</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{mockData.stats.totalArticles}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Articles</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{mockData.stats.totalQuestions}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Questions</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{mockData.stats.totalMedia}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Media</div>
                  </div>
                </CardContent>
              </Card>

            </div>

          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 dark:from-green-800 dark:via-green-700 dark:to-emerald-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Islamic Learning Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of Muslims worldwide learning authentic Islamic knowledge from qualified scholars.
          </p>
          <div className="flex justify-center">
            <Link href="/articles">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
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