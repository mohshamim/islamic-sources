"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Calendar,
  Tag,
  Loader2,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: string;
  author: string;
  readTime: number;
  createdAt: string;
  views: number;
  slug: string;
}

export default function ArticlesManagement() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  useEffect(() => {
    fetchArticles();
  }, [searchTerm, filterStatus, currentPage]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filterStatus) params.append("status", filterStatus);
      params.append("page", currentPage.toString());
      params.append("limit", "10");

      const response = await fetch(`/api/articles?${params.toString()}`);
      const data = await response.json();
      setArticles(data.articles || []);
      setTotalPages(data.pagination?.pages || 1);
      setTotalArticles(data.pagination?.total || 0);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this article? This action cannot be undone."
      )
    )
      return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Article deleted successfully!");
        fetchArticles(); // Refresh the list
      } else {
        const error = await response.json();
        alert(`Error deleting article: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article. Please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Articles
            </h1>
            <p className="text-gray-600 mt-2">
              Create, edit, and manage your Islamic articles
            </p>
          </div>
          <Link href="/dashboard/articles/new">
            <Button className="mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Create New Article
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "" ? "default" : "outline"}
                  onClick={() => setFilterStatus("")}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "published" ? "default" : "outline"}
                  onClick={() => setFilterStatus("published")}
                >
                  Published
                </Button>
                <Button
                  variant={filterStatus === "draft" ? "default" : "outline"}
                  onClick={() => setFilterStatus("draft")}
                >
                  Draft
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first article.
              </p>
              <Link href="/dashboard/articles/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Article
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Card
                key={article._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {article.title}
                        </h3>
                        <Badge
                          variant={
                            article.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className="ml-2"
                        >
                          {article.status.charAt(0).toUpperCase() +
                            article.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{article.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          <span>{article.tags.length} tags</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 lg:flex-col">
                      <Link href={`/dashboard/articles/${article._id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/articles/${article.slug}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(article._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Showing {articles.length} of {totalArticles} articles
        </div>
      </div>
    </MainLayout>
  );
}
