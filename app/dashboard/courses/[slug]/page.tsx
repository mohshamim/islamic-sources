"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Video,
  FileImage,
  File,
  Link as LinkIcon,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructor_name: string;
  instructor_bio?: string;
  instructor_avatar_url?: string;
  category_id: string;
  level: string;
  type: string;
  price?: number;
  duration_minutes: number;
  thumbnail_url?: string;
  intro_video_url?: string;
  rating: number;
  review_count: number;
  enrollment_count: number;
  views: number;
  featured: boolean;
  status: string;
  language: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
  modules?: Module[];
}

interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  lessons?: Lesson[];
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  type: string;
  content_url?: string;
  duration_minutes: number;
  is_preview: boolean;
  order_index: number;
  study_materials?: string;
  practice_materials?: string;
  resources?: Resource[];
}

interface Resource {
  id: string;
  lesson_id: string;
  title: string;
  type: "pdf" | "image" | "video" | "link";
  url: string;
  description?: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  const fetchCourse = async () => {
    if (!params.slug) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/courses?slug=${params.slug}`);
      if (!response.ok) throw new Error("Failed to fetch course");

      const data = await response.json();
      const courseData = data.courses[0];

      // Map course_modules to modules and course_lessons to lessons for consistency
      if (courseData?.course_modules) {
        courseData.modules = courseData.course_modules.map((module: any) => ({
          ...module,
          lessons: module.course_lessons || [],
        }));
      }

      setCourse(courseData);

      // Expand first module by default
      if (courseData?.modules?.[0]) {
        setExpandedModules(new Set([courseData.modules[0].id]));
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

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <File className="w-4 h-4" />;
      case "image":
        return <FileImage className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
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
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>

          <Link href={`/dashboard/courses/${course.slug}/manage`}>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Edit className="w-4 h-4 mr-2" />
              Manage Syllabus
            </Button>
          </Link>
        </div>

        <div className="flex items-start gap-6">
          {/* Course Thumbnail */}
          <div className="flex-shrink-0">
            {course.thumbnail_url ? (
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-48 h-32 object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-48 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg shadow-lg flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-emerald-100 text-emerald-800">
                {course.categories?.name || "General"}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 capitalize">
                {course.level}
              </Badge>
              <Badge
                className={
                  course.type === "free"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }
              >
                {course.type === "free" ? "Free" : `$${course.price}`}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {course.title}
            </h1>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {course.description}
            </p>

            {/* Course Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{formatDuration(course.duration_minutes)}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>{course.enrollment_count} enrolled</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span>
                  {course.rating.toFixed(1)} ({course.review_count} reviews)
                </span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src={course.instructor_avatar_url} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  {course.instructor_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {course.instructor_name}
                </h3>
                <p className="text-sm text-gray-600">Instructor</p>
                {course.instructor_bio && (
                  <p className="text-sm text-gray-500 mt-1">
                    {course.instructor_bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Course Syllabus */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Course Syllabus
              </CardTitle>
              <CardDescription>
                Complete course structure organized by modules and lessons
              </CardDescription>
            </CardHeader>
            <CardContent>
              {course.modules && course.modules.length > 0 ? (
                <div className="space-y-4">
                  {course.modules
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((module) => (
                      <Collapsible
                        key={module.id}
                        open={expandedModules.has(module.id)}
                        onOpenChange={() => toggleModule(module.id)}
                      >
                        <Card className="border border-gray-200">
                          <CollapsibleTrigger asChild>
                            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {expandedModules.has(module.id) ? (
                                    <ChevronDown className="w-5 h-5 mr-3 text-gray-500" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 mr-3 text-gray-500" />
                                  )}
                                  <div>
                                    <CardTitle className="text-lg">
                                      Module {module.order_index}:{" "}
                                      {module.title}
                                    </CardTitle>
                                    {module.description && (
                                      <CardDescription className="mt-1">
                                        {module.description}
                                      </CardDescription>
                                    )}
                                  </div>
                                </div>
                                <Badge variant="outline">
                                  {module.lessons?.length || 0} lessons
                                </Badge>
                              </div>
                            </CardHeader>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <CardContent className="pt-0">
                              {module.lessons && module.lessons.length > 0 ? (
                                <div className="space-y-3">
                                  {module.lessons
                                    .sort(
                                      (a, b) => a.order_index - b.order_index
                                    )
                                    .map((lesson, index) => (
                                      <div
                                        key={lesson.id}
                                        className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                      >
                                        <div className="flex items-start gap-4">
                                          <div className="flex-shrink-0 mt-1">
                                            {lesson.type === "video" ? (
                                              <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                                                <Play className="w-4 h-4" />
                                              </div>
                                            ) : (
                                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                                <FileText className="w-4 h-4" />
                                              </div>
                                            )}
                                          </div>

                                          <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 mb-1">
                                              {lesson.title}
                                            </h4>
                                            {lesson.description && (
                                              <p className="text-sm text-gray-600 mb-2">
                                                {lesson.description}
                                              </p>
                                            )}

                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                              <span className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {formatDuration(
                                                  lesson.duration_minutes
                                                )}
                                              </span>
                                              <span className="capitalize">
                                                {lesson.type}
                                              </span>
                                              {lesson.is_preview && (
                                                <Badge
                                                  variant="outline"
                                                  className="text-xs"
                                                >
                                                  Preview
                                                </Badge>
                                              )}
                                            </div>

                                            {/* Study Materials */}
                                            {lesson.study_materials && (
                                              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                                <h5 className="font-medium text-blue-900 mb-2 flex items-center">
                                                  <FileText className="w-4 h-4 mr-2" />
                                                  Study Materials
                                                </h5>
                                                <div className="prose prose-sm max-w-none text-blue-800">
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        lesson.study_materials,
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            )}

                                            {/* Practice Materials */}
                                            {lesson.practice_materials && (
                                              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                                                <h5 className="font-medium text-green-900 mb-2 flex items-center">
                                                  <CheckCircle className="w-4 h-4 mr-2" />
                                                  Practice Materials
                                                </h5>
                                                <div className="prose prose-sm max-w-none text-green-800">
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        lesson.practice_materials,
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            )}

                                            {/* Resources */}
                                            {lesson.resources &&
                                              lesson.resources.length > 0 && (
                                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                                  <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Resources
                                                  </h5>
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {lesson.resources.map(
                                                      (resource) => (
                                                        <a
                                                          key={resource.id}
                                                          href={resource.url}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className="flex items-center gap-2 p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
                                                        >
                                                          {getResourceIcon(
                                                            resource.type
                                                          )}
                                                          <span className="text-sm font-medium text-gray-900">
                                                            {resource.title}
                                                          </span>
                                                          <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
                                                        </a>
                                                      )
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-center py-8">
                                  No lessons available in this module yet.
                                </p>
                              )}
                            </CardContent>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Course Content Coming Soon
                  </h3>
                  <p className="text-gray-500">
                    The instructor is preparing the course materials.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  0%
                </div>
                <p className="text-sm text-gray-600">Not Started</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Start Learning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Course
              </Button>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Materials
              </Button>
            </CardContent>
          </Card>

          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Language</span>
                <span className="font-medium uppercase">{course.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Level</span>
                <span className="font-medium capitalize">{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">
                  {formatDuration(course.duration_minutes)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-medium">
                  {course.type === "free" ? "Free" : `$${course.price}`}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
