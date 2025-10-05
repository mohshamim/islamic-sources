import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, Clock, Users, Play, CheckCircle, Lock } from 'lucide-react'
import { notFound } from 'next/navigation'

interface Course {
  id: string
  title: string
  description: string
  type: 'free' | 'paid'
  price: number | null
  rating: number
  review_count: number
  duration: number
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnail_url: string | null
  slug: string
  objectives?: string[]
  intro_video_url?: string
  instructor?: {
    full_name: string
    avatar_url: string | null
  }
  modules?: Array<{
    id: string
    title: string
    description?: string
    estimated_time: number
    order_index: number
    items?: Array<{
      id: string
      title: string
      type: string
      order_index: number
    }>
  }>
  reviews?: Array<{
    id: string
    rating: number
    comment?: string
    user?: {
      full_name: string
    }
  }>
}

// Mock courses data
const courses: Course[] = [
  {
    id: "1",
    title: "Complete Quran Recitation Course",
    description: "Learn to recite the Quran with proper Tajweed rules and pronunciation. This comprehensive course covers all aspects of Quranic recitation from basic to advanced levels.",
    type: "free",
    price: null,
    rating: 4.8,
    review_count: 156,
    duration: 480,
    level: "beginner",
    thumbnail_url: null,
    slug: "complete-quran-recitation-course",
    objectives: [
      "Master proper pronunciation of Arabic letters",
      "Understand Tajweed rules and their application",
      "Recite Quran with correct rhythm and melody",
      "Memorize selected Surahs with proper recitation"
    ],
    intro_video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    instructor: {
      full_name: "Sheikh Ahmed Al-Rashid",
      avatar_url: null
    },
    modules: [
      {
        id: "1",
        title: "Introduction to Tajweed",
        description: "Basic principles and importance of Tajweed",
        estimated_time: 60,
        order_index: 1,
        items: [
          { id: "1", title: "What is Tajweed?", type: "video", order_index: 1 },
          { id: "2", title: "History of Tajweed", type: "video", order_index: 2 },
          { id: "3", title: "Quiz: Tajweed Basics", type: "quiz", order_index: 3 }
        ]
      },
      {
        id: "2", 
        title: "Arabic Letter Pronunciation",
        description: "Learn correct pronunciation of all Arabic letters",
        estimated_time: 120,
        order_index: 2,
        items: [
          { id: "4", title: "Letter Recognition", type: "video", order_index: 1 },
          { id: "5", title: "Pronunciation Practice", type: "exercise", order_index: 2 },
          { id: "6", title: "Common Mistakes", type: "video", order_index: 3 }
        ]
      }
    ],
    reviews: [
      {
        id: "1",
        rating: 5,
        comment: "Excellent course! The instructor explains everything clearly and the pace is perfect for beginners.",
        user: { full_name: "Ahmed Hassan" }
      },
      {
        id: "2", 
        rating: 4,
        comment: "Very comprehensive and well-structured. Highly recommend!",
        user: { full_name: "Fatima Ali" }
      }
    ]
  }
]

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params

  // Find course by slug
  const course = courses.find(c => c.slug === slug)

  if (!course) {
    notFound()
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getYouTubeEmbedUrl = (url: string | null) => {
    if (!url) return null
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  const totalDuration = course.modules?.reduce((sum, module) => {
    return sum + (module.estimated_time || 0)
  }, 0) || 0

  const totalItems = course.modules?.reduce((sum, module) => {
    return sum + (module.items?.length || 0)
  }, 0) || 0

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Course Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={course.type === 'free' ? 'default' : 'secondary'}>
                    {course.type === 'free' ? 'Free Course' : 'Paid Course'}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({course.reviews?.length || 0} reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                
                {course.instructor && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {course.instructor.full_name?.charAt(0) || 'I'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Instructor</p>
                      <p className="text-sm text-gray-600">{course.instructor.full_name}</p>
                    </div>
                  </div>
                )}
                
                <p className="text-gray-700 mb-6">{course.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(totalDuration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{totalItems} lessons</span>
                  </div>
                </div>
                
                {course.objectives && course.objectives.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">What you'll learn:</h3>
                    <ul className="space-y-2">
                      {course.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <Button size="lg" className="flex items-center gap-2">
                    Enroll Now
                  </Button>
                </div>
              </div>
              
              {/* Intro Video */}
              {course.intro_video_url && (
                <div>
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      src={getYouTubeEmbedUrl(course.intro_video_url) || ''}
                      title={course.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {course.modules && course.modules.length > 0 ? (
                    <div className="space-y-4">
                      {course.modules
                        .sort((a, b) => a.order_index - b.order_index)
                        .map((module, index) => (
                          <div key={module.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-gray-900">
                                Module {index + 1}: {module.title}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{formatDuration(module.estimated_time)}</span>
                              </div>
                            </div>
                            {module.description && (
                              <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                            )}
                            <div className="space-y-2">
                              {module.items
                                ?.sort((a, b) => a.order_index - b.order_index)
                                .map((item) => (
                                  <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                    <div className="flex-shrink-0">
                                      <Lock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                      <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <Badge variant="outline" className="text-xs">
                                        {item.type}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Course content is being prepared.</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Course Details Sidebar */}
            <div className="space-y-6">
              {/* Course Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{formatDuration(totalDuration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-medium">{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Modules:</span>
                    <span className="font-medium">{course.modules?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <Badge variant={course.type === 'free' ? 'default' : 'secondary'}>
                      {course.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              {course.reviews && course.reviews.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews ({course.reviews.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.reviews.slice(0, 3).map((review) => (
                        <div key={review.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{review.user?.full_name}</span>
                          </div>
                          {review.comment && (
                            <p className="text-sm text-gray-600">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}