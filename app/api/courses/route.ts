import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { getYouTubeThumbnail, extractYouTubeVideoId } from '@/lib/youtube';

// GET - List all courses with pagination, filters, and search
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const searchParams = request.nextUrl.searchParams;

        // Query parameters
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const level = searchParams.get('level') || '';
        const type = searchParams.get('type') || '';
        const status = searchParams.get('status') || 'published';
        const slug = searchParams.get('slug') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = (page - 1) * limit;

    // Build query with enhanced content (modules, lessons, resources, exercises)
    let query = supabase
      .from('courses')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        ),
        course_modules (
          id,
          title,
          description,
          order_index,
          course_lessons (
            id,
            title,
            description,
            type,
            content_url,
            duration_minutes,
            is_preview,
            order_index,
            study_materials,
            practice_materials,
            learning_objectives,
            lesson_resources (
              id,
              title,
              description,
              type,
              url,
              is_downloadable,
              order_index
            ),
            lesson_exercises (
              id,
              title,
              description,
              type,
              content,
              correct_answer,
              explanation,
              points,
              order_index
            )
          )
        )
      `, { count: 'exact' });

    // Apply filters
    if (slug) {
      query = query.eq('slug', slug);
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }

    if (level && level !== 'all') {
      query = query.eq('level', level);
    }

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    // Apply search
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,instructor_name.ilike.%${search}%`);
    }

    // Apply pagination and sorting
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: courses, error, count } = await query;

    if (error) {
      console.error('Supabase error fetching courses:', error);
      return NextResponse.json(
        { error: 'Failed to fetch courses', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      courses: courses || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminSupabaseClient(); // Use admin client for insert

    const body = await request.json();
    const {
      title,
      description,
      instructorName,
      instructorBio,
      instructorAvatar,
      category,
      level,
      type,
      price,
      introVideoUrl,
      status,
    } = body;

    // Validate required fields
    if (!title || !description || !instructorName || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate price for paid courses
    if (type === 'paid' && (!price || price <= 0)) {
      return NextResponse.json(
        { error: 'Price is required for paid courses' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Get category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', category)
      .single();

    if (categoryError || !categoryData) {
      console.error('Category lookup error:', categoryError);
      return NextResponse.json(
        { error: 'Invalid category', details: categoryError?.message },
        { status: 400 }
      );
    }

    // Generate thumbnail from YouTube URL if provided
    let thumbnailUrl = null;
    if (introVideoUrl) {
      thumbnailUrl = getYouTubeThumbnail(introVideoUrl);
    }

    // Insert course
    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        title,
        slug,
        description,
        instructor_name: instructorName,
        instructor_bio: instructorBio || null,
        instructor_avatar_url: instructorAvatar || null,
        category_id: categoryData.id,
        level: level || 'beginner',
        type: type || 'free',
        price: type === 'paid' ? price : null,
        thumbnail_url: thumbnailUrl,
        intro_video_url: introVideoUrl || null,
        duration_minutes: 0, // Will be calculated from modules/lessons
        status: status || 'draft',
        language: 'en',
        published_at: status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to create course', details: error.message, code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json(course, { status: 201 });
  } catch (error: any) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course', details: error.message },
      { status: 500 }
    );
  }
}

