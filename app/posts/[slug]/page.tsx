import { MainLayout } from "@/components/layout/main-layout";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { notFound } from "next/navigation";
import mockData from "@/lib/mock-data.json";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: string;
  author: string;
  views: number;
  date: string;
}

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = mockData.posts.find(p => p.slug === slug && p.status === "published") as Post | undefined;

  if (!post) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag variant="outline">{post.category}</Tag>
              <span className="text-sm text-muted-foreground">
                {post.views} views
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {post.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  Bookmark
                </Button>
              </div>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <Separator className="mb-8" />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag} variant="secondary">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* We'll implement related posts functionality later */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    <Link
                      href="/posts"
                      className="hover:text-primary transition-colors"
                    >
                      View All Posts
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explore more Islamic posts and articles.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </article>
      </div>
    </MainLayout>
  );
}
