'use client'

import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Clock, Users, Play } from 'lucide-react'
import { Database } from '@/lib/database.types.learning'

type Course = Database['public']['Tables']['courses']['Row'] & {
  instructor?: Database['public']['Tables']['profiles']['Row'] | null
}

interface CourseCardProps {
  course: Course
  showEnrollButton?: boolean
  onEnroll?: (courseId: string) => void
  isEnrolled?: boolean
}

export function CourseCard({ 
  course, 
  showEnrollButton = true, 
  onEnroll,
  isEnrolled = false 
}: CourseCardProps) {
  const formatDuration = (minutes: number | null) => {
    if (!minutes) return 'Duration not specified'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getYouTubeThumbnail = (url: string | null) => {
    if (!url) return null
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null
  }

  const thumbnailUrl = course.thumbnail_url || getYouTubeThumbnail(course.intro_video_url)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {thumbnailUrl && (
          <div className="aspect-video bg-gray-200">
            <img
              src={thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {course.type === 'paid' && (
          <Badge className="absolute top-2 right-2 bg-green-600">
            Paid
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
        {course.instructor && (
          <p className="text-sm text-gray-600">by {course.instructor.full_name}</p>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
          </div>
        </div>
        
        {course.objectives && course.objectives.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">What you&apos;ll learn:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {course.objectives.slice(0, 3).map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>{objective}</span>
                </li>
              ))}
              {course.objectives.length > 3 && (
                <li className="text-gray-500">+{course.objectives.length - 3} more objectives</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {showEnrollButton ? (
          isEnrolled ? (
            <Link href={`/courses/${course.slug}`} className="w-full">
              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </Link>
          ) : (
            <Button 
              className="w-full" 
              onClick={() => onEnroll?.(course.id)}
            >
              Enroll Now
            </Button>
          )
        ) : (
          <Link href={`/courses/${course.slug}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
