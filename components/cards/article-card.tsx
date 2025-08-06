import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import Link from "next/link";
import { Calendar, User, Eye, Clock } from "lucide-react";

interface Article {
  _id?: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author: string;
  readTime?: number;
  views?: number;
  slug: string;
  createdAt?: string;
  date?: string; // For backward compatibility with dummy data
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  // Handle undefined or null article
  if (!article) {
    return null;
  }

  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="h-3 w-3 mr-1" />
              {article.views || 0}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {article.excerpt}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {article.author}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {article.readTime
                  ? `${article.readTime} min read`
                  : "5 min read"}
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {article.date ||
                  (article.createdAt
                    ? new Date(article.createdAt).toLocaleDateString()
                    : "N/A")}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {article.tags &&
              article.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} variant="outline" className="text-xs">
                  {tag}
                </Tag>
              ))}
            {article.tags && article.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
