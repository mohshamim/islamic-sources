"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "@/components/cards/post-card";
import { QuestionCard } from "@/components/cards/question-card";
import { ArticleCard } from "@/components/cards/article-card";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  FileText,
  ArrowRight,
  Users,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Globe,
  Shield,
  Heart,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  views: number;
  slug: string;
  createdAt: string;
}

interface Question {
  _id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  scholar: string;
  views: number;
  slug: string;
  createdAt: string;
}

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readTime: number;
  views: number;
  slug: string;
  createdAt: string;
}

interface Stats {
  counts: {
    posts: number;
    questions: number;
    articles: number;
    media: number;
    total: number;
  };
  views: {
    total: number;
    posts: number;
    questions: number;
    articles: number;
  };
}

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [popularQuestions, setPopularQuestions] = useState<Question[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest posts
        const postsResponse = await fetch(
          "/api/posts?limit=3&status=published"
        );
        const postsData = await postsResponse.json();
        setLatestPosts(postsData.posts || []);

        // Fetch featured articles
        const articlesResponse = await fetch(
          "/api/articles?limit=3&status=published"
        );
        const articlesData = await articlesResponse.json();
        setFeaturedArticles(articlesData.articles || []);

        // Fetch popular questions
        const questionsResponse = await fetch(
          "/api/questions?limit=3&status=published"
        );
        const questionsData = await questionsResponse.json();
        setPopularQuestions(questionsData.questions || []);

        // Fetch stats
        const statsResponse = await fetch("/api/stats");
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Authentic Sources",
      description: "Content verified by qualified Islamic scholars and experts",
      color: "text-islamic-green",
    },
    {
      icon: Shield,
      title: "Reliable Information",
      description: "Accurate Islamic knowledge based on Quran and Sunnah",
      color: "text-islamic-blue",
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Questions and answers from the Muslim community",
      color: "text-islamic-gold",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Available worldwide in multiple languages",
      color: "text-primary",
    },
  ];

  const categories = [
    {
      name: "Fiqh",
      icon: BookOpen,
      count: 45,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Aqeedah",
      icon: Shield,
      count: 32,
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Hadith",
      icon: FileText,
      count: 28,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Tafsir",
      icon: BookOpen,
      count: 23,
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: "Seerah",
      icon: Users,
      count: 19,
      color: "bg-red-100 text-red-800",
    },
    {
      name: "General",
      icon: HelpCircle,
      count: 67,
      color: "bg-gray-100 text-gray-800",
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Islamic knowledge...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-card via-background to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto container-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Trusted Islamic Knowledge Platform
              </span>
            </div>

            <h1 className="text-responsive-xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Discover Authentic{" "}
              <span className="text-gradient">Islamic Knowledge</span>
              <br />
              From Qualified Scholars
            </h1>

            <p className="text-responsive-base text-gray-600 dark:text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Access verified Islamic articles, answers to religious questions,
              and authentic sources from renowned scholars. Your gateway to
              understanding Islam through reliable knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/articles">
                <Button
                  size="lg"
                  className="bg-primary hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/questions">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Ask Questions
                </Button>
              </Link>
            </div>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {[
                  {
                    label: "Articles",
                    value: stats.counts.articles,
                    icon: BookOpen,
                  },
                  { label: "Posts", value: stats.counts.posts, icon: FileText },
                  {
                    label: "Questions",
                    value: stats.counts.questions,
                    icon: HelpCircle,
                  },
                  {
                    label: "Media",
                    value: stats.counts.media,
                    icon: TrendingUp,
                  },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white dark:bg-card">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Islamic Sources?
            </h2>
            <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
              We provide authentic, reliable Islamic knowledge through a
              comprehensive platform designed for seekers of truth and wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-gradient-to-r from-muted via-card to-muted">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold text-gray-900 dark:text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
              Navigate through different areas of Islamic knowledge and find
              content that matches your interests and learning goals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/${category.name.toLowerCase()}`}
              >
                <Card className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-4">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {category.count} items
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content Sections */}
      <section className="section-padding bg-white dark:bg-card">
        <div className="container mx-auto container-padding">
          {/* Featured Articles */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-responsive-lg font-bold text-gray-900 dark:text-white mb-2">
                  Featured Articles
                </h2>
                <p className="text-gray-600 dark:text-gray-200">
                  In-depth Islamic knowledge and insights
                </p>
              </div>
              <Link href="/articles">
                <Button variant="outline" className="group">
                  View All
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>

          {/* Latest Posts */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-responsive-lg font-bold text-gray-900 dark:text-white mb-2">
                  Latest Posts
                </h2>
                <p className="text-gray-600 dark:text-gray-200">
                  Recent Islamic discussions and insights
                </p>
              </div>
              <Link href="/posts">
                <Button variant="outline" className="group">
                  View All
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>

          {/* Popular Questions */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-responsive-lg font-bold text-gray-900 dark:text-white mb-2">
                  Popular Questions
                </h2>
                <p className="text-gray-600 dark:text-gray-200">
                  Common Islamic questions answered by scholars
                </p>
              </div>
              <Link href="/questions">
                <Button variant="outline" className="group">
                  View All
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularQuestions.map((question) => (
                <QuestionCard key={question._id} question={question} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-responsive-lg font-bold text-white mb-4">
            Ready to Deepen Your Islamic Knowledge?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Muslims worldwide who are expanding their
            understanding of Islam through our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <User className="w-5 h-5 mr-2" />
                Access Dashboard
              </Button>
            </Link>
            <Link href="/questions/new">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                Ask a Question
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
