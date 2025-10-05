import { MainLayout } from "@/components/layout/main-layout";
import { PostCard } from "@/components/cards/post-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Separator } from "@/components/ui/separator";
import mockData from "@/lib/mock-data.json";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  views: number;
  date: string;
  status: string;
}

const categories = [
  "All",
  "Worship",
  "Islamic Finance", 
  "Fasting",
  "Pilgrimage",
  "Seerah",
  "General",
];

export default function PostsPage() {
  const posts = mockData.posts.filter(post => post.status === "published") as Post[];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Islamic Posts</h1>
          <p className="text-muted-foreground text-lg">
            Discover authentic Islamic knowledge through our comprehensive
            collection of posts and guides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Tag>Prayer</Tag>
                  <Tag>Ramadan</Tag>
                  <Tag>Halal</Tag>
                  <Tag>Family</Tag>
                  <Tag>Education</Tag>
                  <Tag>History</Tag>
                  <Tag>Spirituality</Tag>
                  <Tag>Worship</Tag>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                All Posts ({posts.length})
              </h2>
            </div>

            <Separator className="mb-6" />

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={{
                    _id: post.id.toString(),
                    title: post.title,
                    excerpt: post.excerpt,
                    category: post.category,
                    tags: post.tags,
                    author: post.author,
                    views: post.views,
                    slug: post.slug,
                    createdAt: post.date,
                  }}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}