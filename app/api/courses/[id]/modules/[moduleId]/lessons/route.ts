import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{
    id: string;
    moduleId: string;
  }>;
}

// GET - List all lessons for a module
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { moduleId } = await params;
    const supabase = createAdminSupabaseClient();

    const { data: lessons, error } = await supabase
      .from('course_lessons')
      .select(`
        *,
        lesson_resources (*),
        lesson_exercises (*)
      `)
      .eq('module_id', moduleId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching lessons:', error);
      return NextResponse.json(
        { error: 'Failed to fetch lessons', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ lessons: lessons || [] });
  } catch (error: any) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lessons', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new lesson
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { moduleId } = await params;
    const supabase = createAdminSupabaseClient();
    
    const body = await request.json();
    const {
      title,
      description,
      type,
      content_url,
      duration_minutes,
      is_preview,
      order_index,
      study_materials,
      practice_materials,
      learning_objectives
    } = body;

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      );
    }

    // Get the next order index if not provided
    let finalOrderIndex = order_index;
    if (finalOrderIndex === undefined) {
      const { data: existingLessons } = await supabase
        .from('course_lessons')
        .select('order_index')
        .eq('module_id', moduleId)
        .order('order_index', { ascending: false })
        .limit(1);

      finalOrderIndex = existingLessons && existingLessons.length > 0 
        ? existingLessons[0].order_index + 1 
        : 1;
    }

    const { data: lesson, error } = await supabase
      .from('course_lessons')
      .insert({
        module_id: moduleId,
        title,
        description: description || null,
        type,
        content_url: content_url || null,
        duration_minutes: duration_minutes || 0,
        is_preview: is_preview || false,
        order_index: finalOrderIndex,
        study_materials: study_materials || null,
        practice_materials: practice_materials || null,
        learning_objectives: learning_objectives || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating lesson:', error);
      return NextResponse.json(
        { error: 'Failed to create lesson', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(lesson, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to create lesson', details: error.message },
      { status: 500 }
    );
  }
}