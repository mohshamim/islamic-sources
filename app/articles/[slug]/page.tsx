import { MainLayout } from "@/components/layout/main-layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { notFound } from "next/navigation";

// Dummy data for articles
const articles = {
  "islamic-finance-principles": {
    title: "Islamic Finance: Principles and Practices",
    excerpt:
      "Understanding the core principles of Islamic finance and how they differ from conventional banking.",
    content: `
      <h2>Introduction to Islamic Finance</h2>
      <p>Islamic finance represents a unique approach to financial services that adheres to Islamic law (Shariah) principles. Unlike conventional banking, Islamic finance operates on the basis of risk-sharing, asset-backed transactions, and the prohibition of interest (riba).</p>
      
      <h2>Core Principles of Islamic Finance</h2>
      <p>Islamic finance is built upon several fundamental principles:</p>
      
      <h3>1. Prohibition of Interest (Riba)</h3>
      <p>The most well-known principle is the prohibition of riba (interest). Islamic finance does not allow charging or paying interest on loans. Instead, financial institutions earn profit through legitimate business activities and risk-sharing arrangements.</p>
      
      <h3>2. Risk-Sharing (Mudarabah and Musharakah)</h3>
      <p>Islamic finance promotes risk-sharing between parties:</p>
      <ul>
        <li><strong>Mudarabah:</strong> A partnership where one party provides capital and the other provides expertise</li>
        <li><strong>Musharakah:</strong> A joint partnership where all parties contribute capital and share profits and losses</li>
      </ul>
      
      <h3>3. Asset-Backed Transactions</h3>
      <p>All Islamic financial transactions must be backed by real assets or services. This ensures that money is not created from money, but rather from actual economic activity.</p>
      
      <h3>4. Prohibition of Speculation (Gharar)</h3>
      <p>Islamic finance prohibits excessive uncertainty and speculation. Contracts must be clear, transparent, and based on real economic activity.</p>
      
      <h3>5. Ethical Investment</h3>
      <p>Islamic finance prohibits investment in businesses that are harmful to society, such as alcohol, gambling, and other prohibited activities.</p>
      
      <h2>Common Islamic Financial Products</h2>
      
      <h3>1. Islamic Banking</h3>
      <p>Islamic banks offer various products that comply with Shariah principles:</p>
      <ul>
        <li>Current accounts (without interest)</li>
        <li>Savings accounts (profit-sharing)</li>
        <li>Investment accounts (mudarabah)</li>
      </ul>
      
      <h3>2. Islamic Mortgages (Murabaha)</h3>
      <p>Instead of interest-based loans, Islamic mortgages use murabaha (cost-plus financing) where the bank purchases the property and sells it to the customer at a profit.</p>
      
      <h3>3. Islamic Bonds (Sukuk)</h3>
      <p>Sukuk are Islamic bonds that represent ownership in tangible assets, services, or projects. They provide returns based on the underlying asset's performance rather than interest.</p>
      
      <h3>4. Islamic Insurance (Takaful)</h3>
      <p>Takaful is based on mutual assistance and cooperation. Participants contribute to a pool that provides protection against specified risks.</p>
      
      <h2>Benefits of Islamic Finance</h2>
      <p>Islamic finance offers several advantages:</p>
      <ul>
        <li>Promotes financial stability through risk-sharing</li>
        <li>Encourages real economic activity</li>
        <li>Provides ethical investment options</li>
        <li>Reduces speculation and excessive risk-taking</li>
        <li>Ensures transparency and fairness</li>
      </ul>
      
      <h2>Challenges and Considerations</h2>
      <p>While Islamic finance has grown significantly, it faces several challenges:</p>
      <ul>
        <li>Limited awareness and understanding</li>
        <li>Regulatory challenges in non-Muslim countries</li>
        <li>Need for qualified Shariah scholars</li>
        <li>Standardization of practices</li>
      </ul>
      
      <h2>Future of Islamic Finance</h2>
      <p>The Islamic finance industry continues to grow globally, with increasing interest from both Muslim and non-Muslim investors. The focus on ethical finance, risk-sharing, and real economic activity makes it an attractive option in today's financial landscape.</p>
      
      <h2>Conclusion</h2>
      <p>Islamic finance represents a comprehensive financial system that aligns with Islamic values while providing practical solutions for modern financial needs. Its emphasis on ethical practices, risk-sharing, and real economic activity makes it a valuable alternative to conventional finance.</p>
    `,
    author: "Dr. Ahmed Hassan",
    date: "Dec 14, 2024",
    readTime: "12 min read",
    category: "Finance",
    authorInfo: {
      avatar: "AH",
      credentials: "Islamic Finance Expert and Scholar",
      bio: "Dr. Ahmed Hassan is a renowned expert in Islamic finance with over 20 years of experience in the field. He has published numerous articles and books on Islamic economics and finance.",
    },
  },
  "family-values-islam": {
    title: "Family Values in Islamic Tradition",
    excerpt:
      "Exploring the importance of family bonds and relationships in Islamic teachings and culture.",
    content: `
      <h2>The Foundation of Islamic Family Values</h2>
      <p>Family is considered the cornerstone of Islamic society. The Quran and Hadith emphasize the importance of strong family bonds, mutual respect, and care for one another. Islamic teachings provide comprehensive guidance on family relationships and responsibilities.</p>
      
      <h2>Marriage in Islam</h2>
      <p>Marriage is highly encouraged in Islam and is considered half of one's faith. The Prophet Muhammad (PBUH) said: "When a person marries, he has fulfilled half of his religion."</p>
      
      <h3>Choosing a Spouse</h3>
      <p>Islamic tradition emphasizes choosing a spouse based on:</p>
      <ul>
        <li>Religious commitment and character</li>
        <li>Compatibility and mutual understanding</li>
        <li>Family background and values</li>
        <li>Physical and emotional compatibility</li>
      </ul>
      
      <h3>Rights and Responsibilities</h3>
      <p>Both spouses have rights and responsibilities:</p>
      <ul>
        <li>Mutual respect and kindness</li>
        <li>Financial support (husband's responsibility)</li>
        <li>Emotional support and companionship</li>
        <li>Raising children together</li>
      </ul>
      
      <h2>Parent-Child Relationships</h2>
      
      <h3>Rights of Parents</h3>
      <p>Islam places great emphasis on respecting and caring for parents:</p>
      <ul>
        <li>Obedience (within Islamic boundaries)</li>
        <li>Financial support when needed</li>
        <li>Emotional care and companionship</li>
        <li>Praying for their well-being</li>
      </ul>
      
      <h3>Rights of Children</h3>
      <p>Children have rights that parents must fulfill:</p>
      <ul>
        <li>Proper upbringing and education</li>
        <li>Islamic education and moral guidance</li>
        <li>Financial support and care</li>
        <li>Equal treatment among siblings</li>
      </ul>
      
      <h2>Extended Family</h2>
      <p>Islam encourages maintaining strong relationships with extended family:</p>
      <ul>
        <li>Regular visits and communication</li>
        <li>Financial support when possible</li>
        <li>Emotional support during difficult times</li>
        <li>Preserving family ties (silat ar-rahim)</li>
      </ul>
      
      <h2>Family in Modern Times</h2>
      <p>In today's fast-paced world, maintaining Islamic family values requires:</p>
      <ul>
        <li>Quality time together</li>
        <li>Open communication</li>
        <li>Balancing work and family</li>
        <li>Teaching Islamic values to children</li>
        <li>Supporting each other's growth</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Islamic family values provide a strong foundation for building healthy, loving relationships. By following these principles, families can create environments of peace, love, and mutual support that benefit both individuals and society as a whole.</p>
    `,
    author: "Umm Fatima",
    date: "Dec 11, 2024",
    readTime: "10 min read",
    category: "Family",
    authorInfo: {
      avatar: "UF",
      credentials: "Family Counselor and Islamic Scholar",
      bio: "Umm Fatima is a family counselor with expertise in Islamic family dynamics. She has helped numerous families strengthen their relationships through Islamic principles.",
    },
  },
};

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: article.title },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav items={breadcrumbItems} />

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag variant="outline">{article.category}</Tag>
              <span className="text-sm text-muted-foreground">
                {article.readTime}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{article.authorInfo.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{article.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {article.authorInfo.credentials}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {article.date}
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
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <Separator className="mb-8" />

          {/* Author Bio */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">About the Author</h3>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {article.authorInfo.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      {article.author}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {article.authorInfo.credentials}
                    </p>
                    <p className="text-sm">{article.authorInfo.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Articles */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    <Link
                      href="/articles/family-values-islam"
                      className="hover:text-primary transition-colors"
                    >
                      Family Values in Islamic Tradition
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Exploring the importance of family bonds and relationships
                    in Islamic teachings and culture.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    <Link
                      href="/articles/mental-health-islam"
                      className="hover:text-primary transition-colors"
                    >
                      Mental Health and Islamic Spirituality
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    How Islamic practices and spirituality can contribute to
                    mental well-being and peace of mind.
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
