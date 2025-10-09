"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  GripVertical,
  BookOpen,
  FileText,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Course {
  id: string;
  title: string;
  slug: string;
  modules?: Module[];
}

interface Module {
  id: string;
  title: string;
  description?: string;
  order_index: number;
  course_lessons?: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  description?: string;
  type: string;
  content_url?: string;
  duration_minutes: number;
  is_preview: boolean;
  order_index: number;
  study_materials?: string;
  practice_materials?: string;
  learning_objectives?: string[];
}

export default function ManageCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [materialsDialogOpen, setMaterialsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form states
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "module" | "lesson";
    id: string;
  } | null>(null);

  // Form data
  const [moduleForm, setModuleForm] = useState({ title: "", description: "" });
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    type: "video",
    content_url: "",
    duration_minutes: 0,
    is_preview: false,
    study_materials: "",
    practice_materials: "",
  });

  const fetchCourse = async () => {
    if (!params.slug) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/courses?slug=${params.slug}`);
      if (!response.ok) throw new Error("Failed to fetch course");

      const data = await response.json();
      const courseData = data.courses[0];

      setCourse(courseData);

      // Fetch modules
      if (courseData.id) {
        const modulesResponse = await fetch(
          `/api/courses/${courseData.id}/modules`
        );
        if (modulesResponse.ok) {
          const modulesData = await modulesResponse.json();
          setModules(modulesData.modules || []);
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [params.slug]);

  const handleCreateModule = async () => {
    if (!course?.id || !moduleForm.title) return;

    try {
      const response = await fetch(`/api/courses/${course.id}/modules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moduleForm),
      });

      if (!response.ok) throw new Error("Failed to create module");

      await fetchCourse();
      setModuleDialogOpen(false);
      setModuleForm({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating module:", error);
      alert("Failed to create module");
    }
  };

  const handleUpdateModule = async () => {
    if (!editingModule || !course?.id) return;

    try {
      const response = await fetch(
        `/api/courses/${course.id}/modules/${editingModule.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(moduleForm),
        }
      );

      if (!response.ok) throw new Error("Failed to update module");

      await fetchCourse();
      setModuleDialogOpen(false);
      setEditingModule(null);
      setModuleForm({ title: "", description: "" });
    } catch (error) {
      console.error("Error updating module:", error);
      alert("Failed to update module");
    }
  };

  const handleDeleteModule = async () => {
    if (!deleteTarget || !course?.id || deleteTarget.type !== "module") return;

    try {
      const response = await fetch(
        `/api/courses/${course.id}/modules/${deleteTarget.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete module");

      await fetchCourse();
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module");
    }
  };

  const handleCreateLesson = async () => {
    if (!selectedModuleId || !course?.id || !lessonForm.title) return;

    try {
      const response = await fetch(
        `/api/courses/${course.id}/modules/${selectedModuleId}/lessons`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lessonForm),
        }
      );

      if (!response.ok) throw new Error("Failed to create lesson");

      await fetchCourse();
      setLessonDialogOpen(false);
      setLessonForm({
        title: "",
        description: "",
        type: "video",
        content_url: "",
        duration_minutes: 0,
        is_preview: false,
        study_materials: "",
        practice_materials: "",
      });
    } catch (error) {
      console.error("Error creating lesson:", error);
      alert("Failed to create lesson");
    }
  };

  const handleUpdateLesson = async () => {
    if (!editingLesson || !selectedModuleId || !course?.id) return;

    try {
      const response = await fetch(
        `/api/courses/${course.id}/modules/${selectedModuleId}/lessons/${editingLesson.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lessonForm),
        }
      );

      if (!response.ok) throw new Error("Failed to update lesson");

      await fetchCourse();
      setLessonDialogOpen(false);
      setEditingLesson(null);
      setLessonForm({
        title: "",
        description: "",
        type: "video",
        content_url: "",
        duration_minutes: 0,
        is_preview: false,
        study_materials: "",
        practice_materials: "",
      });
    } catch (error) {
      console.error("Error updating lesson:", error);
      alert("Failed to update lesson");
    }
  };

  const handleDeleteLesson = async () => {
    if (!deleteTarget || !course?.id || deleteTarget.type !== "lesson") return;

    // Find module ID for this lesson
    const module = modules.find((m) =>
      m.course_lessons?.some((l) => l.id === deleteTarget.id)
    );

    if (!module) return;

    try {
      const response = await fetch(
        `/api/courses/${course.id}/modules/${module.id}/lessons/${deleteTarget.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete lesson");

      await fetchCourse();
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert("Failed to delete lesson");
    }
  };

  const openEditModuleDialog = (module: Module) => {
    setEditingModule(module);
    setModuleForm({
      title: module.title,
      description: module.description || "",
    });
    setModuleDialogOpen(true);
  };

  const openCreateLessonDialog = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setEditingLesson(null);
    setLessonForm({
      title: "",
      description: "",
      type: "video",
      content_url: "",
      duration_minutes: 0,
      is_preview: false,
      study_materials: "",
      practice_materials: "",
    });
    setLessonDialogOpen(true);
  };

  const openEditLessonDialog = (lesson: Lesson, moduleId: string) => {
    setSelectedModuleId(moduleId);
    setEditingLesson(lesson);
    setLessonForm({
      title: lesson.title,
      description: lesson.description || "",
      type: lesson.type,
      content_url: lesson.content_url || "",
      duration_minutes: lesson.duration_minutes,
      is_preview: lesson.is_preview,
      study_materials: lesson.study_materials || "",
      practice_materials: lesson.practice_materials || "",
    });
    setLessonDialogOpen(true);
  };

  const openMaterialsDialog = (lesson: Lesson, moduleId: string) => {
    setSelectedModuleId(moduleId);
    setEditingLesson(lesson);
    setLessonForm({
      title: lesson.title,
      description: lesson.description || "",
      type: lesson.type,
      content_url: lesson.content_url || "",
      duration_minutes: lesson.duration_minutes,
      is_preview: lesson.is_preview,
      study_materials: lesson.study_materials || "",
      practice_materials: lesson.practice_materials || "",
    });
    setMaterialsDialogOpen(true);
  };

  const handleUpdateMaterials = async () => {
    if (!editingLesson || !selectedModuleId || !course?.id) return;

    try {
      const response = await fetch(
        `/api/courses/${course.id}/modules/${selectedModuleId}/lessons/${editingLesson.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            study_materials: lessonForm.study_materials,
            practice_materials: lessonForm.practice_materials,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update materials");

      await fetchCourse();
      setMaterialsDialogOpen(false);
      setEditingLesson(null);
    } catch (error) {
      console.error("Error updating materials:", error);
      alert("Failed to update materials");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Course Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          {error || "The course you're looking for doesn't exist."}
        </p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.push(`/dashboard/courses/${course.slug}`)}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage Course Syllabus
            </h1>
            <p className="text-gray-600">{course.title}</p>
          </div>

          <Button
            onClick={() => {
              setEditingModule(null);
              setModuleForm({ title: "", description: "" });
              setModuleDialogOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Module
          </Button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Modules Yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start building your course by adding the first module.
              </p>
              <Button
                onClick={() => {
                  setEditingModule(null);
                  setModuleForm({ title: "", description: "" });
                  setModuleDialogOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Module
              </Button>
            </CardContent>
          </Card>
        ) : (
          modules.map((module) => (
            <Card key={module.id} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <div className="flex-1">
                      <CardTitle className="text-xl">
                        Module {module.order_index}: {module.title}
                      </CardTitle>
                      {module.description && (
                        <CardDescription className="mt-1">
                          {module.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {module.course_lessons?.length || 0} lessons
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openCreateLessonDialog(module.id)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Lesson
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModuleDialog(module)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteTarget({ type: "module", id: module.id });
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {module.course_lessons && module.course_lessons.length > 0 ? (
                  <div className="space-y-3">
                    {module.course_lessons
                      .sort((a, b) => a.order_index - b.order_index)
                      .map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                            {lesson.type === "video" ? (
                              <Video className="w-5 h-5 text-red-600" />
                            ) : (
                              <FileText className="w-5 h-5 text-blue-600" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {lesson.duration_minutes} min • {lesson.type}
                                {lesson.is_preview && " • Preview"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                openMaterialsDialog(lesson, module.id)
                              }
                            >
                              <BookOpen className="w-4 h-4 mr-1" />
                              Materials
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                openEditLessonDialog(lesson, module.id)
                              }
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDeleteTarget({
                                  type: "lesson",
                                  id: lesson.id,
                                });
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No lessons in this module yet.</p>
                    <Button
                      variant="link"
                      onClick={() => openCreateLessonDialog(module.id)}
                      className="mt-2"
                    >
                      Add First Lesson
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Module Dialog */}
      <Dialog open={moduleDialogOpen} onOpenChange={setModuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingModule ? "Edit Module" : "Add New Module"}
            </DialogTitle>
            <DialogDescription>
              {editingModule
                ? "Update the module information"
                : "Create a new module for your course"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="module-title">Module Title *</Label>
              <Input
                id="module-title"
                value={moduleForm.title}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, title: e.target.value })
                }
                placeholder="e.g., Introduction to Arabic"
              />
            </div>

            <div>
              <Label htmlFor="module-description">Description</Label>
              <Textarea
                id="module-description"
                value={moduleForm.description}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, description: e.target.value })
                }
                placeholder="Brief description of what this module covers"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setModuleDialogOpen(false);
                setEditingModule(null);
                setModuleForm({ title: "", description: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={editingModule ? handleUpdateModule : handleCreateModule}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!moduleForm.title}
            >
              <Save className="w-4 h-4 mr-2" />
              {editingModule ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lesson Dialog */}
      <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? "Edit Lesson" : "Add New Lesson"}
            </DialogTitle>
            <DialogDescription>
              {editingLesson
                ? "Update the lesson information"
                : "Create a new lesson for this module"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lesson-title">Lesson Title *</Label>
                <Input
                  id="lesson-title"
                  value={lessonForm.title}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, title: e.target.value })
                  }
                  placeholder="e.g., Basic Greetings"
                />
              </div>

              <div>
                <Label htmlFor="lesson-type">Type *</Label>
                <Select
                  value={lessonForm.type}
                  onValueChange={(value) =>
                    setLessonForm({ ...lessonForm, type: value })
                  }
                >
                  <SelectTrigger id="lesson-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="lesson-description">Description</Label>
              <Textarea
                id="lesson-description"
                value={lessonForm.description}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, description: e.target.value })
                }
                placeholder="Brief description of this lesson"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lesson-url">Content URL</Label>
                <Input
                  id="lesson-url"
                  value={lessonForm.content_url}
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      content_url: e.target.value,
                    })
                  }
                  placeholder="YouTube URL or resource link"
                />
              </div>

              <div>
                <Label htmlFor="lesson-duration">Duration (minutes)</Label>
                <Input
                  id="lesson-duration"
                  type="number"
                  value={lessonForm.duration_minutes}
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      duration_minutes: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="15"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lesson-preview"
                checked={lessonForm.is_preview}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, is_preview: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="lesson-preview" className="cursor-pointer">
                Allow preview (students can view without enrolling)
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setLessonDialogOpen(false);
                setEditingLesson(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={editingLesson ? handleUpdateLesson : handleCreateLesson}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!lessonForm.title}
            >
              <Save className="w-4 h-4 mr-2" />
              {editingLesson ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Materials Dialog */}
      <Dialog open={materialsDialogOpen} onOpenChange={setMaterialsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Study & Practice Materials</DialogTitle>
            <DialogDescription>{editingLesson?.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="study-materials">
                Study Materials (HTML supported)
              </Label>
              <Textarea
                id="study-materials"
                value={lessonForm.study_materials}
                onChange={(e) =>
                  setLessonForm({
                    ...lessonForm,
                    study_materials: e.target.value,
                  })
                }
                placeholder="<h3>Lesson Content</h3><p>Add your study materials here...</p>"
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use HTML tags like &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;,
                &lt;li&gt;, &lt;strong&gt;, etc.
              </p>
            </div>

            <div>
              <Label htmlFor="practice-materials">
                Practice Materials (HTML supported)
              </Label>
              <Textarea
                id="practice-materials"
                value={lessonForm.practice_materials}
                onChange={(e) =>
                  setLessonForm({
                    ...lessonForm,
                    practice_materials: e.target.value,
                  })
                }
                placeholder="<h3>Practice Exercises</h3><p>Add practice questions and exercises here...</p>"
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use HTML tags to format practice exercises, scenarios, and
                answers
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setMaterialsDialogOpen(false);
                setEditingLesson(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateMaterials}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Materials
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {deleteTarget?.type}? This
              action cannot be undone.
              {deleteTarget?.type === "module" &&
                " All lessons in this module will also be deleted."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setDeleteTarget(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={
                deleteTarget?.type === "module"
                  ? handleDeleteModule
                  : handleDeleteLesson
              }
              variant="destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
