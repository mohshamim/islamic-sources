import { MainLayout } from "@/components/layout/main-layout";
import { QuestionCard } from "@/components/cards/question-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Separator } from "@/components/ui/separator";
import mockData from "@/lib/mock-data.json";

interface Question {
  id: number;
  slug: string;
  question: string;
  category: string;
  status: string;
  askedBy: string;
  answeredBy: string;
  views: number;
  date: string;
  answer: string;
  tags: string[];
}

const categories = [
  "All",
  "Prayer",
  "Islamic Finance",
  "Women in Islam", 
  "Hadith",
  "Islamic Rulings",
  "General",
];

export default function QuestionsPage() {
  const questions = mockData.questions.filter(q => q.status === "answered") as Question[];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Islamic Q&A</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to your Islamic questions from qualified scholars and experts.
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
                  <Tag>Zakat</Tag>
                  <Tag>Ramadan</Tag>
                  <Tag>Marriage</Tag>
                  <Tag>Halal</Tag>
                  <Tag>Haram</Tag>
                  <Tag>Fiqh</Tag>
                  <Tag>Hadith</Tag>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Can&apos;t find what you&apos;re looking for? Submit your question to our scholars.
                </p>
                <Button className="w-full">
                  Submit Question
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                Answered Questions ({questions.length})
              </h2>
            </div>

            <Separator className="mb-6" />

            {/* Questions Grid */}
            <div className="space-y-6">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={{
                    _id: question.id.toString(),
                    question: question.question,
                    answer: question.answer,
                    category: question.category,
                    tags: question.tags,
                    status: question.status,
                    scholar: question.answeredBy,
                    views: question.views,
                    slug: question.slug,
                    createdAt: question.date,
                  }}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Questions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}