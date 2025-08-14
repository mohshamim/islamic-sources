import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import Link from "next/link";
import { Calendar, User, Eye, HelpCircle } from "lucide-react";

interface Question {
  _id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  scholar: string;
  views: number;
  slug: string;
  createdAt: string;
}

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  if (!question) {
    return null;
  }

  return (
    <Link href={`/questions/${question.slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-white dark:bg-card border border-gray-200 dark:border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {question.category}
            </Badge>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Eye className="h-3 w-3 mr-1" />
              {question.views || 0}
            </div>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
              {question.question}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-200 text-sm line-clamp-3">
            {question.answer}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {question.scholar}
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(question.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {question.tags &&
              question.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} variant="outline" className="text-xs">
                  {tag}
                </Tag>
              ))}
            {question.tags && question.tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{question.tags.length - 3} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
