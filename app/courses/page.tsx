import { createClient } from '@/lib/supabase/server'
import { CourseCard } from '@/components/cards/course-card'
import { MainLayout } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'
import { Database } from '@/lib/database.types.learning'

type Course = Database['public']['Tables']['courses']['Row'] & {
  instructor?: Database['public']['Tables']['profiles']['Row']
  review_count?: number
}

interface CoursesPageProps {
  searchParams: Promise<{
    search?: string
    type?: string
    sort?: string
  }>
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const supabase = await createClient()
  const params = await searchParams
  
  let query = supabase
    .from('courses')
    .select(`
      *,
      instructor:profiles!courses_instructor_id_fkey(*)
    `)
    .order('created_at', { ascending: false })

  // Apply search filter
  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`)
  }

  // Apply type filter
  if (params.type && params.type !== 'all') {
    query = query.eq('type', params.type as 'free' | 'paid')
  }

  // Apply sorting
  switch (params.sort) {
    case 'rating':
      query = query.order('rating', { ascending: false })
      break
    case 'duration':
      query = query.order('duration', { ascending: true })
      break
    case 'title':
      query = query.order('title', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data: courses, error } = await query

  if (error) {
    console.error('Error fetching courses:', error)
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Islamic Learning Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover comprehensive Islamic courses covering Quran, Hadith, Fiqh, and more. 
              Learn from qualified instructors and deepen your understanding of Islam.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    defaultValue={params.search || ''}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select defaultValue={params.type || 'all'}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue={params.sort || 'newest'}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration">Shortest</SelectItem>
                    <SelectItem value="title">A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600">{courses?.length || 0}</h3>
              <p className="text-gray-600">Total Courses</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-2xl font-bold text-green-600">
                {courses?.filter(c => c.type === 'free').length || 0}
              </h3>
              <p className="text-gray-600">Free Courses</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-2xl font-bold text-purple-600">
                {courses?.filter(c => c.type === 'paid').length || 0}
              </h3>
              <p className="text-gray-600">Paid Courses</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-2xl font-bold text-yellow-600">
                {courses?.length ? (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1) : '0.0'}
              </h3>
              <p className="text-gray-600">Avg Rating</p>
            </div>
          </div>

          {/* Courses Grid */}
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  showEnrollButton={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">
                {searchParams.search 
                  ? 'Try adjusting your search terms or filters.'
                  : 'No courses are available at the moment.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
