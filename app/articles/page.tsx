import { MainLayout } from "@/components/layout/main-layout";
import { ArticleCard } from "@/components/cards/article-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Separator } from "@/components/ui/separator";

// Dummy data for articles
const articles = [
  {
    slug: "islamic-finance-principles",
    title: "Islamic Finance: Principles and Practices",
    excerpt:
      "Understanding the core principles of Islamic finance and how they differ from conventional banking. This comprehensive guide covers the fundamental concepts that govern Islamic financial transactions.",
    author: "Dr. Ahmed Hassan",
    date: "Dec 14, 2024",
    readTime: 12,
    category: "Finance",
  },
  {
    slug: "family-values-islam",
    title: "Family Values in Islamic Tradition",
    excerpt:
      "Exploring the importance of family bonds and relationships in Islamic teachings and culture. Learn about the rights and responsibilities within the family structure.",
    author: "Umm Fatima",
    date: "Dec 11, 2024",
    readTime: 10,
    category: "Family",
  },
  {
    slug: "mental-health-islam",
    title: "Mental Health and Islamic Spirituality",
    excerpt:
      "How Islamic practices and spirituality can contribute to mental well-being and peace of mind. Understanding the connection between faith and psychological health.",
    author: "Dr. Sarah Khan",
    date: "Dec 8, 2024",
    readTime: 15,
    category: "Health",
  },
  {
    slug: "prophet-muhammad-teachings",
    title: "The Life and Teachings of Prophet Muhammad (PBUH)",
    excerpt:
      "A detailed exploration of the life, character, and teachings of Prophet Muhammad (peace be upon him) and their relevance in modern times.",
    author: "Sheikh Omar Abdullah",
    date: "Dec 6, 2024",
    readTime: 20,
    category: "History",
  },
  {
    slug: "islamic-architecture",
    title: "The Beauty of Islamic Architecture",
    excerpt:
      "Discover the principles and aesthetics of Islamic architecture, from geometric patterns to spiritual symbolism in mosque design.",
    author: "Dr. Fatima Al-Zahra",
    date: "Dec 4, 2024",
    readTime: 14,
    category: "Culture",
  },
  {
    slug: "women-islamic-history",
    title: "Women in Islamic History: Scholars and Leaders",
    excerpt:
      "Celebrating the contributions of women scholars, leaders, and figures throughout Islamic history and their lasting impact.",
    author: "Dr. Aisha Rahman",
    date: "Dec 2, 2024",
    readTime: 18,
    category: "History",
  },
];

const categories = [
  "All",
  "Finance",
  "Family",
  "Health",
  "History",
  "Culture",
  "Education",
  "Spirituality",
  "Science",
];

const authors = [
  "All Authors",
  "Dr. Ahmed Hassan",
  "Umm Fatima",
  "Dr. Sarah Khan",
  "Sheikh Omar Abdullah",
  "Dr. Fatima Al-Zahra",
  "Dr. Aisha Rahman",
];

export default function ArticlesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Islamic Articles</h1>
          <p className="text-muted-foreground text-lg">
            In-depth scholarly articles covering various aspects of Islamic
            knowledge, history, and contemporary issues.
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
                <CardTitle>Authors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {authors.map((author) => (
                  <Button
                    key={author}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                  >
                    {author}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Tag>Finance</Tag>
                  <Tag>Family</Tag>
                  <Tag>History</Tag>
                  <Tag>Health</Tag>
                  <Tag>Culture</Tag>
                  <Tag>Education</Tag>
                  <Tag>Spirituality</Tag>
                  <Tag>Women</Tag>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button variant="outline" size="sm">
                Latest
              </Button>
              <Button variant="ghost" size="sm">
                Popular
              </Button>
              <Button variant="ghost" size="sm">
                Most Read
              </Button>
              <Button variant="ghost" size="sm">
                Longest
              </Button>
            </div>

            <Separator className="mb-6" />

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  1
                </Button>
                <Button variant="ghost" size="sm">
                  2
                </Button>
                <Button variant="ghost" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
