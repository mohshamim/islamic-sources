import { MainLayout } from "@/components/layout/main-layout";
import { ArticleCard } from "@/components/cards/article-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Separator } from "@/components/ui/separator";
import mockData from "@/lib/mock-data.json";

// Dummy data for articles (keeping some for backward compatibility)
const additionalArticles = [
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
    title: "Islamic Architecture: A Journey Through Time",
    excerpt:
      "Discover the beauty and significance of Islamic architecture from the early mosques to modern structures. Learn about the principles and elements that define Islamic design.",
    author: "Prof. Aisha Al-Mansouri",
    date: "Dec 4, 2024",
    readTime: 18,
    category: "Culture",
  },
  {
    slug: "women-rights-islam",
    title: "Women's Rights in Islam: A Historical Perspective",
    excerpt:
      "An in-depth look at the rights granted to women in Islam, challenging common misconceptions and highlighting the progressive nature of Islamic teachings.",
    author: "Dr. Fatima Zahra",
    date: "Dec 2, 2024",
    readTime: 14,
    category: "Society",
  },
];

// Combine mock data with additional articles
const allArticles = [
  ...mockData.articles.map(article => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    author: article.author,
    date: article.date,
    readTime: parseInt(article.readTime),
    category: article.category,
  })),
  ...additionalArticles
];

const categories = [
  "All",
  "Fiqh",
  "Islamic Calendar", 
  "Fasting",
  "Finance",
  "Family",
  "Health",
  "History",
  "Culture",
  "Society",
];

export default function ArticlesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Islamic Articles</h1>
          <p className="text-muted-foreground text-lg">
            Deep dive into Islamic knowledge with our comprehensive collection of articles
            written by qualified scholars and experts.
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
                <CardTitle>Featured Authors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Dr. Ahmed Hassan</p>
                  <p className="text-muted-foreground">Islamic Finance Expert</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Umm Fatima</p>
                  <p className="text-muted-foreground">Family Counselor</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Sheikh Bilal Mahmoud</p>
                  <p className="text-muted-foreground">Hadith Scholar</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Tag>Mawlid</Tag>
                  <Tag>Safar</Tag>
                  <Tag>Ashura</Tag>
                  <Tag>Muharram</Tag>
                  <Tag>Fiqh</Tag>
                  <Tag>Islamic Calendar</Tag>
                  <Tag>Fasting</Tag>
                  <Tag>Prophet</Tag>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                All Articles ({allArticles.length})
              </h2>
            </div>

            <Separator className="mb-6" />

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}