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
  User,
  Clock,
} from "lucide-react";

// Dummy articles data
const articles = [
  {
    id: 1,
    title: "Islamic Finance: Principles and Practices",
    excerpt:
      "Understanding the core principles of Islamic finance and how they differ from conventional banking.",
    author: "Dr. Ahmed Hassan",
    category: "Finance",
    tags: ["Finance", "Banking", "Economics", "Islamic Law"],
    status: "Published",
    date: "Dec 14, 2024",
    readTime: "12 min read",
    views: 3456,
  },
  {
    id: 2,
    title: "Family Values in Islamic Tradition",
    excerpt:
      "Exploring the importance of family bonds and relationships in Islamic teachings and culture.",
    author: "Umm Fatima",
    category: "Family",
    tags: ["Family", "Relationships", "Values", "Culture"],
    status: "Published",
    date: "Dec 11, 2024",
    readTime: "10 min read",
    views: 2134,
  },
  {
    id: 3,
    title: "Mental Health and Islamic Spirituality",
    excerpt:
      "How Islamic practices and spirituality can contribute to mental well-being and peace of mind.",
    author: "Dr. Sarah Khan",
    category: "Health",
    tags: ["Mental Health", "Spirituality", "Wellness", "Psychology"],
    status: "Draft",
    date: "Dec 8, 2024",
    readTime: "15 min read",
    views: 0,
  },
  {
    id: 4,
    title: "The Golden Age of Islamic Science",
    excerpt:
      "A historical overview of the contributions of Muslim scholars to science, mathematics, and medicine.",
    author: "Prof. Omar Al-Rashid",
    category: "History",
    tags: ["History", "Science", "Mathematics", "Medicine"],
    status: "Published",
    date: "Dec 6, 2024",
    readTime: "18 min read",
    views: 1892,
  },
];

export default function ArticlesManagement() {
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
              Create, edit, and manage scholarly articles
            </p>
          </div>
          <Link href="/dashboard/articles/new">
            <Button className="mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Write New Article
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
                  <Input placeholder="Search articles..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All</Button>
                <Button variant="outline">Published</Button>
                <Button variant="outline">Draft</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <div className="space-y-4">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {article.title}
                      </h3>
                      <Badge
                        variant={
                          article.status === "Published"
                            ? "default"
                            : "secondary"
                        }
                        className="ml-2"
                      >
                        {article.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{article.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 lg:flex-col">
                    <Link href={`/dashboard/articles/${article.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/articles/${article.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
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

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
