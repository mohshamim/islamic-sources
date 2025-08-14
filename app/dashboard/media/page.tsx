"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Music,
  Video,
  FileText,
  Image as ImageIcon,
  Calendar,
  Loader2,
  Clock,
  Play,
  Tag,
  Download,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface Media {
  _id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  tags: string[];
  status: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  speaker?: string;
  duration?: number;
  thumbnail?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  createdAt: string;
  views: number;
  slug: string;
  plays?: number;
  downloads?: number;
}

export default function MediaManagement() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMedia, setTotalMedia] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterType]);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filterStatus) params.append("status", filterStatus);
      if (filterType) params.append("type", filterType);
      params.append("page", currentPage.toString());
      params.append("limit", "10");

      const response = await fetch(`/api/media?${params.toString()}`);
      const data = await response.json();
      setMedia(data.media || []);
      setTotalPages(data.pagination?.pages || 1);
      setTotalMedia(data.pagination?.total || 0);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterStatus, filterType, currentPage]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this media? This action cannot be undone."
      )
    )
      return;

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Media deleted successfully!");
        fetchMedia(); // Refresh the list
      } else {
        const error = await response.json();
        alert(`Error deleting media: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Error deleting media. Please try again.");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Music className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <Music className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Media</h1>
            <p className="text-gray-600 mt-2">
              Upload, edit, and manage Islamic media files
            </p>
          </div>
          <Link href="/dashboard/media/new">
            <Button className="mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Upload New Media
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search media..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "" ? "default" : "outline"}
                  onClick={() => setFilterStatus("")}
                >
                  All Status
                </Button>
                <Button
                  variant={filterStatus === "published" ? "default" : "outline"}
                  onClick={() => setFilterStatus("published")}
                >
                  Published
                </Button>
                <Button
                  variant={filterStatus === "draft" ? "default" : "outline"}
                  onClick={() => setFilterStatus("draft")}
                >
                  Draft
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "" ? "default" : "outline"}
                  onClick={() => setFilterType("")}
                >
                  All Types
                </Button>
                <Button
                  variant={filterType === "audio" ? "default" : "outline"}
                  onClick={() => setFilterType("audio")}
                >
                  Audio
                </Button>
                <Button
                  variant={filterType === "video" ? "default" : "outline"}
                  onClick={() => setFilterType("video")}
                >
                  Video
                </Button>
                <Button
                  variant={filterType === "pdf" ? "default" : "outline"}
                  onClick={() => setFilterType("pdf")}
                >
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : media.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Music className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No media found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by uploading your first media file.
              </p>
              <Link href="/dashboard/media/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload First Media
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {media.map((item) => (
              <Card
                key={item._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <Badge
                          variant={
                            item.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className="ml-2 flex-shrink-0"
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          {getTypeIcon(item.type)}
                          <span className="capitalize">{item.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{item.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{item.views} views</span>
                        </div>
                        {item.type === "audio" || item.type === "video" ? (
                          <div className="flex items-center gap-1">
                            <Play className="h-4 w-4" />
                            <span>{item.plays} plays</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            <span>{item.downloads} downloads</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span>{formatFileSize(item.fileSize)}</span>
                        </div>
                        {item.duration && (
                          <div className="flex items-center gap-1">
                            <span>{formatDuration(item.duration)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          <span>{item.tags.length} tags</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 lg:flex-col">
                      <Link href={`/dashboard/media/${item._id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/media/${item.slug}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(item._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Showing {media.length} of {totalMedia} media files
        </div>
      </div>
    </MainLayout>
  );
}
