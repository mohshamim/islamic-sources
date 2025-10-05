import { CourseCard } from '@/components/cards/course-card'
import { MainLayout } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

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
  instructor?: {
    full_name: string
    avatar_url: string | null
  }
}

// Mock courses data
const courses: Course[] = [
  {
    id: "1",
    title: "Complete Quran Recitation Course",
    description: "Learn to recite the Quran with proper Tajweed rules and pronunciation.",
    type: "free",
    price: null,
    rating: 4.8,
    review_count: 156,
    duration: 480,
    level: "beginner",
    thumbnail_url: null,
    slug: "complete-quran-recitation-course",
    instructor: {
      full_name: "Sheikh Ahmed Al-Rashid",
      avatar_url: null
    }
  },
  {
    id: "2",
    title: "Advanced Islamic Jurisprudence",
    description: "Deep dive into Islamic law and jurisprudence with practical applications.",
    type: "paid",
    price: 199,
    rating: 4.9,
    review_count: 89,
    duration: 720,
    level: "advanced",
    thumbnail_url: null,
    slug: "advanced-islamic-jurisprudence",
    instructor: {
      full_name: "Dr. Fatima Al-Zahra",
      avatar_url: null
    }
  },
  {
    id: "3",
    title: "Islamic History and Civilization",
    description: "Explore the rich history of Islamic civilization from its early days to modern times.",
    type: "free",
    price: null,
    rating: 4.7,
    review_count: 234,
    duration: 600,
    level: "intermediate",
    thumbnail_url: null,
    slug: "islamic-history-and-civilization",
    instructor: {
      full_name: "Prof. Omar Abdullah",
      avatar_url: null
    }
  },
  {
    id: "4",
    title: "Arabic Language for Beginners",
    description: "Master the fundamentals of Arabic language with focus on Quranic Arabic.",
    type: "paid",
    price: 149,
    rating: 4.6,
    review_count: 167,
    duration: 540,
    level: "beginner",
    thumbnail_url: null,
    slug: "arabic-language-for-beginners",
    instructor: {
      full_name: "Ustadha Aisha Khan",
      avatar_url: null
    }
  },
  {
    id: "5",
    title: "Hadith Studies and Authentication",
    description: "Learn the science of Hadith authentication and classification.",
    type: "paid",
    price: 299,
    rating: 4.9,
    review_count: 45,
    duration: 900,
    level: "advanced",
    thumbnail_url: null,
    slug: "hadith-studies-and-authentication",
    instructor: {
      full_name: "Sheikh Muhammad Al-Hakim",
      avatar_url: null
    }
  },
  {
    id: "6",
    title: "Islamic Ethics and Morality",
    description: "Understanding Islamic principles of ethics and moral conduct in daily life.",
    type: "free",
    price: null,
    rating: 4.5,
    review_count: 123,
    duration: 360,
    level: "beginner",
    thumbnail_url: null,
    slug: "islamic-ethics-and-morality",
    instructor: {
      full_name: "Dr. Sarah Al-Mansouri",
      avatar_url: null
    }
  }
]

interface CoursesPageProps {
  searchParams: Promise<{
    search?: string
    type?: string
    sort?: string
  }>
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams
  
  let filteredCourses = courses

  // Apply search filter
  if (params.search) {
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(params.search!.toLowerCase()) ||
      course.description.toLowerCase().includes(params.search!.toLowerCase())
    )
  }

  // Apply type filter
  if (params.type && params.type !== 'all') {
    filteredCourses = filteredCourses.filter(course => course.type === params.type)
  }

  // Apply sorting
  switch (params.sort) {
    case 'rating':
      filteredCourses.sort((a, b) => b.rating - a.rating)
      break
    case 'price_low':
      filteredCourses.sort((a, b) => (a.price || 0) - (b.price || 0))
      break
    case 'price_high':
      filteredCourses.sort((a, b) => (b.price || 0) - (a.price || 0))
      break
    case 'duration':
      filteredCourses.sort((a, b) => a.duration - b.duration)
      break
    default:
      // Keep original order (newest first)
      break
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Islamic Courses</h1>
            <p className="text-lg text-gray-600">
              Learn authentic Islamic knowledge from qualified scholars and instructors.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  defaultValue={params.search || ''}
                  className="pl-10"
                />
              </div>

              {/* Type Filter */}
              <Select defaultValue={params.type || 'all'}>
                <SelectTrigger>
                  <SelectValue placeholder="Course Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="free">Free Courses</SelectItem>
                  <SelectItem value="paid">Paid Courses</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select defaultValue={params.sort || 'newest'}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter Button */}
              <Button className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              {params.search ? ` for "${params.search}"` : ''}
            </p>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                {params.search ? 'Try adjusting your search terms' : 'No courses found'}
              </div>
              <Button variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}