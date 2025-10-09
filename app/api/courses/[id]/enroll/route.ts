import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// POST - Enroll in a course
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: courseId } = await params;
    const supabase = createAdminSupabaseClient();

    const body = await request.json();
    const { userEmail, userName } = body;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('course_id', courseId)
      .eq('user_email', userEmail)
      .single();

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course', enrollment: existingEnrollment },
        { status: 400 }
      );
    }

    // Create enrollment
    const { data: enrollment, error } = await supabase
      .from('course_enrollments')
      .insert({
        course_id: courseId,
        user_email: userEmail,
        user_name: userName || null,
        enrolled_at: new Date().toISOString(),
        progress_percentage: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating enrollment:', error);
      return NextResponse.json(
        { error: 'Failed to enroll in course', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error: any) {
    console.error('Error enrolling in course:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course', details: error.message },
      { status: 500 }
    );
  }
}

// GET - Get enrollment status for a user
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: courseId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminSupabaseClient();

    const { data: enrollment, error } = await supabase
      .from('course_enrollments')
      .select('*')
      .eq('course_id', courseId)
      .eq('user_email', userEmail)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching enrollment:', error);
      return NextResponse.json(
        { error: 'Failed to fetch enrollment', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      enrolled: !!enrollment,
      enrollment: enrollment || null,
    });
  } catch (error: any) {
    console.error('Error fetching enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollment', details: error.message },
      { status: 500 }
    );
  }
}

