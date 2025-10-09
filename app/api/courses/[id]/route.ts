import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { getYouTubeThumbnail } from '@/lib/youtube';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Get single course with modules and lessons
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();

    // Fetch course with category
    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .single();

    if (error || !course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Fetch modules with lessons
    const { data: modules, error: modulesError } = await supabase
      .from('course_modules')
      .select(`
        *,
        course_lessons (*)
      `)
      .eq('course_id', id)
      .order('order_index', { ascending: true });

    if (modulesError) {
      console.error('Error fetching modules:', modulesError);
    }

    // Sort lessons within each module
    const modulesWithSortedLessons = modules?.map(module => ({
      ...module,
      course_lessons: module.course_lessons?.sort(
        (a: any, b: any) => a.order_index - b.order_index
      ) || [],
    })) || [];

    return NextResponse.json({
      ...course,
      modules: modulesWithSortedLessons,
    });
  } catch (error: any) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update course
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = createAdminSupabaseClient(); // Use admin client for update

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

    // Generate new slug if title changed
    let slug;
    if (title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    // Get category ID if category changed
    let categoryId;
    if (category) {
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single();

      if (categoryError || !categoryData) {
        return NextResponse.json(
          { error: 'Invalid category' },
          { status: 400 }
        );
      }
      categoryId = categoryData.id;
    }

    // Generate thumbnail from YouTube URL if provided
    let thumbnailUrl;
    if (introVideoUrl) {
      thumbnailUrl = getYouTubeThumbnail(introVideoUrl);
    }

    // Build update object
    const updateData: any = {};
    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (description) updateData.description = description;
    if (instructorName) updateData.instructor_name = instructorName;
    if (instructorBio !== undefined) updateData.instructor_bio = instructorBio;
    if (instructorAvatar !== undefined) updateData.instructor_avatar_url = instructorAvatar;
    if (categoryId) updateData.category_id = categoryId;
    if (level) updateData.level = level;
    if (type) updateData.type = type;
    if (type === 'paid' && price !== undefined) updateData.price = price;
    if (type === 'free') updateData.price = null;
    if (introVideoUrl !== undefined) updateData.intro_video_url = introVideoUrl;
    if (thumbnailUrl) updateData.thumbnail_url = thumbnailUrl;
    if (status) {
      updateData.status = status;
      if (status === 'published') {
        updateData.published_at = new Date().toISOString();
      }
    }

    // Update course
    const { data: course, error } = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { error: 'Failed to update course', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(course);
  } catch (error: any) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete course
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = createAdminSupabaseClient(); // Use admin client for delete

    // Delete course (cascade will delete modules, lessons, enrollments, etc.)
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete course', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course', details: error.message },
      { status: 500 }
    );
  }
}

