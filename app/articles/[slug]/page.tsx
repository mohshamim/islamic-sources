"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Share2,
  Search,
  Globe,
  Type,
  Download,
  Printer,
  ChevronUp,
  ChevronDown,
  Calendar,
  Eye,
  Check,
  Home,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";

// Import mock data
import mockData from "@/lib/mock-data.json";

// Dummy data for articles (keeping existing ones for backward compatibility)
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
    ` as any,
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

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const languages = [
    { code: "EN", name: "English" },
    { code: "RM", name: "Roman" },
    { code: "HI", name: "Hindi" },
    { code: "NP", name: "Nepali" },
    { code: "UR", name: "Urdu" },
    { code: "AR", name: "Arabic" },
  ];

  // First try to find in mock data
  let article = mockData.articles.find((a) => a.slug === slug);

  // If not found, try the old hardcoded articles
  if (!article) {
    const hardcodedArticle = articles[slug as keyof typeof articles];
    article = hardcodedArticle as (typeof mockData.articles)[0];
  }

  if (!article) {
    notFound();
  }

  // Static table of contents (can be extracted from article metadata)
  const tableOfContents = [
    "Introduction to Islamic Finance",
    "Core Principles of Islamic Finance",
    "Common Islamic Financial Products",
    "Benefits of Islamic Finance",
    "Challenges and Considerations",
    "Future of Islamic Finance",
    "Conclusion",
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation - Outside Box */}
        <nav className="flex items-center gap-2 mb-6 max-w-4xl mx-auto text-sm text-neutral-600 dark:text-neutral-400">
          <Link
            href="/"
            className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
          >
            <Home className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href="/articles"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Articles
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/articles?category=${article.category.toLowerCase()}`}
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            {article.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-500 dark:text-neutral-500 line-clamp-1">
            {article.title}
          </span>
        </nav>

        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
          <article className="w-full">
            {/* Utility Bar */}
            <div className="mb-6">
              <div className="flex items-stretch bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Share this content"
                >
                  <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Share</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Search within content"
                >
                  <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Search</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Text formatting options"
                >
                  <Type className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Format</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Save for later"
                >
                  <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Save</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Download content"
                >
                  <Download className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Download</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-3.5 rounded-none border-r border-neutral-200 dark:border-neutral-700 transition-all duration-200 group"
                  title="Print this page"
                >
                  <Printer className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">Print</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-6 py-3.5 rounded-none transition-all duration-200 group min-w-[90px]"
                      title="Change language"
                    >
                      <span className="text-sm font-semibold">
                        {selectedLanguage}
                      </span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 animate-none"
                    sideOffset={8}
                    alignOffset={0}
                  >
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <span>{lang.name}</span>
                        {selectedLanguage === lang.code && (
                          <Check className="w-4 h-4 text-primary-600" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Date and Views */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{article.date}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm">136,867 views</span>
              </div>
            </div>

            {/* Title */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-8">
                {article.title}
              </h1>
            </header>

            {/* Table of Contents */}
            <Collapsible defaultOpen className="mb-8">
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Table Of Contents
                    </h3>
                    <ChevronUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4">
                    <ul className="space-y-3">
                      {tableOfContents.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            <Separator className="mb-8" />

            {/* Content */}
            <div className="islamic-content mb-8 text-neutral-800 dark:text-neutral-200">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <Separator className="mb-8" />

            {/* Author Bio */}
            {article.authorInfo && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                  About the Author
                </h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">
                          {article.authorInfo.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                          {article.author}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {article.authorInfo.credentials}
                        </p>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                          {article.authorInfo.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Related Articles */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                Related Articles
              </h3>
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
      </div>
    </MainLayout>
  );
}
