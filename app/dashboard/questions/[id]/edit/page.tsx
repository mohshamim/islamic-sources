"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, X, Plus, Loader2 } from "lucide-react";

const categories = ["Fiqh", "Aqeedah", "Hadith", "Tafsir", "Seerah", "General"];

interface Question {
  _id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  status: string;
  scholar: string;
  slug: string;
}

export default function EditQuestion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);

  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [status, setStatus] = useState("draft");
  const [scholar, setScholar] = useState("");

  useEffect(() => {
    const loadQuestion = async () => {
      const { id } = await params;
      fetchQuestion(id);
    };
    loadQuestion();
  }, [params]);

  const fetchQuestion = async (id: string) => {
    try {
      const response = await fetch(`/api/questions/${id}`);
      if (response.ok) {
        const questionData = await response.json();
        setQuestion(questionData);
        setQuestionText(questionData.question);
        setAnswer(questionData.answer);
        setCategory(questionData.category);
        setTags(questionData.tags || []);
        setStatus(questionData.status);
        setScholar(questionData.scholar);
      } else {
        alert("Question not found");
        router.push("/dashboard/questions");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      alert("Error loading question");
      router.push("/dashboard/questions");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { id } = await params;
      const response = await fetch(`/api/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionText,
          answer,
          category,
          tags,
          status,
          scholar,
        }),
      });

      if (response.ok) {
        alert("Question updated successfully!");
        router.push("/dashboard/questions");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Error updating question. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/questions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Questions
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Question
              </h1>
              <p className="text-gray-600 mt-2">Update your Islamic question</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Question */}
              <Card>
                <CardHeader>
                  <CardTitle>Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter the question..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="text-lg"
                    rows={3}
                    required
                  />
                </CardContent>
              </Card>

              {/* Answer */}
              <Card>
                <CardHeader>
                  <CardTitle>Answer</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Provide a comprehensive answer to the question..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={15}
                    className="font-mono"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    You can use HTML tags like &lt;h2&gt;, &lt;p&gt;,
                    &lt;ul&gt;, &lt;li&gt;, etc.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Scholar */}
              <Card>
                <CardHeader>
                  <CardTitle>Scholar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter scholar name..."
                    value={scholar}
                    onChange={(e) => setScholar(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Leave empty to use "Anonymous Scholar"
                  </p>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), handleAddTag())
                        }
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddTag}
                        disabled={!newTag.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Update Question
                      </>
                    )}
                  </Button>
                  <Link href={`/questions/${question?.slug}`}>
                    <Button type="button" variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Question
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
