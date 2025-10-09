import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { v4 as uuidv4 } from 'uuid';

// GET - Get user's progress for a course
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    
    const courseId = searchParams.get('course_id');
    const sessionId = searchParams.get('session_id') || request.cookies.get('session_id')?.value;
    
    if (!courseId || !sessionId) {
      return NextResponse.json(
        { error: 'Course ID and session ID are required' },
        { status: 400 }
      );
    }

    // Get or create course progress
    const { data: progress, error: progressError } = await supabase
      .from('course_progress')
      .select(`
        *,
        lesson_completions (
          lesson_id,
          completed_at,
          time_spent_minutes
        )
      `)
      .eq('course_id', courseId)
      .eq('user_session_id', sessionId)
      .single();

    if (progressError && progressError.code !== 'PGRST116') {
      console.error('Error fetching progress:', progressError);
      return NextResponse.json(
        { error: 'Failed to fetch progress', details: progressError.message },
        { status: 500 }
      );
    }

    // If no progress exists, create it
    if (!progress) {
      const adminSupabase = createAdminSupabaseClient();
      const { data: newProgress, error: createError } = await adminSupabase
        .from('course_progress')
        .insert({
          course_id: courseId,
          user_session_id: sessionId,
          status: 'not_started',
        })
        .select(`
          *,
          lesson_completions (
            lesson_id,
            completed_at,
            time_spent_minutes
          )
        `)
        .single();

      if (createError) {
        console.error('Error creating progress:', createError);
        return NextResponse.json(
          { error: 'Failed to create progress', details: createError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ progress: newProgress });
    }

    return NextResponse.json({ progress });
  } catch (error: any) {
    console.error('Error in progress API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Mark lesson as complete
export async function POST(request: NextRequest) {
  try {
    const adminSupabase = createAdminSupabaseClient();
    const body = await request.json();
    
    const { course_id, lesson_id, session_id, time_spent } = body;
    
    if (!course_id || !lesson_id || !session_id) {
      return NextResponse.json(
        { error: 'Course ID, lesson ID, and session ID are required' },
        { status: 400 }
      );
    }

    // Get or create course progress
    let { data: progress, error: progressError } = await adminSupabase
      .from('course_progress')
      .select('id')
      .eq('course_id', course_id)
      .eq('user_session_id', session_id)
      .single();

    if (progressError || !progress) {
      // Create new progress record
      const { data: newProgress, error: createError } = await adminSupabase
        .from('course_progress')
        .insert({
          course_id,
          user_session_id: session_id,
          status: 'in_progress',
        })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating progress:', createError);
        return NextResponse.json(
          { error: 'Failed to create progress', details: createError.message },
          { status: 500 }
        );
      }

      progress = newProgress;
    }

    // Mark lesson as complete
    const { data: completion, error: completionError } = await adminSupabase
      .from('lesson_completions')
      .upsert({
        course_progress_id: progress.id,
        lesson_id,
        time_spent_minutes: time_spent || 0,
        completed_at: new Date().toISOString(),
      }, {
        onConflict: 'course_progress_id,lesson_id'
      })
      .select()
      .single();

    if (completionError) {
      console.error('Error marking lesson complete:', completionError);
      return NextResponse.json(
        { error: 'Failed to mark lesson complete', details: completionError.message },
        { status: 500 }
      );
    }

    // Fetch updated progress
    const { data: updatedProgress } = await adminSupabase
      .from('course_progress')
      .select(`
        *,
        lesson_completions (
          lesson_id,
          completed_at,
          time_spent_minutes
        )
      `)
      .eq('id', progress.id)
      .single();

    return NextResponse.json({ 
      progress: updatedProgress,
      completion 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error marking lesson complete:', error);
    return NextResponse.json(
      { error: 'Failed to mark lesson complete', details: error.message },
      { status: 500 }
    );
  }
}
