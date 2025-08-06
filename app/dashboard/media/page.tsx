"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Download,
  Play,
  FileText,
  Music,
  Video,
  Image,
  Upload,
  File,
} from "lucide-react";

// Dummy media data
const mediaFiles = {
  pdfs: [
    {
      id: 1,
      name: "Islamic Finance Guide.pdf",
      type: "PDF",
      size: "2.4 MB",
      category: "Finance",
      uploadDate: "Dec 15, 2024",
      downloads: 156,
    },
    {
      id: 2,
      name: "Ramadan Preparation Checklist.pdf",
      type: "PDF",
      size: "1.8 MB",
      category: "Ramadan",
      uploadDate: "Dec 12, 2024",
      downloads: 234,
    },
  ],
  audio: [
    {
      id: 3,
      name: "Friday Khutbah - Dr. Ahmed Hassan",
      type: "Audio",
      size: "15.2 MB",
      category: "Khutbah",
      speaker: "Dr. Ahmed Hassan",
      duration: "25:30",
      uploadDate: "Dec 14, 2024",
      plays: 892,
    },
    {
      id: 4,
      name: "Quran Recitation - Surah Al-Fatiha",
      type: "Audio",
      size: "3.1 MB",
      category: "Quran",
      speaker: "Sheikh Omar Khan",
      duration: "4:15",
      uploadDate: "Dec 10, 2024",
      plays: 1247,
    },
  ],
  video: [
    {
      id: 5,
      name: "How to Perform Wudu Correctly",
      type: "Video",
      size: "45.7 MB",
      category: "Worship",
      duration: "8:45",
      uploadDate: "Dec 13, 2024",
      views: 2341,
    },
    {
      id: 6,
      name: "Islamic Architecture Documentary",
      type: "Video",
      size: "128.3 MB",
      category: "History",
      duration: "32:15",
      uploadDate: "Dec 8, 2024",
      views: 567,
    },
  ],
  images: [
    {
      id: 7,
      name: "Masjid Al-Haram.jpg",
      type: "Image",
      size: "2.1 MB",
      category: "Places",
      dimensions: "1920x1080",
      uploadDate: "Dec 15, 2024",
      views: 892,
    },
    {
      id: 8,
      name: "Islamic Calligraphy Art.png",
      type: "Image",
      size: "1.5 MB",
      category: "Art",
      dimensions: "1200x800",
      uploadDate: "Dec 11, 2024",
      views: 456,
    },
  ],
};

export default function MediaManagement() {
  const [activeTab, setActiveTab] = useState("pdfs");

  const getIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "Audio":
        return <Music className="h-5 w-5 text-blue-500" />;
      case "Video":
        return <Video className="h-5 w-5 text-purple-500" />;
      case "Image":
        return <Image className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActionButton = (type: string) => {
    switch (type) {
      case "PDF":
        return (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        );
      case "Audio":
        return (
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-1" />
            Play
          </Button>
        );
      case "Video":
        return (
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-1" />
            Watch
          </Button>
        );
      case "Image":
        return (
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Media</h1>
            <p className="text-gray-600 mt-2">
              Upload and manage audio, video, PDF, and image files
            </p>
          </div>
          <Link href="/dashboard/media/new">
            <Button className="mt-4 sm:mt-0">
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search media files..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Media Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pdfs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              PDFs
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdfs" className="mt-6">
            <div className="space-y-4">
              {mediaFiles.pdfs.map((file) => (
                <Card
                  key={file.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getIcon(file.type)}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {file.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>{file.size}</span>
                            <span>{file.category}</span>
                            <span>{file.uploadDate}</span>
                            <span>{file.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {getActionButton(file.type)}
                        <Link href={`/dashboard/media/${file.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
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
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <div className="space-y-4">
              {mediaFiles.audio.map((file) => (
                <Card
                  key={file.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getIcon(file.type)}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {file.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>{file.size}</span>
                            <span>{file.category}</span>
                            <span>{file.speaker}</span>
                            <span>{file.duration}</span>
                            <span>{file.uploadDate}</span>
                            <span>{file.plays} plays</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {getActionButton(file.type)}
                        <Link href={`/dashboard/media/${file.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
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
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <div className="space-y-4">
              {mediaFiles.video.map((file) => (
                <Card
                  key={file.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getIcon(file.type)}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {file.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>{file.size}</span>
                            <span>{file.category}</span>
                            <span>{file.duration}</span>
                            <span>{file.uploadDate}</span>
                            <span>{file.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {getActionButton(file.type)}
                        <Link href={`/dashboard/media/${file.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
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
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <div className="space-y-4">
              {mediaFiles.images.map((file) => (
                <Card
                  key={file.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getIcon(file.type)}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {file.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>{file.size}</span>
                            <span>{file.category}</span>
                            <span>{file.dimensions}</span>
                            <span>{file.uploadDate}</span>
                            <span>{file.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {getActionButton(file.type)}
                        <Link href={`/dashboard/media/${file.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
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
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
