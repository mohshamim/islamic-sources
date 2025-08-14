"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Music,
  Plus,
  Eye,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Stats {
  totalPosts: number;
  totalQuestions: number;
  totalArticles: number;
  totalMedia: number;
  totalViews: number;
  recentActivity: {
    posts: Array<{
      _id: string;
      title: string;
      status: string;
      createdAt: string;
      views: number;
    }>;
    questions: Array<{
      _id: string;
      question: string;
      status: string;
      createdAt: string;
      views: number;
    }>;
    articles: Array<{
      _id: string;
      title: string;
      status: string;
      createdAt: string;
      views: number;
    }>;
    media: Array<{
      _id: string;
      title: string;
      status: string;
      createdAt: string;
      views: number;
    }>;
  };
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    return status === "published" ? "text-green-600" : "text-yellow-600";
  };

  const getStatusText = (status: string) => {
    return status === "published" ? "Published" : "Draft";
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to your Islamic Sources management dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalPosts || 0}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Questions
              </CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.totalQuestions || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Articles
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.totalArticles || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Media</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalMedia || 0}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/posts/new">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </Link>
              <Link href="/dashboard/articles/new">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Article
                </Button>
              </Link>
              <Link href="/dashboard/questions/new">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Question
                </Button>
              </Link>
              <Link href="/dashboard/media/new">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Media
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity.posts.map((post) => (
                  <div
                    key={post._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className={getStatusColor(post.status)}>
                          {getStatusText(post.status)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link href={`/dashboard/posts/${post._id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Recent Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity.questions.map((question) => (
                  <div
                    key={question._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {question.question}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className={getStatusColor(question.status)}>
                          {question.status === "published"
                            ? "Answered"
                            : "Draft"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {question.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link href={`/dashboard/questions/${question._id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity.articles.map((article) => (
                  <div
                    key={article._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className={getStatusColor(article.status)}>
                          {getStatusText(article.status)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link href={`/dashboard/articles/${article._id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Recent Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity.media.map((media) => (
                  <div
                    key={media._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {media.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className={getStatusColor(media.status)}>
                          {media.status === "published" ? "Uploaded" : "Draft"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {media.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(media.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link href={`/dashboard/media/${media._id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
