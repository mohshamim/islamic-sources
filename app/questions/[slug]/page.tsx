import { MainLayout } from "@/components/layout/main-layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Question from "@/models/Question";

interface Question {
  _id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  status: string;
  scholar: string;
  views: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface QuestionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  await dbConnect();

  const { slug } = await params;
  const question = await Question.findOne({
    slug: slug,
    status: "published",
  }).lean() as Question | null;

  if (!question) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Questions", href: "/questions" },
    { label: question.question },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav items={breadcrumbItems} />

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag variant="outline">{question.category}</Tag>
              <span className="text-sm text-muted-foreground">
                {question.views} views
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-6">{question.question}</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {question.scholar.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{question.scholar}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(question.createdAt).toLocaleDateString("en-US", {
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

          {/* Answer */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Answer</h2>
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: question.answer }} />
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Tag key={tag} variant="secondary">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* Related Questions */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Related Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* We&apos;ll implement related questions functionality later */}
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-500 text-center">
                    Related questions will appear here
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="mt-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Have a Question?</h3>
              <p className="text-gray-600 mb-6">
                Can&apos;t find what you&apos;re looking for? Submit your
                question to our scholars.
              </p>
              <Link href="/dashboard/questions/new">
                <Button>Submit Your Question</Button>
              </Link>
            </CardContent>
          </Card>
        </article>
      </div>
    </MainLayout>
  );
}
