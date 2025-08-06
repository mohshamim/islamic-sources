"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Music, 
  Plus,
  Users,
  Eye,
  TrendingUp,
  Clock
} from "lucide-react";
import { useEffect, useState } from "react";

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
    media: number;
  };
  recentActivity: {
    posts: any[];
    questions: any[];
    articles: any[];
    media: any[];
  };
}

const quickActions = [
  {
    title: "Create New Post",
    description: "Add a new Islamic post or guide",
    href: "/dashboard/posts/new",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Add Q&A",
    description: "Create a new question and answer",
    href: "/dashboard/questions/new",
    icon: HelpCircle,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Write Article",
    description: "Create a new scholarly article",
    href: "/dashboard/articles/new",
    icon: BookOpen,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Upload Media",
    description: "Upload audio, video, or PDF files",
    href: "/dashboard/media/new",
    icon: Music,
    color: "bg-orange-500 hover:bg-orange-600",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Combine recent activity from all types
  const getRecentActivity = () => {
    if (!stats) return [];
    
    const activities = [];
    
    // Add recent posts
    stats.recentActivity.posts.forEach((post: any) => {
      activities.push({
        type: "Post",
        title: post.title,
        date: new Date(post.createdAt).toLocaleDateString(),
        status: post.status === 'published' ? 'Published' : 'Draft',
      });
    });
    
    // Add recent questions
    stats.recentActivity.questions.forEach((question: any) => {
      activities.push({
        type: "Question",
        title: question.question.substring(0, 50) + "...",
        date: new Date(question.createdAt).toLocaleDateString(),
        status: question.status === 'published' ? 'Answered' : 'Draft',
      });
    });
    
    // Add recent articles
    stats.recentActivity.articles.forEach((article: any) => {
      activities.push({
        type: "Article",
        title: article.title,
        date: new Date(article.createdAt).toLocaleDateString(),
        status: article.status === 'published' ? 'Published' : 'Draft',
      });
    });
    
    // Add recent media
    stats.recentActivity.media.forEach((media: any) => {
      activities.push({
        type: "Media",
        title: media.title,
        date: new Date(media.createdAt).toLocaleDateString(),
        status: media.status === 'published' ? 'Uploaded' : 'Draft',
      });
    });
    
    // Sort by creation date and take first 5
    return activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your Islamic knowledge platform content
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.counts.posts || 0}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Questions & Answers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.counts.questions || 0}</p>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <HelpCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Articles</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.counts.articles || 0}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-50">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Media Files</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.counts.media || 0}</p>
                </div>
                <div className="p-3 rounded-full bg-orange-50">
                  <Music className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickActions.map((action) => (
                  <Link key={action.title} href={action.href}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-auto p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${action.color} text-white`}>
                          <action.icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-sm text-gray-500">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getRecentActivity().map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        {activity.type === "Post" && <FileText className="h-4 w-4 text-blue-600" />}
                        {activity.type === "Question" && <HelpCircle className="h-4 w-4 text-green-600" />}
                        {activity.type === "Article" && <BookOpen className="h-4 w-4 text-purple-600" />}
                        {activity.type === "Media" && <Music className="h-4 w-4 text-orange-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === "Published" || activity.status === "Answered" || activity.status === "Uploaded"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
                {getRecentActivity().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Links */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/posts">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium">Manage Posts</h3>
                  <p className="text-sm text-gray-500">Edit, delete, and organize posts</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/questions">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-medium">Manage Q&A</h3>
                  <p className="text-sm text-gray-500">Handle questions and answers</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/articles">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-medium">Manage Articles</h3>
                  <p className="text-sm text-gray-500">Edit and organize articles</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/media">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Music className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h3 className="font-medium">Manage Media</h3>
                  <p className="text-sm text-gray-500">Upload and organize media files</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 