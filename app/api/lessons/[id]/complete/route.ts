import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// POST - Mark lesson as complete
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: lessonId } = await params;
    const supabase = createAdminSupabaseClient();

    const body = await request.json();
    const { enrollmentId, completed } = body;

    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      );
    }

    // Check if progress record exists
    const { data: existingProgress } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('enrollment_id', enrollmentId)
      .eq('lesson_id', lessonId)
      .single();

    let progress;

    if (existingProgress) {
      // Update existing progress
      const { data, error } = await supabase
        .from('lesson_progress')
        .update({
          completed: completed !== undefined ? completed : true,
          completed_at: completed !== false ? new Date().toISOString() : null,
          last_viewed_at: new Date().toISOString(),
        })
        .eq('id', existingProgress.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating progress:', error);
        return NextResponse.json(
          { error: 'Failed to update progress', details: error.message },
          { status: 500 }
        );
      }
      progress = data;
    } else {
      // Create new progress record
      const { data, error } = await supabase
        .from('lesson_progress')
        .insert({
          enrollment_id: enrollmentId,
          lesson_id: lessonId,
          completed: completed !== undefined ? completed : true,
          completed_at: completed !== false ? new Date().toISOString() : null,
          last_viewed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating progress:', error);
        return NextResponse.json(
          { error: 'Failed to create progress', details: error.message },
          { status: 500 }
        );
      }
      progress = data;
    }

    // Note: Enrollment progress_percentage is auto-updated by trigger

    return NextResponse.json(progress);
  } catch (error: any) {
    console.error('Error marking lesson complete:', error);
    return NextResponse.json(
      { error: 'Failed to mark lesson complete', details: error.message },
      { status: 500 }
    );
  }
}

// GET - Get progress for a lesson
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: lessonId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const enrollmentId = searchParams.get('enrollmentId');

    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminSupabaseClient();

    const { data: progress, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('enrollment_id', enrollmentId)
      .eq('lesson_id', lessonId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching progress:', error);
      return NextResponse.json(
        { error: 'Failed to fetch progress', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      progress: progress || null,
      completed: progress?.completed || false,
    });
  } catch (error: any) {
    console.error('Error fetching lesson progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson progress', details: error.message },
      { status: 500 }
    );
  }
}

