"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag } from "@/components/ui/tag";
import { Home, ChevronRight, FolderOpen } from "lucide-react";
import Link from "next/link";

// Dummy data for different media types
const pdfs = [
  {
    id: 1,
    title: "Complete Guide to Islamic Prayer",
    filename: "islamic-prayer-guide.pdf",
    size: "2.4 MB",
    description: "Comprehensive guide covering all aspects of Islamic prayer",
    category: "Worship",
    downloads: 1247,
  },
  {
    id: 2,
    title: "Ramadan Fasting Guidelines",
    filename: "ramadan-fasting-guidelines.pdf",
    size: "1.8 MB",
    description: "Detailed guidelines for fasting during Ramadan",
    category: "Ramadan",
    downloads: 892,
  },
  {
    id: 3,
    title: "Islamic Finance Principles",
    filename: "islamic-finance-principles.pdf",
    size: "3.2 MB",
    description: "Understanding Islamic banking and finance",
    category: "Finance",
    downloads: 567,
  },
  {
    id: 4,
    title: "Hajj and Umrah Guide",
    filename: "hajj-umrah-complete-guide.pdf",
    size: "4.1 MB",
    description: "Complete step-by-step guide for Hajj and Umrah",
    category: "Pilgrimage",
    downloads: 2341,
  },
];

const audioFiles = [
  {
    id: 1,
    title: "Quran Recitation - Surah Al-Fatiha",
    speaker: "Sheikh Abdul Rahman Al-Sudais",
    duration: "3:45",
    description: "Beautiful recitation of the opening chapter of the Quran",
    category: "Quran",
    plays: 15420,
  },
  {
    id: 2,
    title: "Friday Khutbah: The Importance of Family",
    speaker: "Imam Omar Suleiman",
    duration: "25:30",
    description: "Friday sermon discussing family values in Islam",
    category: "Khutbah",
    plays: 8234,
  },
  {
    id: 3,
    title: "Islamic History: The Golden Age",
    speaker: "Dr. Yasir Qadhi",
    duration: "45:12",
    description: "Lecture on the golden age of Islamic civilization",
    category: "History",
    plays: 5678,
  },
  {
    id: 4,
    title: "Daily Dua Collection",
    speaker: "Various Scholars",
    duration: "18:20",
    description: "Collection of daily supplications and prayers",
    category: "Dua",
    plays: 12345,
  },
];

const videos = [
  {
    id: 1,
    title: "How to Perform Wudu (Ablution)",
    speaker: "Sheikh Muhammad Al-Ninowy",
    duration: "12:34",
    description: "Step-by-step guide to performing ablution correctly",
    category: "Worship",
    views: 45678,
    thumbnail: "wudu-guide.jpg",
  },
  {
    id: 2,
    title: "The Life of Prophet Muhammad (PBUH)",
    speaker: "Dr. Yasir Qadhi",
    duration: "1:25:45",
    description: "Comprehensive biography of Prophet Muhammad",
    category: "History",
    views: 23456,
    thumbnail: "prophet-life.jpg",
  },
  {
    id: 3,
    title: "Islamic Architecture Around the World",
    speaker: "Dr. Fatima Al-Zahra",
    duration: "38:20",
    description: "Exploring beautiful Islamic architecture globally",
    category: "Culture",
    views: 18923,
    thumbnail: "architecture.jpg",
  },
  {
    id: 4,
    title: "Understanding Islamic Finance",
    speaker: "Dr. Ahmed Hassan",
    duration: "52:15",
    description: "Complete overview of Islamic financial principles",
    category: "Finance",
    views: 15678,
    thumbnail: "finance.jpg",
  },
];

const images = [
  {
    id: 1,
    title: "Beautiful Mosque Architecture",
    caption: "The Blue Mosque in Istanbul, Turkey",
    category: "Architecture",
    views: 1234,
    filename: "blue-mosque.jpg",
  },
  {
    id: 2,
    title: "Islamic Calligraphy",
    caption: "Traditional Arabic calligraphy art",
    category: "Art",
    views: 856,
    filename: "calligraphy.jpg",
  },
  {
    id: 3,
    title: "Ramadan Lanterns",
    caption: "Traditional lanterns during Ramadan",
    category: "Culture",
    views: 2341,
    filename: "ramadan-lanterns.jpg",
  },
  {
    id: 4,
    title: "Islamic Geometric Patterns",
    caption: "Intricate geometric designs in Islamic art",
    category: "Art",
    views: 567,
    filename: "geometric-patterns.jpg",
  },
  {
    id: 5,
    title: "Hajj Pilgrimage",
    caption: "Pilgrims at the Kaaba during Hajj",
    category: "Pilgrimage",
    views: 3456,
    filename: "hajj-pilgrims.jpg",
  },
  {
    id: 6,
    title: "Islamic Gardens",
    caption: "Traditional Islamic garden design",
    category: "Architecture",
    views: 789,
    filename: "islamic-gardens.jpg",
  },
];

export default function MediaPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb - Outside Box */}
          <nav className="flex items-center gap-2 mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              href="/"
              className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
            >
              <Home className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-900 dark:text-neutral-100 font-medium">
              Media Library
            </span>
          </nav>

          {/* Container Box */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Media Resources
                </h1>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                Access Islamic content in various formats including PDFs, audio
                lectures, videos, and images.
              </p>
            </div>

            <Tabs defaultValue="pdfs" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pdfs">PDFs</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              {/* PDFs Tab */}
              <TabsContent value="pdfs" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pdfs.map((pdf) => (
                    <Card
                      key={pdf.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Tag variant="outline">{pdf.category}</Tag>
                          <span className="text-xs text-muted-foreground">
                            {pdf.size}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{pdf.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {pdf.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {pdf.downloads} downloads
                          </span>
                          <Button size="sm">Download</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Audio Tab */}
              <TabsContent value="audio" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {audioFiles.map((audio) => (
                    <Card
                      key={audio.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Tag variant="outline">{audio.category}</Tag>
                          <span className="text-xs text-muted-foreground">
                            {audio.duration}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{audio.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          By {audio.speaker}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {audio.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {audio.plays} plays
                          </span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Play
                            </Button>
                            <Button size="sm">Download</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Video Tab */}
              <TabsContent value="video" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <Card
                      key={video.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Tag variant="outline">{video.category}</Tag>
                          <span className="text-xs text-muted-foreground">
                            {video.duration}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted h-32 rounded-md mb-4 flex items-center justify-center">
                          <span className="text-muted-foreground">
                            Video Thumbnail
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          By {video.speaker}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {video.views} views
                          </span>
                          <Button size="sm">Watch</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Images Tab */}
              <TabsContent value="images" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <Card
                      key={image.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Tag variant="outline">{image.category}</Tag>
                          <span className="text-xs text-muted-foreground">
                            {image.views} views
                          </span>
                        </div>
                        <CardTitle className="text-lg">{image.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted h-48 rounded-md mb-4 flex items-center justify-center">
                          <span className="text-muted-foreground">
                            Image Preview
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {image.caption}
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm">Download</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
