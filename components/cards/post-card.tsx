import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import Link from "next/link";
import { Calendar, User, Eye } from "lucide-react";

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

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  if (!post) {
    return null;
  }

  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="h-3 w-3 mr-1" />
              {post.views || 0}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {post.tags && post.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} variant="outline" className="text-xs">
                {tag}
              </Tag>
            ))}
            {post.tags && post.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
