"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  MessageSquare,
  Image as ImageIcon,
  GraduationCap,
  TrendingUp,
  FileText,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Types
interface Stats {
  counts: {
    questions: number;
    articles: number;
    media: number;
    total: number;
  };
  views: {
    total: number;
    questions: number;
    articles: number;
    media: number;
  };
  recentActivity: {
    questions: Array<any>;
    articles: Array<any>;
    media: Array<any>;
  };
  categories?: {
    questions: Array<{ _id: string; count: number }>;
    articles: Array<{ _id: string; count: number }>;
    media: Array<{ _id: string; count: number }>;
  };
}

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  user: string;
  time: string;
  status: string;
}

// Helper function to format time ago
function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();
        setStats(data);

        // Transform recent activity data
        const activities: ActivityItem[] = [];

        // Add recent articles (with safety checks)
        if (data.recentActivity?.articles) {
          data.recentActivity.articles.slice(0, 2).forEach((article: any) => {
            activities.push({
              id: article._id || String(Math.random()),
              type: "article",
              title: article.title || "Untitled Article",
              user: article.author || "Unknown",
              time: article.createdAt ? timeAgo(article.createdAt) : "recently",
              status: article.status || "published",
            });
          });
        }

        // Add recent questions (with safety checks)
        if (data.recentActivity?.questions) {
          data.recentActivity.questions.slice(0, 2).forEach((question: any) => {
            activities.push({
              id: question._id || String(Math.random()),
              type: "question",
              title: question.question || "Untitled Question",
              user: question.scholar || "Unknown",
              time: question.createdAt
                ? timeAgo(question.createdAt)
                : "recently",
              status: question.status || "answered",
            });
          });
        }

        // Add recent media (with safety checks)
        if (data.recentActivity?.media) {
          data.recentActivity.media.slice(0, 2).forEach((media: any) => {
            activities.push({
              id: media._id || String(Math.random()),
              type: "media",
              title: media.title || "Untitled Media",
              user: media.speaker || "Unknown",
              time: media.createdAt ? timeAgo(media.createdAt) : "recently",
              status: "uploaded",
            });
          });
        }

        // Sort by most recent
        setRecentActivity(activities.slice(0, 6));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Calculate stats for cards
  const statsCards =
    stats && stats.counts && stats.views
      ? [
          {
            title: "Total Articles",
            value: (stats.counts.articles || 0).toString(),
            change: "+12.5%",
            trend: "up",
            icon: BookOpen,
            color: "text-blue-600 bg-blue-50",
          },
          {
            title: "Questions",
            value: (stats.counts.questions || 0).toString(),
            change: "+8.2%",
            trend: "up",
            icon: MessageSquare,
            color: "text-green-600 bg-green-50",
          },
          {
            title: "Media Files",
            value: (stats.counts.media || 0).toString(),
            change: "+23.1%",
            trend: "up",
            icon: ImageIcon,
            color: "text-purple-600 bg-purple-50",
          },
          {
            title: "Total Views",
            value: (stats.views.total || 0).toLocaleString(),
            change: "+5.4%",
            trend: "up",
            icon: TrendingUp,
            color: "text-orange-600 bg-orange-50",
          },
        ]
      : [];

  return (
    <>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-6">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <span className="ml-2 text-gray-600">Loading dashboard...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Stats Cards */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={stat.title}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-lg ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-green-700 bg-green-50"
                          >
                            {stat.change}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900">
                            {stat.value}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest updates from your platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentActivity.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">
                        No recent activity
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div
                              className={`
                              p-2 rounded-lg
                              ${
                                activity.type === "article"
                                  ? "bg-blue-50 text-blue-600"
                                  : ""
                              }
                              ${
                                activity.type === "question"
                                  ? "bg-green-50 text-green-600"
                                  : ""
                              }
                              ${
                                activity.type === "media"
                                  ? "bg-purple-50 text-purple-600"
                                  : ""
                              }
                              ${
                                activity.type === "course"
                                  ? "bg-orange-50 text-orange-600"
                                  : ""
                              }
                            `}
                            >
                              {activity.type === "article" && (
                                <BookOpen className="w-5 h-5" />
                              )}
                              {activity.type === "question" && (
                                <MessageSquare className="w-5 h-5" />
                              )}
                              {activity.type === "media" && (
                                <ImageIcon className="w-5 h-5" />
                              )}
                              {activity.type === "course" && (
                                <GraduationCap className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {activity.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {activity.user} • {activity.time}
                              </p>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {activity.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                    <CardDescription>Performance overview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {stats && stats.views ? (
                      <>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Article Views
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {(stats.views.articles || 0).toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{
                                width:
                                  stats.views.total > 0
                                    ? `${Math.min(
                                        ((stats.views.articles || 0) /
                                          stats.views.total) *
                                          100,
                                        100
                                      )}%`
                                    : "0%",
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Question Views
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {(stats.views.questions || 0).toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width:
                                  stats.views.total > 0
                                    ? `${Math.min(
                                        ((stats.views.questions || 0) /
                                          stats.views.total) *
                                          100,
                                        100
                                      )}%`
                                    : "0%",
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Media Views
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {(stats.views.media || 0).toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{
                                width:
                                  stats.views.total > 0
                                    ? `${Math.min(
                                        ((stats.views.media || 0) /
                                          stats.views.total) *
                                          100,
                                        100
                                      )}%`
                                    : "0%",
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex items-center space-x-2 text-emerald-600">
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-sm font-medium">
                              Total {(stats.views.total || 0).toLocaleString()}{" "}
                              views
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No view data available
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Content Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>Content Distribution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stats && stats.counts ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Total Articles
                          </span>
                          <span className="font-semibold">
                            {stats.counts.articles || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Total Questions
                          </span>
                          <span className="font-semibold">
                            {stats.counts.questions || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Total Media
                          </span>
                          <span className="font-semibold">
                            {stats.counts.media || 0}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">No content data</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <span>Categories</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stats &&
                    stats.categories &&
                    stats.categories.articles &&
                    stats.categories.articles.length > 0 ? (
                      stats.categories.articles.slice(0, 3).map((cat: any) => (
                        <div
                          key={cat._id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-600">
                            {cat._id}
                          </span>
                          <span className="font-semibold">{cat.count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No categories yet</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5 text-orange-600" />
                      <span>Content Health</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stats && stats.counts && stats.views ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Total Content
                          </span>
                          <span className="font-semibold">
                            {stats.counts.total || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Total Views
                          </span>
                          <span className="font-semibold">
                            {(stats.views.total || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Avg Views/Content
                          </span>
                          <span className="font-semibold text-green-600">
                            {stats.counts.total > 0
                              ? Math.round(
                                  (stats.views.total || 0) / stats.counts.total
                                )
                              : 0}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">No analytics data</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
      </div>
    </>
  );
}
