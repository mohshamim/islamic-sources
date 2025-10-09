"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: string;
  question: string;
  answer: string;
  category_id?: string;
  categories?: { id: string; name: string; slug: string };
  tags: string[];
  status: string;
  scholar_id?: string;
  scholars?: { id: string; name: string; title: string };
  views: number;
  slug: string;
  created_at: string;
  published_at?: string;
}

export default function QuestionsManagementPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  // Form states
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    tags: "",
    status: "pending",
    scholar: "Admin",
  });

  // Fetch questions
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Filter questions
  useEffect(() => {
    let filtered = questions;

    if (searchQuery) {
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((q) => q.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((q) => q.category === categoryFilter);
    }

    setFilteredQuestions(filtered);
  }, [searchQuery, statusFilter, categoryFilter, questions]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/questions?limit=50");
      const data = await response.json();
      setQuestions(data.questions || []);
      setFilteredQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (response.ok) {
        setIsCreateDialogOpen(false);
        resetForm();
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedQuestion) return;

    try {
      const response = await fetch(`/api/questions/${selectedQuestion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (response.ok) {
        setIsEditDialogOpen(false);
        resetForm();
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleAnswer = async () => {
    if (!selectedQuestion) return;

    try {
      const response = await fetch(`/api/questions/${selectedQuestion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer: formData.answer,
          status: "published",
          scholar: formData.scholar,
        }),
      });

      if (response.ok) {
        setIsAnswerDialogOpen(false);
        resetForm();
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error answering question:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedQuestion) return;

    try {
      const response = await fetch(`/api/questions/${selectedQuestion.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsDeleteDialogOpen(false);
        setSelectedQuestion(null);
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const openEditDialog = (question: Question) => {
    setSelectedQuestion(question);
    setFormData({
      question: question.question,
      answer: question.answer,
      category: question.categories?.name || "General",
      tags: question.tags?.join(", ") || "",
      status: question.status,
      scholar: question.scholars?.name || "Admin",
    });
    setIsEditDialogOpen(true);
  };

  const openAnswerDialog = (question: Question) => {
    setSelectedQuestion(question);
    setFormData({
      ...formData,
      answer: question.answer || "",
      scholar: question.scholar || "Admin",
    });
    setIsAnswerDialogOpen(true);
  };

  const openDeleteDialog = (question: Question) => {
    setSelectedQuestion(question);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      category: "General",
      tags: "",
      status: "pending",
      scholar: "Admin",
    });
    setSelectedQuestion(null);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      published: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      draft: "bg-gray-100 text-gray-800",
    };
    return variants[status] || "bg-gray-100 text-gray-800";
  };

  const categories = [
    "General",
    "Aqeedah",
    "Fiqh",
    "Tafsir",
    "Hadith",
    "Seerah",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Questions Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage Q&A for Islamic knowledge and guidance
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Question
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Answered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{questions.length}</div>
            <p className="text-xs text-gray-500">Total Questions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {questions.filter((q) => q.status === "published").length}
            </div>
            <p className="text-xs text-gray-500">Answered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {questions.filter((q) => q.status === "pending").length}
            </div>
            <p className="text-xs text-gray-500">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {questions
                .reduce((sum, q) => sum + (q.views || 0), 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Total Views</p>
          </CardContent>
        </Card>
      </div>

      {/* Questions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Questions</CardTitle>
          <CardDescription>
            {filteredQuestions.length} question(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading questions...
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No questions found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Scholar</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>
                      <div className="font-medium max-w-md truncate">
                        {question.question}
                      </div>
                      {question.answer && (
                        <div className="text-sm text-gray-500 truncate max-w-md mt-1">
                          {question.answer.substring(0, 100)}...
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {question.categories?.name || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(question.status)}>
                        {question.status === "published"
                          ? "Answered"
                          : question.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {question.scholars?.name || "Unknown"}
                    </TableCell>
                    <TableCell>{question.views || 0}</TableCell>
                    <TableCell>
                      {new Date(question.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(
                                `/questions/${question.slug}`,
                                "_blank"
                              )
                            }
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          {question.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => openAnswerDialog(question)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Answer
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => openEditDialog(question)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(question)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateDialogOpen ? "Create New Question" : "Edit Question"}
            </DialogTitle>
            <DialogDescription>
              {isCreateDialogOpen
                ? "Add a new question to the Q&A database"
                : "Update the question information"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question *</Label>
              <Textarea
                id="question"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                placeholder="What is the question?"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="answer">Answer *</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                placeholder="Detailed answer to the question"
                rows={8}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="published">Answered</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scholar">Scholar/Responder</Label>
                <Input
                  id="scholar"
                  value={formData.scholar}
                  onChange={(e) =>
                    setFormData({ ...formData, scholar: e.target.value })
                  }
                  placeholder="Scholar name"
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="prayer, fasting, halal"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setIsEditDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={isCreateDialogOpen ? handleCreate : handleEdit}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isCreateDialogOpen ? "Create Question" : "Update Question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Answer Dialog */}
      <Dialog open={isAnswerDialogOpen} onOpenChange={setIsAnswerDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Answer Question</DialogTitle>
            <DialogDescription>
              Provide a detailed answer to this question
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Question</Label>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md mt-1">
                {selectedQuestion?.question}
              </p>
            </div>
            <div>
              <Label htmlFor="answer-text">Your Answer *</Label>
              <Textarea
                id="answer-text"
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                placeholder="Provide a comprehensive answer..."
                rows={10}
              />
            </div>
            <div>
              <Label htmlFor="scholar-name">Answered By</Label>
              <Input
                id="scholar-name"
                value={formData.scholar}
                onChange={(e) =>
                  setFormData({ ...formData, scholar: e.target.value })
                }
                placeholder="Scholar name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAnswerDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAnswer}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Submit Answer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
