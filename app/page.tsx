"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard } from "@/components/cards/post-card";
import { QuestionCard } from "@/components/cards/question-card";
import { ArticleCard } from "@/components/cards/article-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  FileText,
  ArrowRight,
  Users,
  Eye,
  TrendingUp,
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
        const statsData = await statsResponse.json();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const quickAccessItems = [
    {
      title: "Posts",
      description: "Islamic articles and posts",
      icon: FileText,
      href: "/posts",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Questions",
      description: "Q&A with scholars",
      icon: HelpCircle,
      href: "/questions",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Articles",
      description: "In-depth Islamic articles",
      icon: BookOpen,
      href: "/articles",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Media",
      description: "Audio, video, and PDFs",
      icon: Users,
      href: "/media",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Islamic Sources
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A comprehensive platform for authentic Islamic knowledge, guided
              by the methodology of the Salaf (righteous predecessors). Discover
              reliable answers, articles, and resources from trusted scholars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/posts">
                <Button size="lg" className="text-lg px-8">
                  Explore Posts
                </Button>
              </Link>
              <Link href="/questions">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Ask Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.counts.posts}
                  </div>
                  <div className="text-sm text-gray-600">Posts</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <HelpCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.counts.questions}
                  </div>
                  <div className="text-sm text-gray-600">Questions</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.counts.articles}
                  </div>
                  <div className="text-sm text-gray-600">Articles</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Eye className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.views.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Quick Access */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Access
            </h2>
            <p className="text-lg text-gray-600">
              Find what you're looking for quickly
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessItems.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Latest Posts
              </h2>
              <p className="text-gray-600">Recent Islamic articles and posts</p>
            </div>
            <Link href="/posts">
              <Button variant="outline">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Posts Yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for new Islamic posts and articles.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Articles
              </h2>
              <p className="text-gray-600">
                In-depth Islamic knowledge and insights
              </p>
            </div>
            <Link href="/articles">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Articles Yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for new Islamic articles and insights.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Popular Questions
              </h2>
              <p className="text-gray-600">
                Common questions answered by scholars
              </p>
            </div>
            <Link href="/questions">
              <Button variant="outline">
                View All Questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {popularQuestions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularQuestions.map((question) => (
                <QuestionCard key={question._id} question={question} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Questions Yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for new Q&A with Islamic scholars.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
